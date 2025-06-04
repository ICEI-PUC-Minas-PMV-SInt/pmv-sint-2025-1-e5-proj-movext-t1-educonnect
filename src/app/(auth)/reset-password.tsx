import CustomButton from "@/lib/components/Button/Button";
import { styles } from "@/lib/styles";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { Surface, Text, TextInput } from "react-native-paper";

const Page = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPassword = useCallback(async () => {
    if (loading) return;

    if (!email.includes("@")) {
      Alert.alert("Email inválido", "Insira um email válido.");
      return;
    }

    console.log("Reset de senha", email);
  }, [email, loading]);

  return (
    <Surface style={{ ...styles.screen, alignItems: undefined }}>
      <Text variant="headlineSmall" style={{ textAlign: "center" }}>
        Recuperar Acesso
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#222823B3",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Para recuperar seu acesso, informe seu email e receba as instruções.
      </Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        mode="flat"
        underlineColor="#2962FF"
        activeUnderlineColor="#2962FF"
        textColor="#22282399"
        style={{
          marginVertical: 40,
          backgroundColor: "#2962FF0d",
        }}
      />

      <CustomButton
        text="Recuperar Senha"
        onPress={resetPassword}
        disabled={loading}
      />
      <CustomButton
        text="Voltar"
        mode="outlined"
        onPress={() => router.replace("/(auth)/login")}
        disabled={loading}
      />
    </Surface>
  );
};

export default Page;
