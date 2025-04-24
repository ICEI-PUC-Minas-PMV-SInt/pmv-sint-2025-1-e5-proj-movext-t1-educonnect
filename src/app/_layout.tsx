import { AuthProvider, useAuth } from "@/lib/components/Auth";
import { StackHeader } from "@/lib/components/StackHeader";
import Themes from "@/lib/styles/themes";
import { Setting } from "@/lib/types/basic";
import { client } from "@/lib/utils/client";
import {
  DarkTheme as AppDark,
  DefaultTheme as AppLight,
  ThemeProvider,
} from "@react-navigation/native";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { AppState, useColorScheme } from "react-native";
import { adaptNavigationTheme, PaperProvider } from "react-native-paper";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    client.auth.startAutoRefresh();
  } else {
    client.auth.stopAutoRefresh();
  }
});

const App = () => {
  const { session, isLoading } = useAuth();
  const colorScheme = useColorScheme();
  const [settings, setSettings] = useState<Setting>({
    theme: "auto",
    color: "default",
  });

  const theme =
    Themes[settings.theme === "auto" ? colorScheme ?? "dark" : settings.theme][
      settings.color
    ];

  const { DarkTheme, LightTheme } = adaptNavigationTheme({
    reactNavigationDark: AppDark,
    reactNavigationLight: AppLight,
    materialDark: Themes.dark[settings.color],
    materialLight: Themes.light[settings.color],
  });

  useEffect(() => {
    if (!isLoading && (!session || !session.user)) {
      router.replace("/(auth)/login");
    }
  }, [session, isLoading]);

  return (
    <AuthProvider>
      <ThemeProvider
        value={
          colorScheme === "light"
            ? { ...LightTheme, fonts: AppLight.fonts }
            : { ...DarkTheme, fonts: AppDark.fonts }
        }
      >
        <PaperProvider>
          <Stack
            screenOptions={{
              animation: "flip",
              header: (props) => (
                <StackHeader navProps={props} children={undefined} />
              ),
            }}
          >
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(areas)" options={{ headerShown: false }} />
            <Stack.Screen name="(manage)" options={{ headerShown: false }} />
            <Stack.Screen name="(profile)" options={{ headerShown: false }} />
          </Stack>
        </PaperProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
};

const Layout = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default Layout;
