import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'; 

const ClimbyInfoCard = () => {
  const funcionalidades = [
    "Abrigos Seguros: Encontre rapidamente abrigos verificados e disponíveis perto de você em momentos de necessidade.",
    "Sua Conta Climby: Crie seu perfil e gerencie suas informações de forma simples e segura.",
    "Alertas em Tempo Real: Receba notificações instantâneas sobre eventos climáticos extremos que podem afetar sua região, com dados atualizados diretamente da OpenWeather API.",
    "Previsão de Riscos: Acesse previsões de risco para eventos futuros, geradas por nossa inteligência artificial, e prepare-se com antecedência."
  ];

  return (
    <ScrollView style={styles.screenContainer} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Mais informações</Text>
      </View>

      {/* Card "Sobre o Climby" com o texto gerado */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sobre o Climby</Text>
        <Text style={styles.cardParagraph}>
          Em tempos de eventos climáticos extremos, como enchentes e tempestades,
          ter a informação certa na hora certa pode fazer toda a diferença. O
          Climby é seu aliado para enfrentar esses desafios, colocando a
          segurança e a informação na palma da sua mão. Nosso aplicativo foi
          pensado para que você e sua comunidade estejam sempre um passo à frente.
        </Text>
      </View>

      {/* Seção "Funcionalidades do App" com os textos gerados */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Funcionalidades do App</Text>
        {funcionalidades.map((funcionalidade, index) => (
          <View key={index} style={styles.bulletItem}>
            <Text style={styles.bullet}>• </Text>
            <Text style={styles.sectionParagraph}>{funcionalidade}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Como fazer parte?</Text>
        <Text style={styles.sectionParagraph}>
          Se você possui um espaço que pode servir como abrigo seguro durante
          eventos climáticos extremos e deseja ajudar sua comunidade, entre em
          contato conosco para cadastrá-lo em nossa plataforma.
        </Text>
        <Text style={styles.contactText}>Telefone: (11)95874-2587</Text>
        <Text style={styles.contactText}>Email: climby@email.com</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1, 
    paddingLeft: 10,      
    paddingRight: 25,    
    marginBottom: 20,
},
  contentContainer: {
    paddingBottom: 40, 
  },
  header: {
    alignItems: 'flex-start', 
    paddingLeft: 20,
  },
    headerText: {
    fontSize: 22,
    alignSelf: "flex-start",
    color: "#00819E",
    fontWeight: 600,
    marginVertical: 15
  },
  card: {
    backgroundColor: '#00819E',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  cardParagraph: {
    fontSize: 14,
    color: '#ffffff',
    lineHeight: 20,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00A487',
    marginBottom: 10,
  },
  sectionParagraph: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 5,
    lineHeight: 20,
    flexShrink: 1,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 14,
    color: '#333333',
    marginRight: 5,
    lineHeight: 20,
  },
  contactText: {
    fontSize: 14,
    color: '#555555',
    marginTop: 10,
  },
});

export default ClimbyInfoCard;