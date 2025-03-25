import { client } from "@/utils/client";
import { Button, Text, TextInput } from "@react-native-material/core";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, View } from "react-native";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signUp = useCallback(async () => {
    setLoading(true);

    const {
      data: { session },
      error,
    } = await client.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          displayName: name,
        },
      },
    });

    if (error) {
      Alert.alert(error.message);
    }
    if (!session) {
      Alert.alert("Verifique sua caixa de entrada para verificar seu email");
    }

    setLoading(false);
    router.replace("/auth/login");
  }, [name, email, password, loading]);

  return (
    <View style={{ padding: 25 }}>
      <Text variant="h6">Insira seus dados para registrar no EduConnect.</Text>
      <TextInput
        label="Nome"
        value={name}
        onChangeText={(text) => setName(text)}
      />
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
      <TextInput label="Confirmar senha" secureTextEntry />
      <Button
        title="Inscrever-se"
        onPress={signUp}
        disabled={loading}
        loading={loading}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default Page;
