import React from "react";
import { View, StyleSheet, Image, StatusBar } from "react-native";
import FormCadastro from "../Components/FormCadastro"; 
import logo from "../../assets/climby-white.png";
import wave from "../../assets/design-tela-login.png";

export default function TelaCadastro({ navigation }) {
    const handleLogar = (dados) => {
        navigation.navigate("Tela Home", dados);
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#FF6F20" />
            <View style={styles.containerInicial}>
                <View style={styles.contentArea}>
                    <Image source={logo} style={styles.logo} />
                    <View style={styles.formWrapper}>
                        <FormCadastro onLogar={handleLogar} />
                    </View>
                </View>

                <Image
                    source={wave}
                    style={styles.waveImage}
                    resizeMode="stretch"
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    containerInicial: {
        flex: 1,
        backgroundColor: "#FF6F20", 
    },
    contentArea: {
        flex: 1, 
        justifyContent: "center",
        alignItems: "center", 
        paddingHorizontal: 30, 
        zIndex: 1,
    },
    logo: { 
        width: 100, 
        height: 100, 
        marginBottom: 40, 
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
    },

    waveImage: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%', 
        height: 550,   
        zIndex: 0,   
    },
});