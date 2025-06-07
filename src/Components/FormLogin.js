import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View, Text, TextInput, StyleSheet,
  Alert, TouchableOpacity, ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://api-gs-egrh.onrender.com";

export default function FormLogin() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Por favor, preencha o e-mail e a senha.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Email: email,
          Password: senha 
        })
      });

      if (response.ok) {
        const userData = await response.json();

        await AsyncStorage.setItem("userData", JSON.stringify(userData));
        
        await AsyncStorage.setItem("userId", userData.id.toString());

        AsyncStorage.setItem("password", senha)

        setLoading(false);
        navigation.navigate("Tela Home");

      } else {
        const errorText = await response.text();
        Alert.alert("Erro de Login", errorText || "E-mail ou senha inválidos.");
        setLoading(false);
      }

    } catch (error) {
      setLoading(false);
      console.error("Fetch Error:", error);
      Alert.alert(
        "Erro de Conexão", 
        "Não foi possível conectar ao servidor. Verifique sua conexão com a internet."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="E-mail"
          placeholderTextColor="#A0A0A0" 
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
          placeholderTextColor="#A0A0A0"
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.linkText}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.loginButtonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerContainer} onPress={() => navigation.navigate("Tela Cadastro")}>
        <Text style={styles.linkText}>Não possui conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        marginBottom: 80,
    },
    inputContainer: {
        width: "100%",
        marginBottom: 15,
    },
    input: {
        width: 300,
        backgroundColor: "#FFFFFF",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 15,
        fontSize: 16,
        color: "#333333",
    },
    forgotPasswordContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginBottom: 35,
        marginLeft: 160
    },
    linkText: {
        color: "#FFFFFF",
        fontSize: 13,
    },
    loginButton: {
        backgroundColor: "transparent", 
        borderColor: "#FFFFFF",       
        borderWidth: 2.3,
        paddingVertical: 10,
        borderRadius: 15,           
        width: 200,
        alignItems: "center",
        marginTop: 10,
        minHeight: 50,
        justifyContent: 'center',
    },
    loginButtonText: {
        color: "#FFFFFF",
        fontWeight: 'bold',
        fontSize: 22,
    },
    registerContainer: {
        marginTop: 20,
        alignItems: "center",
    },
});