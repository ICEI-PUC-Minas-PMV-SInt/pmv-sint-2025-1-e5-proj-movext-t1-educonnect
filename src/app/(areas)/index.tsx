import { useAuth } from "@/lib/components/Auth";
import CustomButton from "@/lib/components/Button/Button";
import { UserTop } from "@/lib/components/User";
import { styles } from "@/lib/styles";
import Themes from "@/lib/styles/themes";
import { useEffect, useState } from "react";
import { ScrollView, useColorScheme, View, Image, TouchableOpacity } from "react-native";
import { Icon, Surface, Text } from "react-native-paper";

type SubjectName =
  | "Matemática"
  | "Física"
  | "Química"
  | "Biologia"
  | "História"
  | "Geografia"
  | "Filosofia"
  | "Sociologia"
  | "Ed. Física"
  | "Inglês"
  | "Artes"
  | "L. Portuguesa";

type SubjectData = { icon: string; color: string };
type EventType = "Prova" | "Reunião" | "Passeio";

type Event = {
  type: EventType;
  title: string;
  day: string;
  month: string;
  start: string;
  end: string;
};

const mockEvents: Event[] = [
  {
    type: "Prova",
    title: "Matemática",
    day: "05",
    month: "JUN",
    start: "08:00",
    end: "10:00",
  },
  {
    type: "Passeio",
    title: "Visita ao Museu",
    day: "06",
    month: "JUN",
    start: "13:00",
    end: "17:00",
  },
  {
    type: "Reunião",
    title: "Reunião de Pais",
    day: "07",
    month: "JUN",
    start: "18:00",
    end: "19:00",
  },
];

const getSubjectDataByName = (name: string): SubjectData => {
  const map: Record<SubjectName, SubjectData> = {
    "Matemática": { icon: "calculator", color: "#FF9800" },
    "Física": { icon: "atom", color: "#2962FF" },
    "Química": { icon: "test-tube", color: "#00BCD4" },
    "Biologia": { icon: "leaf", color: "#4CAF50" },
    "História": { icon: "book-clock", color: "#7E57C2" },
    "Geografia": { icon: "map", color: "#7E57C2" },
    "Filosofia": { icon: "lightbulb-on-outline", color: "#9E9E9E" },
    "Sociologia": { icon: "account-group-outline", color: "#8BC34A" },
    "Ed. Física": { icon: "run-fast", color: "#00C853" },
    "Inglês": { icon: "translate", color: "#7096FE" },
    "Artes": { icon: "palette", color: "#FF4081" },
    "L. Portuguesa": { icon: "book-open-page-variant", color: "#9C27B0" },
  };

  if (name in map) {
    return map[name as SubjectName];
  }
  return { icon: "book", color: "#999" };
};


const Areas = () => {
  const { session } = useAuth();
  const colorScheme = useColorScheme();
  const [subjects, setSubjects] = useState<{ name: string }[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {

      const response = [
        { name: "Matemática" },
        { name: "Física" },
        { name: "Química" },
        { name: "Biologia" },
        { name: "História" },
        { name: "Geografia" },
        { name: "Filosofia" },
        { name: "Sociologia" },
        { name: "Ed. Física" },
        { name: "Inglês" },
        { name: "Artes" },
        { name: "L. Portuguesa" },
      ];
      setSubjects(response);
    };

    fetchSubjects();
  }, []);


  return (
    <ScrollView style={{ flex: 1 }}>
      <Surface
        style={{
          ...styles.screen,
          justifyContent: undefined,
          alignItems: undefined,
          backgroundColor: '#F9F9F9',
          minHeight: "100%",
        }}
      >
        <UserTop user={session?.user.user_metadata} />
        <View
          style={{
            width: "100%",
            height: 200,
            backgroundColor: '#bcd3ff',
            borderRadius: 16,
            marginTop: 40,
            position: "relative",
            justifyContent: "center",
            paddingLeft: 16,
            paddingRight: 72,
          }}
        >
          <Text
            style={{
              color: "#141b57",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 8,
            }}
          >
            Que bom ter você aqui de novo!
          </Text>
          <Text
            style={{
              color: "#141b57",
              fontSize: 14,
            }}
          >
            Acompanhe o desempenho escolar e fique por dentro das novidades
          </Text>
          <Image
            source={require("@/assets/images/kids.png")}
            style={{
              position: "absolute",
              bottom: 0,
              right: -100,
              width: 250,
              height: 250,
              resizeMode: "contain",
            }}
          />
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,

          }}
        >

          <View
            style={{
              backgroundColor: "#E3F2FD",
              padding: 8,
              borderRadius: 32,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon source="school-outline" size={24} color="#1B46F5" />
          </View>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 4 }}>
              Nome do Aluno
            </Text>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <Text style={{ color: "#666" }}>7ª Série A</Text>
              <Text style={{ color: "#666" }}>RA: 20250325142</Text>
            </View>
          </View>


          <Icon source="dots-vertical" size={24} color="#222" />
        </View>
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 12 }}>
            Matérias
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16, paddingRight: 16 }}
          >
            {subjects.map((subject, index) => {
              const { icon, color } = getSubjectDataByName(subject.name);

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => console.log(`Clicou em ${subject.name}`)}
                  activeOpacity={0.8}
                  style={{
                    width: 120,
                    height: 120,
                    backgroundColor: "#ffffff",
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 0.05,
                    shadowRadius: 10,
                    elevation: 2,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: color + "1A",
                      padding: 12,
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                  >
                    <Icon source={icon} size={28} color={color} />
                  </View>
                  <Text style={{ fontSize: 14, textAlign: "center" }}>
                    {subject.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={{ marginTop: 32 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 12 }}>
            Agenda
          </Text>

          {mockEvents.map((event, index) => {
            const colorMap: Record<EventType, string> = {
              Prova: "#FF9800",
              Reunião: "#7E57C2",
              Passeio: "#2962FF",
            };

            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  padding: 16,
                  marginBottom: 12,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.05,
                  shadowRadius: 6,
                  elevation: 2,
                }}
              >

                <View
                  style={{
                    backgroundColor: colorMap[event.type],
                    borderRadius: 8,
                    width: 48,
                    height: 48,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 16,
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                    {event.day}
                  </Text>
                  <Text style={{ color: "#fff", fontSize: 12 }}>{event.month}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: colorMap[event.type],
                      fontWeight: "bold",
                      // marginBottom: 4,
                    }}
                  >
                    {event.type}
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>{event.title}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }}>
                    <Icon source="clock-outline" size={16} color="#666" />
                    <Text style={{ marginLeft: 6, color: "#666" }}>
                      {event.start} - {event.end}
                    </Text>
                  </View>
                </View>

                <Icon source="dots-vertical" size={20} color="#999" />
              </View>
            );
          })}
        </View>





      </Surface>
    </ScrollView>
  );
};

export default Areas;
