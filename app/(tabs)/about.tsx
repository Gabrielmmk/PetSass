import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import "expo-dev-client";

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { Link } from 'expo-router';



// Configura o Google Sign-In com o webClientId correto
GoogleSignin.configure({
  webClientId: '788684104556-od7eh1erk7n1usb8gfm5r432dpakj6m9.apps.googleusercontent.com',
});



export default function AboutScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSignIn = () => {
    if (!email || !password){
      console.log("Os campos estão vazios")
      return
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        //console.log('Usuário logado com e-mail e senha:', userCredential);
        //console.log('UserID', userCredential.user.uid);
        console.log('isso');
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
      <Text style={styles.text}>Tela sobre!</Text>

      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#888"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#888"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Button title="Login com E-mail e Senha" onPress={handleEmailSignIn} />
        <Button title="Não tem conta? Crie uma"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    color: '#fff',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    overflow: 'hidden', // para que o botão herde o formato arredondado
  }
});
