import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';

type ResultScreenProps = {
  route: {
    params: {
      nom: string;
      prenom: string;
    };
  };
};

const ResultScreen: React.FC<ResultScreenProps> = ({route}) => {
  const {nom, prenom} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Image
          source={require('./assets/mario-character.png')}
          style={styles.backgroundImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>
          Bravo {prenom} {nom} !
        </Text>
        <Text style={styles.subText}>Formulaire validé avec succès !</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#e52521',
    marginBottom: 10,
  },
  subText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#333',
  },
});

export default ResultScreen;