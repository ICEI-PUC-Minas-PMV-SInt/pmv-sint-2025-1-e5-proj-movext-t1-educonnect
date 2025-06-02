import { UserMetadata } from "@supabase/supabase-js";
import { router } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Avatar, Button, Icon, Text } from "react-native-paper";

export const UserTop = ({ user }: UserMetadata) => {
  const currentTime = new Date().getHours();
  console.log("Current Time:", currentTime);
  const greeting = {
    period:
      currentTime >= 18
        ? "Boa noite"
        : currentTime >= 12
          ? "Boa tarde"
          : "Bom dia",
    icon:
      currentTime >= 18
        ? "weather-night"
        : currentTime >= 12
          ? "weather-partly-cloudy"
          : "weather-sunny",
  };
  return (
    <View style={styles.container}>

      <View style={styles.leftGroup}>
        <Avatar.Icon size={40} icon="account" />
        <View style={styles.textGroup}>
          <Text style={styles.greetingText}>
            <Icon source={greeting.icon} size={20} color="#1B46F5" /> {greeting.period}
          </Text>
          <Text variant="bodyLarge" style={styles.nameText}>
            {user && user.primeiro_nome}
          </Text>
        </View>
      </View>

      {/* Botão alinhado à direita */}
      <Button
        onPress={() => router.navigate("/(profile)")}
        buttonColor="#2962FF"
        rippleColor="transparent"
        style={{
          borderRadius: 4,
          padding: 0,
          width: 48,
          minWidth: 0,
        }}

        theme={{ colors: { primary: "#2962FF" } }}
      >
        <Icon source="view-grid-outline" size={24} color="#FFFFFF" />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 'auto',

    paddingVertical: 8,
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  textGroup: {
    paddingLeft: 10,
  },
  greetingText: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1B46F50D",
    borderColor: "#1B46F5",
    color: "#1B46F5",
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 100,
    fontSize: 16,
    fontWeight: "500",
  },
  nameText: {
    color: "#22282399",
    fontWeight: "600",
    
  },
});

