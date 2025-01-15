import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';

// Bibliotecas de terceiros
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { useRouter } from 'expo-router';

import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import '../firebase/index'

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const auth = getAuth();


  // Configurando a fonte com o useFonts
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold
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
      console.log("Os campos estão vazios");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      //console.log("usuariologado", user.uid)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  };

  const telaCadastro = () => {
    router.push('/createAccount')
  }


  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image source={require("../assets/images/dog.png")} style={styles.bannerImage} />

      </View>

      <View style={styles.containerLogin}>
        <Text style={[styles.text]}>Seja Bem-vindo(a)!</Text>

        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#AEB5BB"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#AEB5BB"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

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
          <TouchableOpacity >
            <Ionicons name="logo-facebook" size={45} color="#45484A" />
          </TouchableOpacity>
          <TouchableOpacity >
            <Ionicons name="logo-apple" size={45} color="#45484A" />
          </TouchableOpacity>
        </View>

        <View style={styles.criarContaText}>
          <Text style={{ color: '#45484A', fontFamily: 'Nunito_400Regular', }}>
            Não tem conta?{' '}
            <Text style={{ color: '#50b9e0', textDecorationLine: 'underline', fontFamily: 'Nunito_700Bold' }} onPress={() => telaCadastro()}>
              Crie uma
            </Text>
          </Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  containerLogo: {
    flex: 1,
  },

  containerLogin: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#45484A',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 15
  },
  input: {
    width: '100%',
    height: 50,
    color: '#45484A',
    paddingHorizontal: 10,
    borderRadius: 25,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#AEB5BB'
  },
  touchAble: {
    marginTop: 10,
    backgroundColor: '#50b9e0',
    borderRadius: 25,
    overflow: 'hidden',
    width: 300,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTouch: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Nunito_700Bold',
  },
  textSocial: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#45484A',
    marginTop: 20,
    fontFamily: 'Nunito_700Bold',
  },
  socialContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: "100%",
  },
  criarContaText: {
    marginTop: 20,
  },
  bannerImage: {
    height: 350,
    width: 350,
    //borderColor: 'red',
    // borderWidth: 2,
  }

});
