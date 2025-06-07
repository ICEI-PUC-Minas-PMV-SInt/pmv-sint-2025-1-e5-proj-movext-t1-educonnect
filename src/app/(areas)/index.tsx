import { useAuth } from "@/lib/components/Auth";
import { UserTop } from "@/lib/components/User";
import { styles } from "@/lib/styles";
import { EventType } from "@/lib/types/school";
import { client } from "@/lib/utils/client";
import { Tables } from "@/lib/utils/client.types";
import { PostgrestError, Session, UserMetadata } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Icon, Surface, Text } from "react-native-paper";

type SubjectName =
  | "Matemática"
  | "Física"
  | "Química"
  | "Biologia"
  | "História"
  | "Geografia"
  | "Filosofia"
  | "Sociologia"
  | "Ed. Física"
  | "Inglês"
  | "Artes"
  | "L. Portuguesa";

type SubjectData = { icon: string; color: string };

const getSubjectDataByName = (name: string): SubjectData => {
  const map: Record<SubjectName, SubjectData> = {
    Matemática: { icon: "calculator", color: "#FF9800" },
    Física: { icon: "atom", color: "#2962FF" },
    Química: { icon: "test-tube", color: "#00BCD4" },
    Biologia: { icon: "leaf", color: "#4CAF50" },
    História: { icon: "book-clock", color: "#7E57C2" },
    Geografia: { icon: "map", color: "#7E57C2" },
    Filosofia: { icon: "lightbulb-on-outline", color: "#9E9E9E" },
    Sociologia: { icon: "account-group-outline", color: "#8BC34A" },
    "Ed. Física": { icon: "run-fast", color: "#00C853" },
    Inglês: { icon: "translate", color: "#7096FE" },
    Artes: { icon: "palette", color: "#FF4081" },
    "L. Portuguesa": { icon: "book-open-page-variant", color: "#9C27B0" },
  };

  if (name in map) {
    return map[name as SubjectName];
  }
  return { icon: "book", color: "#999" };
};

const Areas = () => {
  const { session } = useAuth();

  return (
    <ScrollView style={{ flex: 1 }}>
      <Surface
        style={{
          ...styles.screen,
          justifyContent: undefined,
          alignItems: undefined,
          backgroundColor: "#F9F9F9",
          minHeight: "100%",
        }}
      >
        {session && (
          <>
            <UserTop user={session?.user.user_metadata} />
            <Hero />
            <StudentDetails user={session?.user.user_metadata} />
            <Subjects />
            <Calendar user={session} />
          </>
        )}
      </Surface>
    </ScrollView>
  );
};

const Hero = () => {
  return (
    <View
      style={{
        width: "100%",
        height: 200,
        backgroundColor: "#bcd3ff",
        borderRadius: 16,
        marginTop: 40,
        position: "relative",
        justifyContent: "center",
        paddingLeft: 16,
        paddingRight: 72,
      }}
    >
      <Text
        style={{
          color: "#141b57",
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 8,
        }}
      >
        Que bom ter você aqui de novo!
      </Text>
      <Text
        style={{
          color: "#141b57",
          fontSize: 14,
        }}
      >
        Acompanhe o desempenho escolar e fique por dentro das novidades
      </Text>
      <Image
        source={require("@/assets/images/kids.png")}
        style={{
          position: "absolute",
          bottom: 0,
          right: -100,
          width: 250,
          height: 250,
          resizeMode: "contain",
        }}
      />
    </View>
  );
};

const StudentDetails = ({ user }: { user?: UserMetadata }) => {
  if (user) {
    return (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "#E3F2FD",
            padding: 8,
            borderRadius: 32,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon source="school-outline" size={24} color="#1B46F5" />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 4 }}>
            {user.primeiro_nome} {user.sobrenome}
          </Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Text style={{ color: "#666" }}>7ª Série A</Text>
            <Text style={{ color: "#666" }}>RA: 20250325142</Text>
          </View>
        </View>
        <Icon source="dots-vertical" size={24} color="#222" />
      </View>
    );
  }
};

const Subjects = () => {
  const subjects = [
    { name: "Matemática" },
    { name: "Física" },
    { name: "Química" },
    { name: "Biologia" },
    { name: "História" },
    { name: "Geografia" },
    { name: "Filosofia" },
    { name: "Sociologia" },
    { name: "Ed. Física" },
    { name: "Inglês" },
    { name: "Artes" },
    { name: "L. Portuguesa" },
  ];

  return (
    <View style={{ marginTop: 24 }}>
      <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 12 }}>
        Matérias
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 16, paddingRight: 16 }}
      >
        {subjects.map((subject, index) => {
          const { icon, color } = getSubjectDataByName(subject.name);

          return (
            <TouchableOpacity
              key={index}
              onPress={() => console.log(`Clicou em ${subject.name}`)}
              activeOpacity={0.8}
              style={{
                width: 120,
                height: 120,
                backgroundColor: "#ffffff",
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.05,
                shadowRadius: 10,
                elevation: 2,
              }}
            >
              <View
                style={{
                  backgroundColor: color + "1A",
                  padding: 12,
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              >
                <Icon source={icon} size={28} color={color} />
              </View>
              <Text style={{ fontSize: 14, textAlign: "center" }}>
                {subject.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const Calendar = ({ user }: { user: Session }) => {
  const [loading, setLoading] = useState(true);
  const [calendar, setCalendar] = useState<Tables<"calendario">[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCalendar() {
      try {
        setLoading(true);

        const { data, error } = await client
          .from("calendario")
          .select("*, escola_usuarios!inner(*)")
          .order("data")
          .eq("escola_usuarios.usuario", user.user.id);

        if (error) {
          throw error;
        }

        setCalendar(data || []);
      } catch (e) {
        const err = e as PostgrestError;

        console.error("Erro ao buscar eventos em calendário:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCalendar();
  }, [user?.user.id]);

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const colorMap: Record<EventType | string, string> = {
    Prova: "#FF9800",
    Reunião: "#7E57C2",
    Passeio: "#2962FF",
  };

  if (calendar.length > 0) {
    return (
      <View style={{ marginTop: 32 }}>
        <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 12 }}>
          Agenda
        </Text>
        {calendar.map((item) => {
          const data = new Date(item.data);

          return (
            <View
              key={item.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: 8,
                padding: 16,
                marginBottom: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 6,
                elevation: 2,
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
        })}
      </View>
    );
  }
};

export default Areas;
