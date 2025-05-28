import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import styles from "./styles";
import CustomButton from "../../../components/Button/Button";
import { Icon } from "react-native-paper";
import Title from "@/components/Title/Title";
import Subtitle from "@/components/Subtitle/Subtitle";

const UserTypeSelect = () => {
  const [selectedType, setSelectedType] = useState<"responsavel" | "professor">("responsavel");
  const router = useRouter();

  const handleContinue = () => {
    if (selectedType === "responsavel") {
      router.replace("/(auth)/login");
    } else {
      router.replace("/(auth)/login-teacher");
    }
  };

  return (
    <View style={styles.container}>
      <Title text="Escolha seu perfil"/>
      <Subtitle marginBottom={24} marginTop={16}>Informe se você é responsável ou professor para personalizar sua experiência</Subtitle>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.optionBox,
            selectedType === "responsavel" && styles.selectedBox,
          ]}
          onPress={() => setSelectedType("responsavel")}
        >

           <View style={[styles.iconBox, selectedType === "responsavel" && styles.selectedIconBox]}>
            <Icon source="account-group-outline" size={24} color={selectedType === "responsavel" ? "#ffffff" : "#22282399"} />
          </View>

          <Text style={styles.optionTitle}>Responsável</Text>
          <Text style={styles.optionDesc}>Acompanhe o desempenho escolar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionBox,
            selectedType === "professor" && styles.selectedBox,
          ]}
          onPress={() => setSelectedType("professor")}
        >
         
          <View style={[styles.iconBox, selectedType === "professor" && styles.selectedIconBox]}>
              <Icon source="palette-outline" size={24} color={selectedType === "professor" ? "#ffffff" : "#22282399"} />
          </View>


          <Text style={styles.optionTitle}>Professor</Text>
          <Text style={styles.optionDesc}>Gerencie sua turma e agenda</Text>
        </TouchableOpacity>
      </View>

      <CustomButton text="Continuar" onPress={handleContinue} />
    </View>
  );
};

export default UserTypeSelect;
