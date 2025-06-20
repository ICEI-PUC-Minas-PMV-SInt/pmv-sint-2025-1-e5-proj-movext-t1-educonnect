import { useAuth } from "@/lib/components/Auth";
import { styles } from "@/lib/styles";
import Themes from "@/lib/styles/themes";
import { client, UserTypes } from "@/lib/utils/client";
import { Tables } from "@/lib/utils/client.types";
import { getSubjectDataByName } from "@/lib/utils/subjects";
import { PostgrestError } from "@supabase/supabase-js";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, TouchableOpacity, useColorScheme, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Divider,
  Icon,
  List,
  Surface,
  Text,
} from "react-native-paper";


const Page = () => {
  type School = Tables<"escola"> & {
    escola_usuarios: Tables<"escola_usuarios">[];
  };

  const colorScheme = useColorScheme();
  const { session } = useAuth();
  const [userSchools, setUserSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserSchools() {
      if (!session?.user?.id) return;

      try {
        setLoading(true);

        const { data, error } = await client
          .from("escola")
          .select("*, escola_usuarios!inner(*)")
          .eq("escola_usuarios.usuario", session.user.id);

        if (error) {
          throw error;
        }

        const filteredData = data?.map((school) => ({
          ...school,
          escola_usuarios: school.escola_usuarios.filter(
            (user) => user.usuario === session.user.id
          ),
        }));

        setUserSchools(filteredData || []);
      } catch (e) {
        const err = e as PostgrestError;

        console.error("Erro ao buscar escolas:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserSchools();
  }, [session?.user?.id]);

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

  return (
    <Surface
      style={{
        ...styles.screen,
        alignItems: undefined,
        justifyContent: undefined,
      }}
    >
      <View
        style={{
          backgroundColor: Themes[colorScheme!].default.colors.background,
          borderRadius: 25,
          overflow: "hidden",
        }}
      >
       
          <FlatList
            data={userSchools}
            renderItem={({ item }) => (
              <>
                <List.Accordion
                  title={item.nome}
                  id={item.id}
                  expanded={true}
                >
                  <Surface
                    mode="flat"
                    style={{
                      ...styles.screen,
                      backgroundColor:
                        Themes[colorScheme!].default.colors.background,
                    }}
                  >
                    {item.escola_usuarios[0].tipo === UserTypes.Gerenciador && (
                      <Button
                        icon="plus"
                        mode="contained"
                        onPress={() =>
                          router.navigate(`/(manage)/new-course?id=${item.id}`)
                        }
                      >
                        Adicionar matéria
                      </Button>
                    )}
                    <Courses schoolId={item.id} colorScheme={colorScheme!} />
                  </Surface>
                </List.Accordion>
                {userSchools.length > 1 && <Divider />}
              </>
            )}
            keyExtractor={(item) => item.id}
          />
   
      </View>
    </Surface>
  );
};

const Courses = ({
  schoolId,
}: {
  schoolId: string;
  colorScheme: "light" | "dark";
}) => {
  const [courses, setCourses] = useState<Tables<"materia">[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error } = await client
        .from("materia")
        .select("*")
        .eq("escola", schoolId);

      if (error) {
        throw error;
      }

      setCourses(data || []);
    } catch (e) {
      const err = e as PostgrestError;

      console.error("Erro ao buscar matérias:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useFocusEffect(
    useCallback(() => {
      fetchCourses();
    }, [fetchCourses])
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Erro ao carregar matérias.</Text>;
  }

  if (courses.length === 0) {
    return <Text>Nenhuma matéria para esta escola.</Text>;
  }

  return (
    <View style={{ width: "100%" }}>
      <FlatList
        data={courses}
        numColumns={2}
        columnWrapperStyle={{ gap: 10, justifyContent: "center" }}
        renderItem={({ item }) => {
          const { icon, color } = getSubjectDataByName(item.nome);

          return (
            <TouchableOpacity
              onPress={() => console.log(`Clicou em ${item.nome}`)}
              activeOpacity={0.8}
              style={{
                flex: 1,
                height: 120,
                marginBottom: 10,
                backgroundColor: "#ffffff",
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOpacity: 0.05,
                padding: 10,
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
                {item.nome}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      />
    </View>
  );
};
export default Page;
