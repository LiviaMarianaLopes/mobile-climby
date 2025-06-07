import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import logo from "../../assets/climby-white.png"

export default function Header() {
    const navigation = useNavigation();
    const handleLogout = () => {
        navigation.navigate("Tela Inicial") 

    }
    return (
    <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.text}>Climby</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.headerRightIconContainer}>
            <Ionicons name="exit-outline" size={32} color={"white"} />
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundColor: "#FF6F20",
        width: "100%",
        padding: 20,
        paddingTop: 20


    },
    header: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    logo: {
        width: 70,
        height: 35,
    },
    text: {
        fontWeight: "bold",
        fontSize: 22,
        color: "white",
        alignSelf: "flex-start",
        width: "70%",
    }
});