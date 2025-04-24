import Colors from "../styles/colors";

export type Setting = {
  color: keyof typeof Colors.light;
  theme: "light" | "dark" | "auto";
};
