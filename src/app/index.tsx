import { client } from "@/utils/client";
import { Button, Flex, Text } from "@react-native-material/core";
import { Session } from "@supabase/supabase-js";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";

const Page = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    client.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    client.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (session && session.user) {
    return <Logado key={session.user.id} session={session} />;
  }

  return <NaoLogado />;
};

const NaoLogado = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text variant="h5" style={{ textAlign: "center" }}>
        Bem-vindo{"(a)"} ao EduConnect.
      </Text>
      <Flex style={{ gap: 10 }} inline>
        <Button
          title="Registrar"
          onPress={() => router.navigate("/auth/register")}
        />
        <Button
          title="Entrar"
          variant="outlined"
          onPress={() => router.navigate("/auth/login")}
        />
      </Flex>
    </View>
  );
};

const Logado = ({ session }: { session: Session }) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const username = session.user.user_metadata["displayName"];

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: username,
    });
  }, [navigation]);

  async function logout() {
    setLoading(true);
    const { error } = await client.auth.signOut();

    if (error) {
      Alert.alert(error.message);
    }

    setLoading(false);
  }

  return (
    <ScrollView style={{ padding: 25 }}>
      <Flex fill>
        <Text>Olá, {username}</Text>
        <Text>Seu email é {session.user.email}</Text>
      </Flex>
      <Button
        title="Sair"
        loading={loading}
        style={{ marginTop: 30 }}
        onPress={() => logout()}
      />
    </ScrollView>
  );
};

export default Page;
