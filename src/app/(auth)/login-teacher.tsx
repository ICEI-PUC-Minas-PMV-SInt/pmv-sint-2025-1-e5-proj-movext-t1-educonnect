import CustomButton from "@/lib/components/Button/Button";
import Subtitle from "@/lib/components/Subtitle/Subtitle";
import Title from "@/lib/components/Title/Title";
import { styles } from "@/lib/styles";
import { client } from "@/lib/utils/client";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { Surface, Text, TextInput } from "react-native-paper";



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

      <Title text="Acessar Conta" />
      <Subtitle  marginBottom={24} marginTop={16}>Informe seu e-mail e senha para acessar sua conta e acompanhar suas informações.</Subtitle>

      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        mode="flat"
        underlineColor="#2962FF"
        activeUnderlineColor="#2962FF"
        textColor="#22282399"
        style={{
          backgroundColor: "#2962FF0d",
        }}
      />
      <TextInput
        label="Senha"
        value={password}
        secureTextEntry
        mode="flat"
        underlineColor="#2962FF"
        activeUnderlineColor="#2962FF"
        textColor="#22282399"
        onChangeText={(text) => setPassword(text)}
        style={{
          backgroundColor: "#2962FF0d",
        }}
      />
      <Text
        onPress={() => router.push("/(auth)/reset-password")}
        style={{
          color: "#22282399",
          textAlign: "right",
          marginBottom: 8,
          fontSize: 14,
        }}
      >Esqueci minha senha</Text>

      <CustomButton
        text="Entrar"
        onPress={signIn}
        disabled={loading}
      />

      <CustomButton
        text="Alterar Perfil"s
        onPress={() => router.replace("/(auth)/userTypeSelect" as any)}
        mode="outlined"
      />
      {/* <Button
        mode="outlined"
        onPress={() => router.push("/(auth)/register")}
        disabled={loading}
      >
        Registrar (debug)
      </Button>
      <Button mode="outlined" onPress={() => router.push("/notas")} disabled={loading}>
        Ir para Notas (debug)
      </Button> */}

    </Surface>
  );
};

export default Page;
