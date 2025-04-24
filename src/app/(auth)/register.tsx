import { styles } from "@/lib/styles";
import Themes from "@/lib/styles/themes";
import { client } from "@/lib/utils/client";
import { Tables } from "@/lib/utils/client.types";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, useColorScheme, View } from "react-native";
import {
  Button,
  Modal,
  Portal,
  RadioButton,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";

const Page = () => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [cpf, setCpf] = useState<number>();
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signUp = useCallback(async () => {
    setLoading(true);

    const {
      data: { session },
      error,
    } = await client.auth.signUp({
      email: email,
      password: password,
      phone: phone,
      options: {
        data: {
          primeiro_nome: firstName,
          sobrenome: surname,
          cpf: cpf,
          municipio: city,
        },
      },
    });

    if (error) {
      Alert.alert(error.message);
    }
    if (!session) {
      Alert.alert("Verifique sua caixa de entrada para verificar seu email");
    }

    setLoading(false);
    router.replace("/(auth)/login");
  }, [firstName, email, phone, password, loading]);

  return (
    <Surface style={{ ...styles.screen, alignItems: undefined }}>
      <Text>Insira seus dados para registrar no EduConnect.</Text>
      <TextInput
        label="Primeiro nome"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        label="Sobrenome"
        value={surname}
        onChangeText={(text) => setSurname(text)}
      />
      <TextInput
        label="Telefone"
        value={phone}
        onChangeText={(val) => setPhone(val)}
        maxLength={11}
      />
      <TextInput
        label="CPF"
        value={cpf as unknown as string}
        onChangeText={(val) => setCpf(parseInt(val))}
        maxLength={11}
      />
      <Location onSelectCity={(id) => setCity(id)} />
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        label="Senha"
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput label="Confirmar senha" secureTextEntry />
      <Button
        mode="contained"
        onPress={signUp}
        disabled={loading}
        loading={loading}
        style={{ marginTop: 20 }}
      >
        Inscrever-se
      </Button>
    </Surface>
  );
};

const Location = ({ onSelectCity }: { onSelectCity: (id: string) => void }) => {
  const colorScheme = useColorScheme();
  const [visible, setVisible] = useState(false);

  const [states, setStates] = useState<Tables<"localizacao_estado">[]>([]);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [stateName, setStateName] = useState("");

  const [cities, setCities] = useState<Tables<"localizacao_municipio">[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showCity, setShowCity] = useState(false);

  const [locationName, setLocationName] = useState("Escolha um endereço");

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const { data, error } = await client
          .from("localizacao_estado")
          .select("*");

        if (data) {
          setStates(data);
        }
      } catch (err) {
        console.error("Erro ao buscar estados", err);
      }
    };

    fetchStates();
  }, []);

  async function fetchCities(id: number) {
    try {
      const { data, error } = await client
        .from("localizacao_municipio")
        .select("*")
        .eq("estado", id);

      if (data) {
        setCities(data);
        setShowCity(true);
      }
    } catch (err) {
      console.error("Erro ao buscar cidades", err);
    }
  }

  function handleStateSelect(id: string) {
    setSelectedState(id);
    const selected = states.find((state) => String(state.id) === id)?.nome;

    setStateName(selected!);
    fetchCities(parseInt(id));
  }

  function handleCitySelect(id: string) {
    setSelectedCity(id);
    const selected = cities.find((city) => city.id === id)?.nome;

    onSelectCity(id);

    if (selectedCity) {
      setLocationName(`${selected}, ${stateName}`);
      setVisible(false);
      setShowCity(false);
    }
  }

  function resetSelection() {
    setShowCity(false);
    setSelectedState(null);
  }

  return (
    <>
      <Button mode="outlined" onPress={() => setVisible(true)}>
        {locationName}
      </Button>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={{
            backgroundColor: Themes[colorScheme!].default.colors.background,
            padding: 10,
            margin: 20,
            borderRadius: 15,
            overflow: "hidden",
          }}
        >
          {!showCity ? (
            <>
              <Text
                variant="bodyLarge"
                style={{ textAlign: "center", marginTop: 25 }}
              >
                Escolha um estado
              </Text>
              <RadioButton.Group
                onValueChange={handleStateSelect}
                value={selectedState || ""}
              >
                <FlatList
                  data={states}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <RadioButton value={String(item.id)} />
                      <Text>{item.nome}</Text>
                    </View>
                  )}
                  keyExtractor={(item) => item.sigla}
                  style={{ marginTop: 25, marginBottom: 30 }}
                />
              </RadioButton.Group>
            </>
          ) : (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Button icon="arrow-left" onPress={resetSelection} compact>
                  Voltar
                </Button>
                <Text
                  variant="bodyLarge"
                  style={{ textAlign: "center", flex: 1, marginRight: 35 }}
                >
                  Escolha um município
                </Text>
              </View>
              <RadioButton.Group
                onValueChange={(item) => handleCitySelect(item)}
                value={selectedCity || ""}
              >
                <FlatList
                  data={cities}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <RadioButton value={String(item.id)} />
                      <Text>{item.nome}</Text>
                    </View>
                  )}
                  keyExtractor={(item) => String(item.id)}
                  style={{ marginTop: 25, marginBottom: 30 }}
                />
              </RadioButton.Group>
            </>
          )}
        </Modal>
      </Portal>
    </>
  );
};

export default Page;
