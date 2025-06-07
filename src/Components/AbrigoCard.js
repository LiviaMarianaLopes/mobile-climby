import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const AbrigoCard = ({ nome, telefone, endereco }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} activeOpacity={0.7}>
      <View style={styles.textContainer}>
        <Text style={styles.nomeAbrigo}>{nome}</Text>
        <View style={styles.infoLinha}>
          <Ionicons name="call-outline" size={16} color="white" style={styles.icon} />
          <Text style={styles.infoTexto}>Telefone: {telefone}</Text>
        </View>
        <View style={styles.infoLinha}>
          <Ionicons name="location-outline" size={16} color="white" style={styles.icon} />
          <Text style={styles.infoTexto}>Endereço: {endereco}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "95%",
    backgroundColor: '#00A487',
    borderRadius: 15,        
    padding: 30,          
    marginBottom: 15,       
    flexDirection: 'row',     
    justifyContent: 'space-between', 
    alignItems: 'center',     
    elevation: 3,        
    shadowColor: '#000',     
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  nomeAbrigo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  infoLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    marginRight: 8,
  },
  infoTexto: {
    fontSize: 15,
    color: 'white',
    flexShrink: 1, 
    paddingRight: 4
  },
});

export default AbrigoCard;