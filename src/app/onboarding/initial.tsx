// app/onboarding/IntroScreen.tsx
import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

const IntroScreen = ({ navigation }: { navigation: any }) => {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding/steps");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo_eduConnect.png")}
        resizeMode="contain"
        style={{ width: 290 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2962FF",
  },
});

export default IntroScreen;
