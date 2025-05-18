import React from "react";
import { Button } from "react-native-paper";

interface CustomButtonProps {
  text: string;
  onPress: () => void;
  mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
  style?: any;
  labelStyle?: any;
  color?: string; 
  textColor?: string;
  [key: string]: any;
}

const CustomButton = ({
  text,
  onPress,
  mode = "contained",
  style,
  labelStyle,
  color = "#2962FF",
  textColor = "#ffffff",
  ...rest
}: CustomButtonProps) => {
  const isOutlined = mode === "outlined";

  return (
    <Button
      mode={mode}
      onPress={onPress}
      style={[
        {
          backgroundColor: isOutlined ? "transparent" : color,
          borderColor: color,
          borderWidth:  2,
          borderRadius: 4,
        },
        style,
      ]}
      labelStyle={[
        {
          color: isOutlined ? color : textColor,
          fontWeight: "bold",
          fontSize: 16,
        },
        labelStyle,
      ]}
      contentStyle={{ paddingVertical: 6 }}
      {...rest}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
