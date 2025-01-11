import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';

// Bibliotecas de terceiros
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

// Configuração do Google Sign-In
GoogleSignin.configure({
  webClientId: 'your-web-client-id.apps.googleusercontent.com',
});

// Configura o Google Sign-In com o webClientId correto
GoogleSignin.configure({
  webClientId: '788684104556-od7eh1erk7n1usb8gfm5r432dpakj6m9.apps.googleusercontent.com',
});

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log('Usuário logado com e-mail e senha:', userCredential);
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          console.error('Endereço de e-mail inválido!');
        } else if (error.code === 'auth/user-not-found') {
          console.error('Usuário não encontrado!');
        } else if (error.code === 'auth/wrong-password') {
          console.error('Senha incorreta!');
        } else {
          console.error('Erro ao fazer login:', error);
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image source={require("../assets/images/dog.png")} style={styles.bannerImage} />

      </View>

      <View style={styles.containerLogin}>
        <Text style={[styles.text]}>Tela de Login</Text>

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
          <TouchableOpacity >
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
            <Text style={{ color: '#50b9e0', textDecorationLine: 'underline', fontFamily: 'Nunito_700Bold' }} onPress={() => console.log('Criar conta')}>
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
    alignItems : 'center',
    justifyContent : 'center'
  },
  text: {
    color: '#45484A',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold'
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
