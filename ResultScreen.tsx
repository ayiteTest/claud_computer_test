import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

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
      <Text style={styles.text}>
        Bonjour {prenom} {nom} !
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    color: '#333',
  },
});

export default ResultScreen;