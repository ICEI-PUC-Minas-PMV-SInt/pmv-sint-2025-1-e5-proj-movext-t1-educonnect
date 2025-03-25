import { client } from "@/utils/client";
import { Stack } from "expo-router";
import { AppState } from "react-native";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    client.auth.startAutoRefresh();
  } else {
    client.auth.stopAutoRefresh();
  }
});

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        title: "EduConnect",
      }}
    />
  );
};

export default Layout;
