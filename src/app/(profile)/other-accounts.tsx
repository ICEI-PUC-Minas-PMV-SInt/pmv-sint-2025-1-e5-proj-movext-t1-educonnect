import { useAuth } from "@/lib/components/Auth";
import { styles } from "@/lib/styles";
import Themes from "@/lib/styles/themes";
import { client } from "@/lib/utils/client";
import { Tables } from "@/lib/utils/client.types";
import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { FlatList, useColorScheme } from "react-native";
import { ActivityIndicator, List, Surface, Text } from "react-native-paper";

const Page = () => {
  type Students = Tables<"usuario_responsavel"> & {
    aluno: Tables<"usuario_perfil">;
  };

  const colorScheme = useColorScheme();
  const { session } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [students, setStudents] = useState<Students[]>([]);

  useEffect(() => {
    async function fetchStudents() {
      if (!session?.user.id) return;

      try {
        setLoading(true);

        const { data, error } = await client
          .from("usuario_responsavel")
          .select("*, aluno:usuario_perfil!aluno(*)")
          .eq("responsavel", session?.user.id!);

        if (error) {
          throw error;
        }

        setStudents(data as Students[]);
      } catch (e) {
        const err = e as PostgrestError;

        console.error("Erro ao buscar contas associadas:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, [session]);

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
      <Surface
        mode="flat"
        style={{
          backgroundColor: Themes[colorScheme!].default.colors.background,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <List.Item
              title={item.aluno.primeiro_nome}
              description={item.aluno.cpf}
              left={(props) => <List.Icon {...props} icon="account" />}
              onPress={() => console.log("aaa")}
            />
          )}
        />
      </Surface>
      {/* <Text>{JSON.stringify(students, null, 2)}</Text> */}
    </Surface>
  );
};

export default Page;
