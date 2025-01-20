/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ResultScreen from './ResultScreen';

const Stack = createNativeStackNavigator();

type FormScreenProps = {
  navigation: any;
};

function FormScreen({navigation}: FormScreenProps): React.JSX.Element {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  
  // États pour les messages d'erreur
  const [nomError, setNomError] = useState('');
  const [prenomError, setPrenomError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Validation de l'email avec une expression régulière
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  // Validation du nom et prénom (minimum 2 caractères, lettres uniquement)
  const validateName = (name: string): boolean => {
    const nameRegex = /^[A-Za-zÀ-ÿ\s]{2,}$/;
    return nameRegex.test(name);
  };

  // Validation des champs individuels
  const validateNom = (value: string) => {
    if (value.trim() === '') {
      setNomError('Le nom est requis');
      return false;
    } else if (!validateName(value)) {
      setNomError('Le nom doit contenir au moins 2 caractères et uniquement des lettres');
      return false;
    }
    setNomError('');
    return true;
  };

  const validatePrenom = (value: string) => {
    if (value.trim() === '') {
      setPrenomError('Le prénom est requis');
      return false;
    } else if (!validateName(value)) {
      setPrenomError('Le prénom doit contenir au moins 2 caractères et uniquement des lettres');
      return false;
    }
    setPrenomError('');
    return true;
  };

  const validateEmailField = (value: string) => {
    if (value.trim() === '') {
      setEmailError('L\'email est requis');
      return false;
    } else if (!validateEmail(value)) {
      setEmailError('Veuillez entrer une adresse email valide');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Gestionnaires de changement avec validation en temps réel
  const handleNomChange = (value: string) => {
    setNom(value);
    if (formSubmitted) {
      validateNom(value);
    }
  };

  const handlePrenomChange = (value: string) => {
    setPrenom(value);
    if (formSubmitted) {
      validatePrenom(value);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (formSubmitted) {
      validateEmailField(value);
    }
  };

  const handleSubmit = () => {
    setFormSubmitted(true);
    
    const isNomValid = validateNom(nom);
    const isPrenomValid = validatePrenom(prenom);
    const isEmailValid = validateEmailField(email);

    if (isNomValid && isPrenomValid && isEmailValid) {
      // Naviguer vers la page de résultat avec les données
      navigation.navigate('Result', {
        nom,
        prenom,
      });
    } else {
      console.log('Le formulaire contient des erreurs');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#8A2BE2', '#FFD700']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.gradient}>
        <ScrollView>
          <View style={styles.formContainer}>
          <Text style={styles.title}>Formulaire d'inscription</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nom :</Text>
            <TextInput
              style={[styles.input, nomError ? styles.inputError : null]}
              value={nom}
              onChangeText={handleNomChange}
              placeholder="Entrez votre nom"
            />
            {nomError ? <Text style={styles.errorText}>{nomError}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Prénom :</Text>
            <TextInput
              style={[styles.input, prenomError ? styles.inputError : null]}
              value={prenom}
              onChangeText={handlePrenomChange}
              placeholder="Entrez votre prénom"
            />
            {prenomError ? <Text style={styles.errorText}>{prenomError}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email :</Text>
            <TextInput
              style={[styles.input, emailError ? styles.inputError : null]}
              value={email}
              onChangeText={handleEmailChange}
              placeholder="Entrez votre email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}>
            <Text style={styles.buttonText}>Valider</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputError: {
    borderColor: '#ff0000',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#2E3192',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Form"
          component={FormScreen}
          options={{title: 'Formulaire d\'inscription'}}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{title: 'Résultat'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
