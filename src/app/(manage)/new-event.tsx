import { useAuth } from "@/lib/components/Auth";
import { styles } from "@/lib/styles";
import { EventType } from "@/lib/types/school";
import { client, UserTypes } from "@/lib/utils/client";
import { Tables } from "@/lib/utils/client.types";
import DateTimePicker from "@react-native-community/datetimepicker";
import { PostgrestError, UserMetadata } from "@supabase/supabase-js";
import { router, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Alert, FlatList, Platform, ScrollView, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Checkbox,
  Chip,
  Dialog,
  IconButton,
  Portal,
  SegmentedButtons,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";

const Page = () => {
  const navigation = useNavigation();
  const [name, setName] = useState<string>("");
  const [eventType, setEventType] = useState<EventType>("Prova");
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [showStartTimePicker, setShowStartTimePicker] =
    useState<boolean>(false);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [showEndTimePicker, setShowEndTimePicker] = useState<boolean>(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [addToTeacherCalendar, setAddToTeacherCalendar] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cancelDialog, setCancelDialog] = useState(false);

  function handleCancel() {
    if (name || selectedStudents.length > 0 || selectedTeacher) {
      setCancelDialog(true);
    } else {
      router.back();
    }
  }

  async function handleSubmit() {
    if (
      !name ||
      !eventType ||
      selectedStudents.length === 0 ||
      !selectedTeacher
    ) {
      Alert.alert(
        "Campos incompletos",
        "Preencha todos os campos obrigatórios."
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const formattedStartTime = startTime
        ? `${startTime.getHours().toString().padStart(2, "0")}:${startTime
            .getMinutes()
            .toString()
            .padStart(2, "0")}:00`
        : null;
      const formattedEndTime = endTime
        ? `${endTime.getHours().toString().padStart(2, "0")}:${endTime
            .getMinutes()
            .toString()
            .padStart(2, "0")}:00`
        : null;

      const events = selectedStudents.map((studentId) => ({
        nome: name,
        categoria: eventType,
        data: formattedDate,
        horario_de: formattedStartTime,
        horario_ate: formattedEndTime,
        usuario: studentId,
        lido: false,
      }));

      if (addToTeacherCalendar && selectedTeacher) {
        events.push({
          nome: name,
          categoria: eventType,
          data: formattedDate,
          horario_de: formattedStartTime,
          horario_ate: formattedEndTime,
          usuario: selectedTeacher,
          lido: false,
        });
      }

      const { error } = await client.from("calendario").insert(events).select();

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

  const onChangeDatePicker = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onChangeStartTimePicker = (event: any, selectedTime?: Date) => {
    setShowStartTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      setStartTime(selectedTime);
    }
  };

  const onChangeEndTimePicker = (event: any, selectedTime?: Date) => {
    setShowEndTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      setEndTime(selectedTime);
    }
  };

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
          disabled={
            !name ||
            !eventType ||
            selectedStudents.length === 0 ||
            !selectedTeacher ||
            isSubmitting
          }
        >
          Salvar
        </Button>
      ),
    });
  }, [name, eventType, selectedStudents, selectedTeacher, isSubmitting]);

  return (
    <Surface
      style={{
        ...styles.screen,
        alignItems: undefined,
        justifyContent: undefined,
      }}
    >
      <ScrollView>
        <Text style={{ marginBottom: 16 }}>
          Crie um novo evento para o calendário escolar.
        </Text>

        <TextInput
          label="Nome do evento"
          value={name}
          onChangeText={(text) => setName(text)}
          style={{ marginBottom: 16 }}
        />

        <Text variant="labelMedium">Tipo de Evento</Text>
        <SegmentedButtons
          value={eventType}
          onValueChange={(value) => setEventType(value as EventType)}
          buttons={[
            { value: "Prova", label: "Prova" },
            { value: "Reunião", label: "Reunião" },
            { value: "Passeio", label: "Passeio" },
          ]}
          style={{ marginBottom: 16 }}
        />

        <Text variant="labelMedium">Data</Text>
        <Button
          mode="outlined"
          onPress={() => setShowDatePicker(true)}
          style={{ marginBottom: 16 }}
        >
          {date.toLocaleDateString("pt-BR")}
        </Button>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDatePicker}
          />
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text variant="labelMedium">Horário de início (opcional)</Text>
            <Button
              mode="outlined"
              onPress={() => setShowStartTimePicker(true)}
            >
              {startTime
                ? startTime.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Selecionar"}
            </Button>

            {showStartTimePicker && (
              <DateTimePicker
                value={startTime || new Date()}
                mode="time"
                display="default"
                onChange={onChangeStartTimePicker}
              />
            )}
          </View>

          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text variant="labelMedium">Horário de término (opcional)</Text>
            <Button
              mode="outlined"
              onPress={() => setShowEndTimePicker(true)}
              disabled={!startTime}
            >
              {endTime
                ? endTime.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Selecionar"}
            </Button>

            {showEndTimePicker && (
              <DateTimePicker
                value={endTime || startTime || new Date()}
                mode="time"
                display="default"
                onChange={onChangeEndTimePicker}
              />
            )}
          </View>
        </View>

        <TeacherSelector
          onSelectTeacher={(id) => setSelectedTeacher(id)}
          selectedTeacher={selectedTeacher}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 8,
          }}
        >
          <Checkbox
            status={addToTeacherCalendar ? "checked" : "unchecked"}
            onPress={() => setAddToTeacherCalendar(!addToTeacherCalendar)}
          />
          <Text onPress={() => setAddToTeacherCalendar(!addToTeacherCalendar)}>
            Adicionar ao calendário do professor
          </Text>
        </View>

        <StudentSelector
          onStudentsSelected={(ids) => setSelectedStudents(ids)}
          selectedStudents={selectedStudents}
        />
      </ScrollView>

      <Portal>
        <Dialog visible={cancelDialog} onDismiss={() => setCancelDialog(false)}>
          <Dialog.Title>Descartar evento?</Dialog.Title>
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

type TeacherExtended = Tables<"escola_usuarios"> & {
  usuario_perfil: UserMetadata;
};

const TeacherSelector = ({
  onSelectTeacher,
  selectedTeacher,
}: {
  onSelectTeacher: (id: string) => void;
  selectedTeacher: string | null;
}) => {
  const [visible, setVisible] = useState(false);
  const [teachers, setTeachers] = useState<TeacherExtended[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchTeachers() {
      try {
        setLoading(true);
        const { data, error } = await client
          .from("escola_usuarios")
          .select("*, usuario_perfil!inner(*)")
          .eq("tipo", UserTypes.Professor);

        if (error) {
          throw error;
        }

        setTeachers(data || []);
      } catch (e) {
        const err = e as PostgrestError;
        console.error("Erro ao buscar professores:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTeachers();
  }, []);

  function handleSelected(id: string) {
    onSelectTeacher(id);
    setVisible(false);
  }

  if (loading) {
    return (
      <View style={{ marginVertical: 16 }}>
        <Text variant="labelMedium">Professor Responsável</Text>
        <ActivityIndicator style={{ marginTop: 8 }} />
      </View>
    );
  }

  if (error) {
    return <Text>Erro ao carregar professores: {error}</Text>;
  }

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.usuario_perfil.primeiro_nome
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      teacher.usuario_perfil.sobrenome
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const selectedTeacherName = selectedTeacher
    ? teachers.find((t) => t.id === selectedTeacher)?.usuario_perfil
        .primeiro_nome +
      " " +
      teachers.find((t) => t.id === selectedTeacher)?.usuario_perfil.sobrenome
    : null;

  return (
    <View style={{ marginVertical: 16 }}>
      <Text variant="labelMedium">Professor Responsável</Text>
      <Button
        mode="outlined"
        onPress={() => setVisible(true)}
        style={{ marginTop: 8 }}
      >
        {selectedTeacherName || "Selecionar professor"}
      </Button>

      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => setVisible(false)}
          style={{ maxHeight: "80%" }}
        >
          <Dialog.Title>Selecionar Professor</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Buscar professores"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{ marginBottom: 16 }}
            />

            <FlatList
              data={filteredTeachers}
              renderItem={({ item }) => (
                <Button
                  mode="text"
                  onPress={() => handleSelected(item.id)}
                  style={{
                    justifyContent: "flex-start",
                    paddingVertical: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: "#eee",
                  }}
                >
                  {item.usuario_perfil.primeiro_nome}{" "}
                  {item.usuario_perfil.sobrenome}
                </Button>
              )}
              keyExtractor={(item) => item.id}
              style={{ maxHeight: 300 }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancelar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const StudentSelector = ({
  onStudentsSelected,
  selectedStudents,
}: {
  onStudentsSelected: (ids: string[]) => void;
  selectedStudents: string[];
}) => {
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<TeacherExtended[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    async function fetchStudents() {
      if (!session?.user?.id) return;

      try {
        setLoading(true);

        const { data, error } = await client
          .from("escola_usuarios")
          .select("*, usuario_perfil!inner(*)")
          .eq("tipo", UserTypes.Aluno);

        if (error) {
          throw error;
        }

        setStudents(data || []);
      } catch (e) {
        const err = e as PostgrestError;
        console.error("Erro ao buscar alunos:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, [session?.user?.id]);

  const toggleStudent = (id: string) => {
    if (selectedStudents.includes(id)) {
      onStudentsSelected(
        selectedStudents.filter((studentId) => studentId !== id)
      );
    } else {
      onStudentsSelected([...selectedStudents, id]);
    }
  };

  if (loading) {
    return (
      <View style={{ marginTop: 16 }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return <Text>Erro ao carregar alunos: {error}</Text>;
  }

  const filteredStudents = students.filter(
    (student) =>
      student.usuario_perfil.primeiro_nome
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      student.usuario_perfil.sobrenome
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ marginTop: 16 }}>
      <Text variant="labelMedium">
        Alunos ({selectedStudents.length} selecionados)
      </Text>

      <Button
        mode="outlined"
        onPress={() => setDialogVisible(true)}
        style={{ marginVertical: 8 }}
      >
        Selecionar alunos
      </Button>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {selectedStudents.length > 0 ? (
          students
            .filter((student) => selectedStudents.includes(student.id))
            .map((student) => (
              <Chip
                key={student.id}
                onClose={() => toggleStudent(student.id)}
                mode="outlined"
              >
                {student.usuario_perfil.primeiro_nome}{" "}
                {student.usuario_perfil.sobrenome}
              </Chip>
            ))
        ) : (
          <Text>Nenhum aluno selecionado</Text>
        )}
      </View>

      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
          style={{ maxHeight: "80%" }}
        >
          <Dialog.Title>Selecionar alunos</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Buscar alunos"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{ marginBottom: 16 }}
            />

            <FlatList
              data={filteredStudents}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: "#eee",
                  }}
                >
                  <Checkbox
                    status={
                      selectedStudents.includes(item.id)
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => toggleStudent(item.id)}
                  />
                  <Text style={{ marginLeft: 8 }}>
                    {item.usuario_perfil.primeiro_nome}{" "}
                    {item.usuario_perfil.sobrenome}
                  </Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
              style={{ maxHeight: 300 }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Pronto</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default Page;
