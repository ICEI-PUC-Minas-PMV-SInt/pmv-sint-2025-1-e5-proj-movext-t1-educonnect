import { client } from "@/utils/client";
import { Button, Text, TextInput } from "@react-native-material/core";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, View } from "react-native";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signIn = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      const { error } = await client.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        Alert.alert("Erro de login", error.message);
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao tentar fazer login.");
    } finally {
      setLoading(false);
      router.replace("/");
    }
  }, [email, password, loading]);

  return (
    <View style={{ padding: 25 }}>
      <Text variant="h6">Insira seus dados para logar no EduConnect.</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        label="Senha"
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        title="Entrar"
        onPress={signIn}
        disabled={loading}
        loading={loading}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default Page;
