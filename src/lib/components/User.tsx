import { UserMetadata } from "@supabase/supabase-js";
import { router } from "expo-router";
import { View } from "react-native";
import { Avatar, Button, Icon, Text } from "react-native-paper";

export const UserTop = ({ user }: UserMetadata) => {
  const currentTime = new Date().getHours();
  const greeting = {
    period:
      currentTime >= 12
        ? "Boa tarde"
        : currentTime >= 18
        ? "Boa noite"
        : "Bom dia",
    icon:
      currentTime >= 12
        ? "weather-partly-cloudy"
        : currentTime >= 18
        ? "weather-night"
        : "weather-sunny",
  };

  return (
    <Button
      onPress={() => router.navigate("/(profile)")}
      style={{ maxWidth: 170 }}
    >
      <Avatar.Icon size={48} icon="account" />
      <View style={{ paddingLeft: 10 }}>
        <Text>
          <Icon source={greeting.icon} size={20} /> {greeting.period}
        </Text>
        <Text variant="bodyLarge">{user && user.primeiro_nome}</Text>
      </View>
    </Button>
  );
};
