import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, StyleSheet,
    Alert, TouchableOpacity, ActivityIndicator, ScrollView, Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = "https://api-gs-egrh.onrender.com";

export default function FormUserEdit() {
    const navigation = useNavigation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [userId, setUserId] = useState(null);
    const [currentPassword, setCurrentPassword] = useState("");

    const [initialLoading, setInitialLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                const storedUserData = await AsyncStorage.getItem('userData');
                const storedPassword = await AsyncStorage.getItem('userPassword');

                if (storedUserData && storedUserId && storedPassword) {
                    const user = JSON.parse(storedUserData);
                    setName(user.name || "");
                    setEmail(user.email || "");
                    setCountry(user.country || "");
                    setCity(user.city || "");
                    setUserId(storedUserId);
                    setCurrentPassword(storedPassword);
                } else {
                    Alert.alert("Erro", "Sessão não encontrada. Por favor, faça login novamente.");
                    navigation.navigate("Tela Inicial");
                }
            } catch (error) {
                console.error("Erro ao carregar dados do AsyncStorage:", error);
                Alert.alert("Erro", "Não foi possível carregar seus dados.");
            } finally {
                setInitialLoading(false);
            }
        };

        loadUserData();
    }, [navigation]);

    const handleUpdate = async () => {
        if (!name || !email || !country || !city) {
            Alert.alert("Atenção", "Nome, e-mail, país e cidade são obrigatórios!");
            return;
        }
        if (newPassword && newPassword.length < 6) {
            Alert.alert("Atenção", "A nova senha deve ter no mínimo 6 caracteres.");
            return;
        }
        if (newPassword && newPassword !== confirmNewPassword) {
            Alert.alert("Atenção", "As novas senhas não coincidem!");
            return;
        }
        if (!userId) {
            Alert.alert("Erro", "ID do usuário não encontrado. Faça login novamente.");
            return;
        }

        setIsSubmitting(true);

        const userUpdateDto = {
            name: name,
            email: email,
            country: country,
            city: city,
            password: newPassword || currentPassword
        };

        try {
            const response = await fetch(`${API_BASE_URL}/api/user/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userUpdateDto),
            });

            if (response.ok) {
                const updatedUserData = await response.json();
                
                await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));

                if (newPassword) {
                    await AsyncStorage.setItem('userPassword', newPassword);
                }

                Alert.alert(
                    "Sucesso",
                    "Seus dados foram atualizados!",
                    [{ text: "OK", onPress: () => navigation.goBack() }]
                );
            } else {
                const errorText = await response.text();
                Alert.alert("Erro ao Atualizar", errorText || `Erro ${response.status}`);
            }
        } catch (error) {
            console.error("Erro de conexão ao atualizar dados:", error);
            Alert.alert('Erro', "Ocorreu um problema de conexão. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const placeholderColor = "#A0A0A0";

    if (initialLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FFFFFF" />
                <Text style={styles.loadingText}>Carregando seus dados...</Text>
            </View>
        );
    }

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.formContainer}>
                <Text style={styles.title}>Editar Meus Dados</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nome completo</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        editable={!isSubmitting}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        editable={!isSubmitting}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>País</Text>
                    <TextInput
                        style={styles.input}
                        value={country}
                        onChangeText={setCountry}
                        editable={!isSubmitting}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Cidade</Text>
                    <TextInput
                        style={styles.input}
                        value={city}
                        onChangeText={setCity}
                        editable={!isSubmitting}
                    />
                </View>

                <Text style={styles.sectionTitle}>Alterar Senha (opcional)</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nova Senha</Text>
                    <TextInput
                        style={styles.input}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder="Deixe em branco para não alterar"
                        placeholderTextColor={placeholderColor}
                        secureTextEntry
                        editable={!isSubmitting}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirmar Nova Senha</Text>
                    <TextInput
                        style={styles.input}
                        value={confirmNewPassword}
                        onChangeText={setConfirmNewPassword}
                        secureTextEntry
                        editable={!isSubmitting}
                    />
                </View>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={handleUpdate}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <ActivityIndicator size="small" color="#20B2AA" />
                    ) : (
                        <Text style={styles.actionButtonText}>Salvar Alterações</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => navigation.goBack()}
                    disabled={isSubmitting}
                >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#20B2AA', 
        paddingVertical: 20,
    },
    formContainer: {
        width: '90%',
        maxWidth: 500,
        alignSelf: 'center',
        padding: 20,
        backgroundColor: '#20B2AA',
        borderRadius: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#20B2AA',
    },
    loadingText: {
        marginTop: 10,
        color: '#FFFFFF',
        fontSize: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: "#FFFFFF",
        marginBottom: 25,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#FFFFFF",
        marginTop: 20,
        marginBottom: 10,
        borderTopColor: 'rgba(255,255,255,0.3)',
        borderTopWidth: 1,
        paddingTop: 20,
    },
    label: {
        fontSize: 14,
        color: "#FFFFFF",
        marginBottom: 5,
    },
    inputContainer: {
        width: "100%",
        marginBottom: 15,
    },
    input: {
        backgroundColor: "#FFFFFF",
        paddingVertical: Platform.OS === 'ios' ? 15 : 12,
        paddingHorizontal: 18,
        borderRadius: 10,
        fontSize: 16,
        color: "#333333",
    },
    actionButton: {
        backgroundColor: "#FFFFFF",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 25,
        minHeight: 50,
        justifyContent: 'center',
    },
    actionButtonText: {
        color: "#20B2AA",
        fontWeight: 'bold',
        fontSize: 18,
    },
    cancelButton: {
        backgroundColor: "transparent",
        borderColor: "#FFFFFF",
        borderWidth: 1.5,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 15,
        minHeight: 50,
        justifyContent: 'center',
    },
    cancelButtonText: {
        color: "#FFFFFF",
        fontWeight: 'bold',
        fontSize: 18,
    }
});