import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: 16,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    bottom: 25,
    right: 25,
    zIndex: 10,
  }
});

export { styles };
