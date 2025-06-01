import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View, Text, TextInput, StyleSheet,
  Alert, TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FormLogin() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch("https://minha-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem("pacienteId", JSON.stringify(data));
        navigation.navigate("Tela Home");
      } else {
        const errorData = await response.json();
        Alert.alert("Erro ao logar", errorData.message || "Erro desconhecido");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      Alert.alert("Erro de conexão", "Tente novamente mais tarde.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entre na sua conta:</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="E-mail"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          placeholder="Senha"
          placeholderTextColor="#888"
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate("Tela Cadastro")}>
          <Text style={styles.registerText}>Criar conta</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.helpContainer}>
        <Text style={styles.helpText}>Ajuda ?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
    textAlign: "center",
    paddingHorizontal: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    color: "#0063FF",
    alignSelf: "flex-start",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 50,
    marginBottom: 10,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 13,
  },
  link: {
    color: "#007AFF",
    fontSize: 13,
    textDecorationLine: "underline"
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 50,
    marginRight: 10,
    width: 147,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  registerButton: {
    borderWidth: 1,
    borderColor: "#007AFF",
    padding: 12,
    borderRadius: 50,
    width: 147,
    alignItems: "center",
  },
  registerText: {
    color: "#007AFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  helpContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  helpText: {
    marginTop: 150,
    color: "#007AFF",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
