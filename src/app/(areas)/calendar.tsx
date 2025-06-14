import { useAuth } from "@/lib/components/Auth";
import { styles } from "@/lib/styles";
import Themes from "@/lib/styles/themes";
import { EventType } from "@/lib/types/school";
import { client, UserTypes } from "@/lib/utils/client";
import { Tables } from "@/lib/utils/client.types";
import { PostgrestError } from "@supabase/supabase-js";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, useColorScheme, View } from "react-native";
import {
  ActivityIndicator,
  FAB,
  Icon,
  Surface,
  Text,
} from "react-native-paper";

const Page = () => {
  const { session } = useAuth();
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true);
  const [calendar, setCalendar] = useState<Tables<"calendario">[]>([]);
  const [managerType, setManagerType] = useState<number | null>();
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      async function fetchCalendar() {
        if (!session?.user.id) return;

        try {
          setLoading(true);

          const { data, error } = await client
            .from("calendario")
            .select("*, escola_usuarios!inner(*)")
            .order("data")
            .eq("escola_usuarios.usuario", session.user.id);

          if (error) {
            throw error;
          }

          setCalendar(data || []);

          const { data: data2, error: error2 } = await client
            .from("escola_usuarios")
            .select("*, usuario!inner(*)")
            .eq("usuario.id", session.user.id);

          if (error2) {
            throw error2;
          }

          setManagerType(data2[0]?.tipo || null);
        } catch (e) {
          const err = e as PostgrestError;

          console.error("Erro ao buscar eventos em calendário:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }

      fetchCalendar();

      return () => {};
    }, [session?.user.id])
  );

  if (loading) {
    return (
      <Surface style={styles.screen}>
        <ActivityIndicator />
      </Surface>
    );
  }

  if (error) {
    return (
      <Surface style={styles.screen}>
        <Text>Error: {error}</Text>
      </Surface>
    );
  }

  const colorMap: Record<EventType | string, string> = {
    Prova: "#FF9800",
    Reunião: "#7E57C2",
    Passeio: "#2962FF",
  };

  return (
    <Surface
      style={{
        ...styles.screen,
        alignItems: undefined,
        justifyContent: undefined,
      }}
    >
      {(managerType === UserTypes.Gerenciador ||
        managerType === UserTypes.Professor) && (
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => router.navigate("/(manage)/new-event")}
        />
      )}
      <View
        style={{
          backgroundColor: Themes[colorScheme!].default.colors.background,
          borderRadius: 25,
          overflow: "hidden",
          padding: 16,
          flex: 1,
        }}
      >
        {calendar.length > 0 ? (
          <FlatList
            data={calendar}
            renderItem={({ item }) => {
              const data = new Date(item.data);

              return (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 18,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: colorMap[item.categoria],
                      borderRadius: 8,
                      width: 48,
                      height: 48,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 16,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      {data.getDay()}
                    </Text>
                    <Text style={{ color: "#fff", fontSize: 12 }}>
                      {data
                        .toLocaleString("pt-BR", { month: "short" })
                        .toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: colorMap[item.categoria],
                        fontWeight: "bold",
                      }}
                    >
                      {item.categoria}
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "500" }}>
                      {item.nome}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 2,
                      }}
                    >
                      {item.horario_de && (
                        <>
                          <Icon source="clock-outline" size={16} color="#666" />
                          <Text style={{ marginLeft: 6, color: "#666" }}>
                            {item.horario_de.slice(0, 5)}
                            {item.horario_ate && (
                              <> - {item.horario_ate.slice(0, 5)}</>
                            )}
                          </Text>
                        </>
                      )}
                    </View>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <Text style={{ margin: "auto" }}>Não há eventos no calendário</Text>
        )}
      </View>
    </Surface>
  );
};

export default Page;
