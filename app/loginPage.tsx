import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

// Bibliotecas de terceiros
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { useRouter } from 'expo-router';

import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import '../firebase/index';
import { colors } from '@/assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

AsyncStorage

AsyncStorage


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const auth = getAuth();
  const userData = { email, password }

  const [inputError, setInputError] = useState({ email: false, password: false })
  const [errorMessage, setErrorMessage] = useState('');

  // Configurando a fonte com o useFonts
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  // Exibir indicador de carregamento até que a fonte seja carregada
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const handleEmailSignIn = () => {
    if (!email || !password) {
      setErrorMessage('Preencha todos os campos para efetuar o login')
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuário logado:', user.uid);
        loadData()
      })
      .catch((error) => {
        setErrorMessage('Email e/ou senha incorretos')
        setInputError(
          {
            email: true,
            password: true
          }
        )
      });
  };

  const loadData = async () => {
    try {
      const jsonValue = JSON.stringify(userData)
      await AsyncStorage.setItem('userData', jsonValue)
      console.log("FOI")
      console.log(jsonValue)

    } catch (error) {
      console.log(error)
    }
  }

  const telaCadastro = () => {
    router.push('/createAccount');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.containerLogo}>
          <Image source={require('../assets/images/dog.png')} style={styles.bannerImage} />
        </View>

        <View style={styles.containerLogin}>
          <Text style={[styles.text]}>Seja Bem-vindo(a)!</Text>

          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#AEB5BB"
            style={[styles.input, inputError.email && styles.inputError]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Senha"
            placeholderTextColor="#AEB5BB"
            style={[styles.input, inputError.password && styles.inputError]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
           {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <View style={styles.touchAble}>
            <TouchableOpacity onPress={handleEmailSignIn}>
              <Text style={[styles.textTouch]}>LOGIN</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={[styles.textSocial]}>OU</Text>
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity>
              <Ionicons name="logo-google" size={45} color="#45484A" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="logo-facebook" size={45} color="#45484A" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="logo-apple" size={45} color="#45484A" />
            </TouchableOpacity>
          </View>

          <View style={styles.criarContaText}>
            <Text style={{ color: '#45484A', fontFamily: 'Nunito_400Regular' }}>
              Não tem conta?{' '}
              <Text
                style={{
                  color: '#50b9e0',
                  textDecorationLine: 'underline',
                  fontFamily: 'Nunito_700Bold',
                }}
                onPress={() => telaCadastro()}
              >
                Crie uma
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 0,
  },
  containerLogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLogin: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#45484A',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 15,
  },
  errorText : {
    color : 'red'
  },
  input: {
    width: '90%',
    height: 50,
    color: colors.primary,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  inputError : {
    borderColor : 'red',
  },
  touchAble: {
    marginTop: 10,
    backgroundColor: colors.bluePrincipal,
    borderRadius: 25,
    overflow: 'hidden',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTouch: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.white,
    fontFamily: 'Nunito_700Bold',
  },
  textSocial: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 20,
    fontFamily: 'Nunito_700Bold',
  },
  socialContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
  },
  criarContaText: {
    marginTop: 20,
  },
  bannerImage: {
    height: 350,
    width: 350,
  },
});
