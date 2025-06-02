import { styles } from "@/lib/styles";
import Themes from "@/lib/styles/themes";
import { useColorScheme, FlatList, Image, View } from "react-native";
import { Surface, Text } from "react-native-paper";

// Dados de exemplo para notificações
const mockNotifications: {
  id: string;
  title: string;
  message: string;
  image: string;
  time: string;
}[] = [
// Usar esse teste para ver se a lista de notificações está funcionando
  {
    id: "1", 
    title: "Nova atividade disponível",
    message: "Uma nova atividade foi adicionada na matéria de Matemática",
    image: "https://static.vecteezy.com/ti/vetor-gratis/p1/7545840-matematica-doodle-ilustracao-vetor.jpg",
    time: "2 horas atrás",
  },
  {
    id: "2", 
    title: "Nova atividade disponível",
    message: "Uma nova atividade foi adicionada na matéria de Matemática",
    image: "https://static.vecteezy.com/ti/vetor-gratis/p1/7545840-matematica-doodle-ilustracao-vetor.jpg",
    time: "2 horas atrás",
  }
];

const Page = () => {
  const colorScheme = useColorScheme();

  return (
    <Surface
      style={{
        ...styles.screen,
        alignItems: undefined,
        justifyContent: undefined,
      }}
    >
      <View
        style={{
          backgroundColor: Themes[colorScheme!].default.colors.background,
          borderRadius: 25,
          overflow: "hidden",
          padding: 16,
          flex: 1,
        }}
      >
        {mockNotifications.length === 0 ? (
          <View style={{ alignItems: "center", justifyContent: "center", flex: 1, padding: 20 }}>
            <Text variant="titleMedium" style={{ textAlign: "center" }}>
              Nenhuma notificação disponível
            </Text>
            <Text variant="bodyMedium" style={{ textAlign: "center", marginTop: 8 }}>
              Quando você tiver novas notificações, elas aparecerão aqui.
            </Text>
          </View>
        ) : (
          <FlatList
            data={mockNotifications}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  padding: 12,
                  backgroundColor: Themes[colorScheme!].default.colors.surface,
                  borderRadius: 12,
                  marginBottom: 8,
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginRight: 12,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text variant="titleMedium">{item.title}</Text>
                  <Text variant="bodyMedium" style={{ marginTop: 4 }}>
                    {item.message}
                  </Text>
                  <Text
                    variant="labelSmall"
                    style={{ marginTop: 4, color: "#545454" }}
                  >
                    {item.time}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </Surface>
  );
};

export default Page; 