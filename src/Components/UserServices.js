import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const UserServices = ({
  onPressMeusDados,
  onPressExcluirCadastro,
  onPressFaleConosco,
  onPressSairDaConta,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.tealButton]}
        onPress={onPressMeusDados}
        activeOpacity={0.7}
      >
        <Text style={styles.tealButtonText}>Meus dados</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.tealButton]}
        onPress={onPressExcluirCadastro}
        activeOpacity={0.7}
      >
        <Text style={styles.tealButtonText}>Excluir cadastro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.tealButton]}
        onPress={onPressFaleConosco}
        activeOpacity={0.7}
      >
        <Text style={styles.tealButtonText}>Fale conosco</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={onPressSairDaConta}
        activeOpacity={0.7}
      >
        <Text style={styles.logoutButtonText}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20, 
    paddingVertical: 10,  
  },
  button: {
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    width: '100%',  
  },
  tealButton: {
    backgroundColor: '#00819E',
    width: 300,
  },
  tealButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'transparent', 
    borderColor: '#FF6F20',  
    borderWidth: 2,
    alignSelf:  "center",
    marginTop: 15,
    width: 250,
  },
  logoutButtonText: {
    color: '#FF6F20',     
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserServices;