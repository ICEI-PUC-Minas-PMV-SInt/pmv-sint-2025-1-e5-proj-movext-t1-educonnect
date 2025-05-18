import { useAuth } from "@/lib/components/Auth";
import { styles } from "@/lib/styles";
import Themes from "@/lib/styles/themes";
import { client } from "@/lib/utils/client";
import { Tables } from "@/lib/utils/client.types";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, useColorScheme, View } from "react-native";
import {
  Avatar,
  Button,
  Dialog,
  Divider,
  List,
  Portal,
  Surface,
  Text,
} from "react-native-paper";

const Page = () => {
  const { session } = useAuth();
  const colorScheme = useColorScheme();

  if (session) {
    return (
      <Surface
        style={{
          ...styles.screen,
          alignItems: undefined,
          justifyContent: undefined,
        }}
      >
        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <Avatar.Icon size={64} icon="account" />
          <View>
            <Text variant="headlineLarge">
              {session.user.user_metadata.primeiro_nome}
            </Text>
            <Text variant="labelLarge">{session.user.user_metadata.cpf}</Text>
          </View>
        </View>
        <Surface
          mode="flat"
          style={{
            backgroundColor: Themes[colorScheme!].default.colors.background,
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <Sections />
        </Surface>
      </Surface>
    );
  }
};

const Sections = () => {
  const { session } = useAuth();
  const [responsible, setResponsible] = useState<Tables<"escola_usuarios">[]>(
    []
  );

  useEffect(() => {
    async function fetchUserType() {
      if (!session?.user.id) return;

      const { data } = await client
        .from("escola_usuarios")
        .select("*")
        .eq("usuario", session.user.id);

      setResponsible(data!);
    }

    fetchUserType();
  }, [session?.user.id]);
  return (
    <>
      <List.Item
        title="Conta"
        description="Nome, CPF, email, senha"
        left={(props) => <List.Icon {...props} icon="account" />}
        onPress={() => console.log("aaa")}
      />
      {responsible.length > 0 && (
        <List.Item
          title="Outras contas"
          description="Estudantes em sua responsabilidade"
          left={(props) => <List.Icon {...props} icon="account-box-multiple" />}
          onPress={() => router.navigate("/(profile)/other-accounts")}
        />
      )}
      <List.Item
        title="Escolas"
        description="Instituições a qual você está associado"
        left={(props) => <List.Icon {...props} icon="school" />}
        onPress={() => console.log("aaa")}
      />
      <Divider />
      <List.Item
        title="Aplicativo"
        description="Configurações do aplicativo"
        left={(props) => <List.Icon {...props} icon="cog" />}
        onPress={() => console.log("aaa")}
      />
      <List.Item
        title="Ajuda"
        description="Ajuda e guias para utilização"
        left={(props) => <List.Icon {...props} icon="help-box" />}
        onPress={() => console.log("aaa")}
      />
      <Divider />
      <LogoutDialog />
    </>
  );
};

const LogoutDialog = () => {
  const colorScheme = useColorScheme();
  const [visible, setVisible] = useState(false);

  async function logout() {
    const { error } = await client.auth.signOut();

    if (error) {
      Alert.alert(error.message);
    }

    setVisible(false);
    router.push("/(auth)/login");
  }

  return (
    <>
      <List.Item
        title="Sair"
        description="Encerrar sessão"
        left={(props) => <List.Icon {...props} icon="logout" />}
        onPress={() => setVisible(true)}
        style={{
          backgroundColor: Themes[colorScheme!].default.colors.errorContainer,
        }}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Tem certeza que deseja sair?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Sua sessão será encerrada e você não receberá notificações sobre
              eventos até logar novamente.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancelar</Button>
            <Button
              mode="contained"
              buttonColor={Themes[colorScheme!].default.colors.error}
              style={{
                paddingLeft: 25,
                paddingRight: 25,
              }}
              onPress={() => logout()}
            >
              Sair
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default Page;
