import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function createAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [name, setName] = useState('')
  const router = useRouter(); // Instância do router

  const handleRegister = () => {
    // Adicione a lógica de cadastro aqui
    const auth = getAuth();
    if (!email || !password || !name) {
      console.log('Os campos estão vazios');
      return;
    }

    if (password !== confirmPassword){
      console.log('as senhas não são iguais')
      return
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };



  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#45484A" />
        <Text style={styles.backText}></Text>
      </TouchableOpacity>

      <Text style={styles.title}>Crie sua conta</Text>
      <TextInput
        placeholder="Nome Completo"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="E-mail"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirmar senha"
        style={styles.input}
        value={confirmPassword}
        onChangeText={setconfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    marginLeft: 5,
    color: '#45484A',
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#45484A',
    fontFamily: 'Nunito_700Bold',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#AEB5BB',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#50b9e0',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
  },
});
