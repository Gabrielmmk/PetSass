import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from '@/firebase';

export default function Home() {
  const [uid, setUid] = useState(String);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid)
    } else {
      //console.log("não há usuario")
    }
  })

  const adicionarDados = () => {
    
  };

  // Função para adicionar dados ao Firestore
  const teste = async () => {
    if (!uid){
      console.log("UID Vazio")
      return
    }
    try {
      await setDoc(doc(db, "users", uid), {
        first: "Ada",
        last: "Lovelace",
        born: 1825
      });

      console.log("FOi");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <Button title="Adicionar" onPress={adicionarDados} />
      <Button title="Teste" onPress={teste} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
