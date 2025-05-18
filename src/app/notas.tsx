import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";

const aluno = {
  nome: "Ana Clara Lima",
  notas: [
    { disciplina: "Português", nota: 9.0 },
    { disciplina: "Matemática", nota: 8.5 },
    { disciplina: "Ciências", nota: 7.8 },
    { disciplina: "História", nota: 9.2 },
    { disciplina: "Geografia", nota: 6.0 },
    { disciplina: "Inglês", nota: 8.9 },
    { disciplina: "Educação Física", nota: 10.0 },
    { disciplina: "Artes", nota: 9.5 },
    { disciplina: "Redação", nota: 8.7 },
  ],
};

const calcularMedia = (notas: { nota: number }[]) => {
  const soma = notas.reduce((acc, item) => acc + item.nota, 0);
  return (soma / notas.length).toFixed(1);
};

export default function NotasScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.titulo}>Boletim Escolar</Text>
        <Text style={styles.subtitulo}>{aluno.nome}</Text>
      </View>

      <View style={styles.boxNotas}>
        {aluno.notas.map((n, i) => {
          let corNota = "#0057ff";
          let corTexto = "#fff";

          if (n.nota < 7) {
            corNota = "#D32F2F";
            corTexto = "#fff";
          }

          return (
            <View key={i} style={styles.linha}>
              <Text style={styles.disciplina}>{n.disciplina}</Text>
              <View style={[styles.notaBox, { backgroundColor: corNota }]}>
                <Text style={[styles.nota, { color: corTexto }]}>
                  {n.nota.toFixed(1)}
                </Text>
              </View>
            </View>
          );
        })}
        <View style={styles.linhaMedia}>
          <Text style={styles.mediaLabel}>Média Final</Text>
          <View style={styles.notaBoxMedia}>
            <Text style={styles.mediaValor}>{calcularMedia(aluno.notas)}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    padding: 24,
  },
  containerTitle: {
    backgroundColor: "#2962FF",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    borderRadius: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
    color: "#fff",
  },
  subtitulo: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    color: "#fff",
  },
  boxNotas: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 20,
    elevation: 2,
  },
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 8,
    backgroundColor: "#f0f4ff",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  disciplina: {
    fontSize: 16,
    color: "#333",
  },
  notaBox: {
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  nota: {
    fontSize: 16,
    fontWeight: "600",
  },
  linhaMedia: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  mediaLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  notaBoxMedia: {
    backgroundColor: "#0044cc",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  mediaValor: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
