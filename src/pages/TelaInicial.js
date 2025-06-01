import { View, StyleSheet, Image } from "react-native";
import FormLogin from "../Components/FormLogin";

export default function TelaInicial({ navigation }) {
    const handleLogar = (dados) => {
        navigation.navigate("Tela Home", dados);
    };

    return (
        <>
            <View style={styles.containerInicial}>
                <View>
                    <FormLogin onLogar={handleLogar} />
                </View>

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    containerInicial: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
        paddingTop: 130
    },
    icon: {
        width: 240,
        height: 40,
        marginRight: 15,
    },

})