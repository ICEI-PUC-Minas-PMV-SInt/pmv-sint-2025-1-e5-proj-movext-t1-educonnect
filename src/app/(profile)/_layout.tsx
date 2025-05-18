import { StackHeader } from "@/lib/components/StackHeader";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        animation: "fade_from_bottom",
        header: (props) => (
          <StackHeader navProps={props} children={undefined} />
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "Perfil" }} />
      <Stack.Screen name="other-accounts" options={{ title: "Outras contas" }} />
    </Stack>
  );
};

export default Layout;
