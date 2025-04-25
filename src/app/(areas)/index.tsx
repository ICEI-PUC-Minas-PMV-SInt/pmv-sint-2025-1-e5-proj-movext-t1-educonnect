import { useAuth } from "@/lib/components/Auth";
import { UserTop } from "@/lib/components/User";
import { styles } from "@/lib/styles";
import Themes from "@/lib/styles/themes";
import { ScrollView, useColorScheme, View } from "react-native";
import { Surface, Text } from "react-native-paper";

const Areas = () => {
  const { session } = useAuth();
  const colorScheme = useColorScheme();

  return (
    <ScrollView style={{ flex: 1 }}>
      <Surface
        style={{
          ...styles.screen,
          justifyContent: undefined,
          alignItems: undefined,
        }}
      >
        <UserTop user={session?.user.user_metadata} />
        <View
          style={{
            width: "100%",
            height: 200,
            backgroundColor: Themes[colorScheme ?? "light"].blue.colors.primary,
            borderRadius: 25,
          }}
        />
        <Text>{JSON.stringify(session, null, 2)}</Text>
      </Surface>
    </ScrollView>
  );
};

export default Areas;
