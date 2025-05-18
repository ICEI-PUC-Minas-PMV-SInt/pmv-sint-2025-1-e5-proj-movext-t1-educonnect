import { styles } from "@/lib/styles";
import { client } from "@/lib/utils/client";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";



const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signIn = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        Alert.alert("Erro de login", error.message);
      } else if (data.session) {
        router.replace("/");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao tentar fazer login.");
    } finally {
      setLoading(false);
    }
  }, [email, password, loading, router]);
  return (
    <Surface style={{ ...styles.screen, alignItems: undefined }}>
      <Text variant="headlineSmall" style={{ textAlign: "center" }}>
        Insira seus dados para logar no EduConnect.
      </Text>
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
      <Text
        onPress={() => router.push("/(auth)/reset-password")}
        style={{
          color: "#2962FF",
          textAlign: "right",
          marginBottom: 8,
          fontSize: 14,
        }}
      >Esquecio minha senha</Text>
      <Button mode="contained" onPress={signIn} disabled={loading}>
        Entrar
      </Button>
      <Button
        mode="outlined"
        onPress={() => router.push("/(auth)/register")}
        disabled={loading}
      >
        Registrar (debug)
      </Button>
      <Button mode="outlined" onPress={() => router.push("/notas")} disabled={loading}>
        Ir para Notas (debug)
      </Button>

    </Surface>
  );
};

export default Page;
