import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function UserCard() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            const loadUserData = async () => {
                try {
                    const jsonValue = await AsyncStorage.getItem('userData');
                    if (jsonValue !== null) {
                        const user = JSON.parse(jsonValue);
                        setUserData(user);
                    }
                } catch (e) {
                    console.error("Erro ao carregar dados do usuário do AsyncStorage", e);
                } finally {
                    setLoading(false);
                }
            };

            loadUserData();

            return () => {
                setUserData(null); 
                setLoading(true);
            };
        }, [])
    );

    if (loading) {
        return (
            <View style={[styles.card, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="white" />
            </View>
        );
    }
    
    if (!userData) {
        return (
             <View style={styles.card}>
                <Text style={styles.email}>Usuário não encontrado.</Text>
            </View>
        )
    }

    return (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <Ionicons name="person-circle" size={100} color="white" />
            </View>
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.email}>{userData.email}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#00A487',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        marginTop: 20, 
        width: "85%",
        minHeight: 220, 
    },
    loadingContainer: {
        justifyContent: 'center',
    },
    iconContainer: {
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
        textAlign: 'center',
    },
    email: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
});