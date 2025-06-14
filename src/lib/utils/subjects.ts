export type SubjectName =
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

export type SubjectData = { icon: string; color: string };

export const getSubjectDataByName = (name: string): SubjectData => {
  const map: Record<SubjectName, SubjectData> = {
    Matemática: { icon: "calculator", color: "#FF9800" },
    Física: { icon: "atom", color: "#2962FF" },
    Química: { icon: "test-tube", color: "#00BCD4" },
    Biologia: { icon: "leaf", color: "#4CAF50" },
    História: { icon: "book-clock", color: "#7E57C2" },
    Geografia: { icon: "map", color: "#7E57C2" },
    Filosofia: { icon: "lightbulb-on-outline", color: "#9E9E9E" },
    Sociologia: { icon: "account-group-outline", color: "#8BC34A" },
    "Ed. Física": { icon: "run-fast", color: "#00C853" },
    Inglês: { icon: "translate", color: "#7096FE" },
    Artes: { icon: "palette", color: "#FF4081" },
    "L. Portuguesa": { icon: "book-open-page-variant", color: "#9C27B0" },
  };

  if (name in map) {
    return map[name as SubjectName];
  }

  return { icon: "book", color: "#999" }; 
};
