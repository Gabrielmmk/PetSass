import React from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { router } from 'expo-router';

export default function SettingsScreen() {

  const logOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log('Usuário deslogado');
      router.push('/'); // Redireciona para a página inicial
    } catch (error) {
      console.error('Erro ao deslogar:', error);
      Alert.alert('Erro', 'Não foi possível deslogar. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Logado</Text>
      <Button title="Sair" onPress={logOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
