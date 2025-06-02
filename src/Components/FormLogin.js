import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View, Text, TextInput, StyleSheet,
  Alert, TouchableOpacity, ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "./firebaseConfig";

const API_BASE_URL = "https://localhost:5283";

export default function FormLogin() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword( email, senha);
      const firebaseUser = userCredential.user;

      const idToken = await firebaseUser.getIdToken();
      const firebaseUid = firebaseUser.uid;

      const responseApi = await fetch(`${API_BASE_URL}/api/paciente/firebase/${firebaseUid}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (responseApi.ok) {
        const pacienteDetails = await responseApi.json();

        await AsyncStorage.setItem("pacienteAppId", pacienteDetails.id.toString());
        await AsyncStorage.setItem("firebaseUserId", firebaseUid);
        await AsyncStorage.setItem("userData", JSON.stringify(pacienteDetails));

        setLoading(false);
        navigation.navigate("Tela Home");

      } else {
        const errorDataApi = await responseApi.text();
        Alert.alert(
          "Erro Pós-Login",
          `Seu login Firebase foi bem-sucedido, mas não conseguimos buscar seus dados de paciente (Status: ${responseApi.status}). Por favor, contate o suporte.`
        );
        setLoading(false);
      }

    } catch (error) {
      setLoading(false);
      let errorMessage = "Ocorreu um erro ao tentar fazer login.";
      if (error.code) {
        if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
          errorMessage = "E-mail ou senha inválidos.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "O formato do e-mail é inválido.";
        } else if (error.code === "auth/too-many-requests") {
          errorMessage = "Muitas tentativas de login. Tente novamente mais tarde.";
        }
      } else if (error.message && error.message.includes('Network request failed')) {
          errorMessage = "Erro de conexão. Verifique sua internet ou a URL da API.";
      }
      Alert.alert("Erro ao Logar", errorMessage);
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

            <TouchableOpacity style={styles.registerContainer}  onPress={() => navigation.navigate("Tela Cadastro")}>
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
        fontWeight: 1000,
        fontSize: 22,
    },
    registerContainer: {
        marginTop: 20,
        alignItems: "center",
    },
});