import React, { useState, useEffect } from 'react';
import { ScrollView, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AbrigoCard from './AbrigoCard';

const API_BASE_URL = "https://api-gs-egrh.onrender.com";

export default function ListAbrigos() {
    const [abrigos, setAbrigos] = useState([]);
    const [cidade, setCidade] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAbrigos = async () => {
            setError(null);
            setLoading(true);

            try {
                const userDataString = await AsyncStorage.getItem('userData');
                if (!userDataString) {
                    throw new Error("Você não está logado. Faça login para ver os abrigos.");
                }

                const userData = JSON.parse(userDataString);
                const userCity = userData?.city;

                if (!userCity) {
                    throw new Error("Sua cidade não está configurada. Por favor, atualize seu perfil.");
                }
                
                setCidade(userCity);

                const url = `${API_BASE_URL}/api/shelters?city=${encodeURIComponent(userCity)}`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Falha ao buscar abrigos: ${response.status}`);
                }

                const data = await response.json();
                setAbrigos(data);

            } catch (err) {
                console.error("Erro ao buscar abrigos:", err);
                setError(err.message || 'Ocorreu um erro desconhecido.');
                setAbrigos([]); 
            } finally {
                setLoading(false);
            }
        };

        fetchAbrigos();
    }, []); 

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#20B2AA" />
                <Text>Carregando abrigos...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>Ocorreu um problema</Text>
                <Text style={styles.errorTextDetail}>{error}</Text>
            </View>
        );
    }
    
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.text}>Abrigos em {cidade}</Text>
            
            {abrigos && abrigos.length > 0 ? (
                abrigos.map((abrigo, index) => {
                    const enderecoCompleto = `${abrigo.adress}, ${abrigo.adressNumber} - ${abrigo.district}`;
                    const key = abrigo.id || abrigo.phone || index; 
                    
                    return (
                        <AbrigoCard
                            key={key}
                            nome={abrigo.name}
                            telefone={abrigo.phone}
                            endereco={enderecoCompleto}
                        />
                    );
                })
            ) : (
                 <View style={styles.centered}>
                    <Text style={styles.emptyText}>Nenhum abrigo encontrado para sua cidade.</Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        paddingBottom: 120,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        marginTop: 50,
    },
    errorText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#d9534f',
        textAlign: 'center',
    },
    errorTextDetail: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        marginTop: 5,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    text: {
        fontSize: 24,
        alignSelf: "flex-start",
        color: "#00819E",
        fontWeight: '600',
        marginVertical: 15,
        marginLeft: 5,
    }
});