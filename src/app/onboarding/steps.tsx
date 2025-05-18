import React, { useState, useRef } from "react";
import { View, Text, Image, Animated, Dimensions, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "../../components/Button/Button";
import styles from "./steps.styles";

const { width } = Dimensions.get("window");

const steps = [
  {
    title: "Bem-vindo ao EduConnect!",
    description: "Acompanhe o desempenho e fique por dentro da rotina escolar das crianças.",
    image: require("../../assets/images/image_step1.png"),
  },
  {
    title: "Comunicação Fácil",
    description: "Converse com os professores a qualquer momento pelo chat.",
    image: require("../../assets/images/image_step2.png"),
  },
  {
    title: "Não perca nenhum evento!",
    description: "Fique por dentro de reuniões e eventos escolares para se organizar e participar.",
    image: require("../../assets/images/image_step3.png"),
  },
];

const StepScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const slideAnim = useRef(new Animated.Value(0)).current;

  const animateStepChange = (nextStep: number, direction: number) => {
    Animated.timing(slideAnim, {
      toValue: direction * -width,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      slideAnim.setValue(direction * width);
      setCurrentStep(nextStep);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      router.replace("/(auth)/login");
    } else {
      animateStepChange(currentStep + 1, 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      animateStepChange(currentStep - 1, -1);
    }
  };

   const handleSkip = () => {
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ translateX: slideAnim }],
          alignItems: "center",
          width: "100%",
        }}
      >
        {currentStep < steps.length - 1 && (
       <View style={styles.containerButton}>
         <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Pular</Text>
        </TouchableOpacity>
       </View>
      )}
        <Image
          source={steps[currentStep].image}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.stepIndicator}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.circle,
                currentStep === index && styles.activeCircle,
              ]}
            />
          ))}
        </View>

        <Text style={styles.text}>{steps[currentStep].title}</Text>
        <Text style={styles.description}>{steps[currentStep].description}</Text>
      </Animated.View>

      <View style={styles.buttonContainer}>
        <CustomButton
          text={currentStep === steps.length - 1 ? "Acessar conta" : "Avançar"}
          onPress={handleNext}
        />
        {currentStep > 0 && (
          <CustomButton text="Voltar" onPress={handleBack} mode="outlined" />
        )}
      </View>
    </View>
  );
};

export default StepScreen;
