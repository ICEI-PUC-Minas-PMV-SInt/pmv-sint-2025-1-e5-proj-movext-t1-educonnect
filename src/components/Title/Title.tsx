import React from "react";
import { Text, TextStyle, ViewStyle } from "react-native";

interface TitleProps {
  text: string;
  style?: TextStyle;
  containerStyle?: ViewStyle;
  color?: string;
  size?: number;
  weight?: "normal" | "bold" | "500" | "600" | "700";
  align?: "left" | "center" | "right";
}

const Title = ({
  text,
  style,
  color = "#222823",
  size = 20,
  weight = "bold",
  align = "center",
}: TitleProps) => {
  return (
    <Text
      style={[
        {
          color,
          fontSize: size,
          fontWeight: weight,
          textAlign: align,
        },
        style,
      ]}
    >
      {text}
    </Text>
  );
};



export default Title;
