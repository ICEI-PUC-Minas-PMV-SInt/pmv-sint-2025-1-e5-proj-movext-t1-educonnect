import { styles } from "@/lib/styles";
import { client, UserTypes } from "@/lib/utils/client";
import { Tables } from "@/lib/utils/client.types";
import { PostgrestError } from "@supabase/supabase-js";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Alert, FlatList, View } from "react-native";
import {
    Button,
    Dialog,
    IconButton,
    Portal,
    RadioButton,
    Surface,
    Text,
    TextInput,
} from "react-native-paper";

const Page = () => {
  const navigation = useNavigation();
  const [name, setName] = useState<string>("");
  const [teacher, setTeacher] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cancelDialog, setCancelDialog] = useState(false);
  const params = useLocalSearchParams();
  const schoolId = params.id as string;

  function handleCancel() {
    if (name || teacher) {
      setCancelDialog(true);
    } else {
      router.back();
    }
  }

  async function handleSubmit() {
    if (!name || !teacher) {
      Alert.alert(
        "Campos incompletos",
        "Preencha todos os campos obrigatórios."
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await client
        .from("materia")
        .insert([
          {
            nome: name,
            escola: schoolId,
            professor: teacher,
          },
        ])
        .select();

      if (error) throw error;

      router.back();
    } catch (e) {
      const err = e as PostgrestError;

      console.error(err);
      Alert.alert("Erro", err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="close"
          onPress={handleCancel}
          style={{ marginLeft: 8 }}
        />
      ),
      headerRight: () => (
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isSubmitting}
          disabled={!name || !teacher || isSubmitting}
        >
          Salvar
        </Button>
      ),
    });
  }, [name, teacher, isSubmitting]);

  return (
    <Surface
      style={{
        ...styles.screen,
        alignItems: undefined,
        justifyContent: undefined,
      }}
    >
      <Text>Insira informações para criar uma nova matéria nesta escola.</Text>
      <TextInput
        label="Nome"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text variant="labelMedium" style={{ marginBottom: 10 }}>
        Para melhor descrição, coloque algo como "Sociologia - Turma 201/A 2025"
      </Text>
      <Teacher onSelectTeacher={(id) => setTeacher(id)} />
      <Portal>
        <Dialog visible={cancelDialog} onDismiss={() => setCancelDialog(false)}>
          <Dialog.Title>Descartar matéria?</Dialog.Title>
          <Dialog.Content>
            <Text>Você tem alterações não salvas. Deseja descartá-las?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setCancelDialog(false)}>Cancelar</Button>
            <Button
              onPress={() => {
                setCancelDialog(false);
                router.back();
              }}
            >
              Descartar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Surface>
  );
};

const Teacher = ({
  onSelectTeacher,
}: {
  onSelectTeacher: (id: string) => void;
}) => {
  const [visible, setVisible] = useState(false);
  const [teachers, setTeachers] = useState<Tables<"escola_usuarios">[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        // const { data, error } = await client
        //   .from("escola_usuarios")
        //   .select("*, usuario_perfil!inner(id)")
        //   .eq("tipo", UserTypes.Professor);

        const { data, error } = await client
          .from("escola_usuarios")
          .select("*")
          .eq("tipo", UserTypes.Professor);

        if (data) {
          setTeachers(data);
        }
      } catch (e) {
        const err = e as PostgrestError;

        console.error(err);
        Alert.alert("Erro", err.message);
      }
    }

    fetchTeachers();
  }, []);

  function handleSelected(id: string) {
    setSelectedTeacher(id);
    onSelectTeacher(id);
    setVisible(false);
  }

  return (
    <>
      <Button mode="outlined" onPress={() => setVisible(true)}>
        {selectedTeacher ? selectedTeacher : "Escolher professor"}
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <RadioButton.Group
            onValueChange={handleSelected}
            value={selectedTeacher || ""}
          >
            <FlatList
              data={teachers}
              renderItem={({ item }) => (
                <View
                  style={{
                    padding: 16,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <RadioButton value={item.id} />
                  <Text>{item.usuario}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </RadioButton.Group>
        </Dialog>
      </Portal>
    </>
  );
};

export default Page;
