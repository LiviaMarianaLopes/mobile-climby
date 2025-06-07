import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

const screenWidth = Dimensions.get('window').width;

const BottomTabBar = ({ activeRouteName }) => {
  const navigation = useNavigation();

  const routes = [
    { name: 'Tela Info', icon: 'information-circle-outline', iconFocused: 'information-circle', label: 'Informações' },
    { name: 'Tela Home', icon: 'home-outline', iconFocused: 'home', label: 'Início' },
    { name: 'Tela User', icon: 'person-outline', iconFocused: 'person', label: 'Perfil' },
  ];

  const onNavigate = (routeName) => {
    navigation.navigate(routeName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {routes.map((route) => {
          const isActive = activeRouteName === route.name;
          return (
            <TouchableOpacity
              key={route.name}
              style={styles.tabItem}
              onPress={() => onNavigate(route.name)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isActive ? route.iconFocused : route.icon}
                size={isActive ? 30 : 28} 
                color="white"
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FF6F20', 
    borderRadius: 30,       
    height: 65,             
    width: screenWidth * 0.8, 
    marginBottom: 40,     
    elevation: 8,          
    shadowColor: '#000',     
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    paddingHorizontal: 10, 
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10, 
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 2,
    color: 'white', 
  },
});

export default BottomTabBar;
