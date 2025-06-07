import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Header from "../Components/Header";
import BottomTabBar from "../Components/BottomTabBar";
import CardInfo from "../Components/CardInfo";

export default function TelaInfo() {
  return (
    <View style={styles.container}>
      <Header/>
      <CardInfo/>
      <BottomTabBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    backgroundColor:"#FFF",
    height:"100%"
  },
  text: {
    fontSize: 24,
    alignSelf: "flex-start",
    padding: 10,
    paddingLeft: 20,
    color: "#00819E",
    fontWeight: 600
  }
});
