import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { colors } from '@/assets/colors';


export default function createAccount() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const router = useRouter(); // Instância do router
  const db = getFirestore();



  const handleRegister = () => {
    // Adicione a lógica de cadastro aqui
    const auth = getAuth();
    if (!email || !password || !name) {
      console.log('Os campos estão vazios');
      return;
    }

    if (password !== confirmPassword) {
      console.log('as senhas não são iguais')
      return
    }


    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user)
        otherInformations(user.uid)
      })
      .catch((error) => {
        console.log("Error code: ", error.code);
        console.log("Error message: ", error.message);
        // ..
      });
  };


  //Envia as informações para o firebase
  const otherInformations = async (uid: string) => {
    if (!uid) {
      console.log("UID Vazio")
      return
    }
    try {
      await setDoc(doc(db, "users", uid), {
        name: { name },
        email: { email },
        age : {age}
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }



  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={colors.primary} />
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
        inputMode='email'
      />
      <TextInput
        placeholder="Idade"
        style={styles.input}
        inputMode='numeric'
        onChangeText={setAge}
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
    marginTop: 15
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
    color: colors.primary,
    fontFamily: 'Nunito_700Bold',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    color : colors.primary,
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
