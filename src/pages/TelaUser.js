import React from "react";
import { View, StyleSheet, Alert, Linking } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from "../Components/Header";
import BottomTabBar from "../Components/BottomTabBar";
import UserCard from "../Components/UserCard";
import UserServices from "../Components/UserServices";

const API_BASE_URL = "https://api-gs-egrh.onrender.com"; 

export default function TelaUser({ navigation }) {

    const handleMeusDados = () => {
        navigation.navigate("Tela User Edit");
    };

    const handleSairDaConta = async () => {
        Alert.alert(
            "Sair da Conta",
            "Você tem certeza que deseja sair?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sair",
                    onPress: async () => {
                        await AsyncStorage.clear();
                        navigation.navigate("Tela Inicial"); 
                    },
                    style: "destructive",
                },
            ]
        );
    };

    const handleExcluirCadastro = async () => {
        Alert.alert(
            "Excluir Cadastro",
            "Esta ação é irreversível. Todos os seus dados serão perdidos. Deseja continuar?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    onPress: async () => {
                        try {
                            const userId = await AsyncStorage.getItem("userId");
                            if (!userId) {
                                Alert.alert("Erro", "Não foi possível encontrar seu ID de usuário para a exclusão.");
                                return;
                            }

                            const response = await fetch(`${API_BASE_URL}/api/user/${userId}`, {
                                method: 'DELETE',
                            });

                            if (response.ok) { // Status 204 No Content
                                await AsyncStorage.clear();
                                Alert.alert("Sucesso", "Sua conta foi excluída com sucesso.");
                                navigation.navigate("Tela Inicial");
                            } else {
                                const errorText = await response.text();
                                Alert.alert("Erro ao excluir", errorText || "Não foi possível completar a solicitação.");
                            }
                        } catch (error) {
                            console.error(error);
                            Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor.");
                        }
                    },
                    style: "destructive",
                },
            ]
        );
    };

    const handleFaleConosco = async () => {
        const email = "contato@climby.com";
        const subject = "Contato via Aplicativo Climby";
        const url = `mailto:${email}?subject=${subject}`;

        const canOpen = await Linking.canOpenURL(url);

        if (canOpen) {
            await Linking.openURL(url);
        } else {
            Alert.alert("Erro", "Não foi possível abrir o aplicativo de e-mail.");
        }
    };

    return (
        <View style={styles.container}>
            <Header />
            <UserCard />
            <UserServices
                onPressMeusDados={handleMeusDados}
                onPressExcluirCadastro={handleExcluirCadastro}
                onPressFaleConosco={handleFaleConosco}
                onPressSairDaConta={handleSairDaConta}
            />
            <BottomTabBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        backgroundColor: "#FFF",
        height: "100%"
    },
});