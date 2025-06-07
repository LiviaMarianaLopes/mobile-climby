import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
    View, Text, TextInput, StyleSheet,
    Alert, TouchableOpacity, ActivityIndicator, ScrollView, Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://api-gs-egrh.onrender.com"; 

export default function FormCadastro() {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!name || !email || !password || !confirmarSenha || !country || !city) {
            Alert.alert("Atenção", "Preencha todos os campos obrigatórios!");
            return;
        }
        if (password !== confirmarSenha) {
            Alert.alert("Atenção", "As senhas não coincidem!");
            return;
        }

        setLoading(true);

        const userCreateDto = {
            Name: name,
            Email: email,
            Password: password,
            Country: country,
            City: city,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/api/user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userCreateDto),
            });

            if (response.status === 201) {
                const createdUser = await response.json();

                await AsyncStorage.setItem("userData", JSON.stringify(createdUser));
                await AsyncStorage.setItem("userId", createdUser.id.toString());

                navigation.navigate("Tela Home") 
            } else {
                const errorText = await response.text();
                Alert.alert(
                    "Erro ao criar conta",
                    errorText || `Erro ${response.status}: Verifique os dados e tente novamente.`
                );
            }
        } catch (error) {
            console.error(error);
            Alert.alert(
                "Erro de Conexão",
                "Não foi possível se conectar ao servidor. Verifique sua rede e a URL da API."
            );
        } finally {
            setLoading(false);
        }
    };

    const placeholderColor = "#A0A0A0";

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.formContainer}>
                <Text style={styles.title}>Crie sua conta</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Nome completo"
                        placeholderTextColor={placeholderColor}
                        editable={!loading}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="E-mail"
                        placeholderTextColor={placeholderColor}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        editable={!loading}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Senha (mínimo 6 caracteres)"
                        placeholderTextColor={placeholderColor}
                        secureTextEntry
                        editable={!loading}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                        placeholder="Confirmar senha"
                        placeholderTextColor={placeholderColor}
                        secureTextEntry
                        editable={!loading}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={country}
                        onChangeText={setCountry}
                        placeholder="País"
                        placeholderTextColor={placeholderColor}
                        editable={!loading}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={city}
                        onChangeText={setCity}
                        placeholder="Cidade"
                        placeholderTextColor={placeholderColor}
                        editable={!loading}
                    />
                </View>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                        <Text style={styles.actionButtonText}>Criar Conta</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryLinkContainer}
                    onPress={() => navigation.navigate("Tela Inicial")}
                    disabled={loading}
                >
                    <Text style={styles.linkText}>Já tem uma conta? Faça login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    formContainer: {
        width: '100%', 
        maxWidth: 400,
        alignItems: "center",
        paddingBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: "#FFFFFF",
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        width: "100%", 
        marginBottom: 15,
        alignItems: 'center'
    },
    input: {
        backgroundColor: "#FFFFFF",
        paddingVertical: Platform.OS === 'ios' ? 16 : 14,
        paddingHorizontal: 20,
        borderRadius: 15,
        fontSize: 16,
        color: "#333333",
        width: 300,
    },
    actionButton: {
        backgroundColor: "transparent",
        borderColor: "#FFFFFF",
        borderWidth: 2.3,
        paddingVertical: 12,
        borderRadius: 15,
        width: 250, 
        alignItems: "center",
        marginTop: 25,
        minHeight: 50,
        justifyContent: 'center',
    },
    actionButtonText: { 
        color: "#FFFFFF",
        fontWeight: 'bold',
        fontSize: 20, 
    },
    secondaryLinkContainer: { 
        marginTop: 30, 
        alignItems: "center",
    },
    linkText: {
        color: "#FFFFFF",
        fontSize: 14,
    },
});