import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 32,
    width: '100%',
  },
  optionBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    width: "100%",
  },
  selectedBox: {
    borderColor: "#2962FF",
  },
  iconBox: {
    width: 'auto',
    height: 'auto',
    borderRadius: 4,
    backgroundColor: "#2228231A",
    padding: 4,
  },
  selectedIconBox: {
    backgroundColor: "#2962FF",
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  optionDesc: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
});
