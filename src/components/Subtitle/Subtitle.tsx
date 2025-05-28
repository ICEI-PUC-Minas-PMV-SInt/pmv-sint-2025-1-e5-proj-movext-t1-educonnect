import React from "react";
import { Text, TextStyle } from "react-native";

interface SubtitleProps {
  children: React.ReactNode;
  marginBottom?: number;
  marginTop?: number;
  fontSize?: number;
  textAlign?: TextStyle["textAlign"];
  color?: string;
  style?: object; 
}

const Subtitle: React.FC<SubtitleProps> = ({
  children,
  marginTop = 0,
  marginBottom = 0,
  fontSize = 16,
  textAlign = "center",
  color = "#22282399",
  style,
}) => {
  return (
    <Text
      style={[
        { marginBottom, marginTop, fontSize, textAlign, color },
        style,
      ]}
    >
      {children}
    </Text>
  );
};



export default Subtitle;
