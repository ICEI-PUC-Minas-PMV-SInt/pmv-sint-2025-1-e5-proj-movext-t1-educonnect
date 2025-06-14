import { useAuth } from "@/lib/components/Auth";
import { StackHeader } from "@/lib/components/StackHeader";
import { styles } from "@/lib/styles";
import { client, UserTypes } from "@/lib/utils/client";
import { router, Stack, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Surface } from "react-native-paper";

const Layout = () => {
  const { session, isLoading } = useAuth();
  const [checkPermission, setCheckPermission] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const segments = useSegments();

  useEffect(() => {
    async function checkUserPermission() {
      if (!isLoading && session) {
        try {
          const { data, error } = await client
            .from("escola_usuarios")
            .select("tipo")
            .eq("usuario", session.user.id)
            .not(
              "tipo",
              "in",
              `(${UserTypes.Aluno}, ${UserTypes.Responsavel})`
            );

          if (error) {
            console.error(error);
            router.replace("/(areas)/courses");

            return;
          }

          const hasManagementAccess = data && data.length > 0;
          setHasAccess(hasManagementAccess);

          if (!hasManagementAccess) {
            router.replace("/(areas)/courses");
          }
        } catch (e) {
          console.error("Permission denied", e);
          router.replace("/(areas)/courses");
        } finally {
          setCheckPermission(false);
        }
      } else if (!isLoading) {
        router.replace("/");
      }
    }

    checkUserPermission();
  }, [isLoading, session, segments]);

  if (isLoading || checkPermission) {
    return (
      <Surface style={{ ...styles.screen, flex: 1 }}>
        <ActivityIndicator size="large" />
      </Surface>
    );
  }

  if (!hasAccess) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        animation: "fade_from_bottom",
        header: (props) => (
          <StackHeader navProps={props} children={undefined} />
        ),
      }}
    >
      <Stack.Screen name="new-course" options={{ title: "Nova matéria" }} />
      <Stack.Screen
        name="new-event"
        options={{ title: "Novo evento", animation: "slide_from_bottom" }}
      />
    </Stack>
  );
};

export default Layout;
