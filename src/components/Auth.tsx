import { client } from "@/utils/client";
import { Stack, TextInput } from "@react-native-material/core";
import { useState } from "react";
import { Alert, AppState } from "react-native";

/**
 * Isto vai dizer ao Supabase para continuar recarregando
 * a sessão (refresh token) enquanto o aplicativo não estiver
 * funcionando.
 */
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    client.auth.startAutoRefresh();
  } else {
    client.auth.stopAutoRefresh();
  }
});

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);

    const { error } = await client.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    }

    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);

    const {
      data: { session },
      error,
    } = await client.auth.signUp({ email: email, password: password });

    if (error) {
      Alert.alert(error.message);
    }
    if (!session) {
      Alert.alert("Verifique sua caixa de entrada para verificar seu email");
    }

    setLoading(false);
  }

  return (
    <Stack>
      <TextInput label="Email" />
      <TextInput label="Senha" />
    </Stack>
  );
};
