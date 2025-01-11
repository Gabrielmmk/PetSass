import { View, StyleSheet, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Home from './(tabs)/dashboard';
import LoginPage from './loginPage';

import { useRouter } from 'expo-router';

export default function Index() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const router = useRouter();

  useEffect(() => {
    auth().onAuthStateChanged(_user => {
      setUser(_user);
      if (_user) {
        router.replace('/(tabs)/dashboard'); // Vai para o layout das tabs
      } else {
        router.replace('/loginPage'); // Vai para o login
      }
    });
    
  }, []);
  

  return (
    <SafeAreaView style={styles.container}>
      {user ? <Home /> : <LoginPage />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
});
