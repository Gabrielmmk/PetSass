import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import Home from './(tabs)/dashboard';
import LoginPage from './loginPage';
import Profile from './(tabs)/dashboard/profile';

export default function Index() {
  const [user, setUser] = useState<User | null>(null);  // Tipando o estado corretamente
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Atualiza o estado com o usuário logado
        //router.replace('/(tabs)/dashboard/');
        router.replace('/(tabs)/petInfo/petInfo');//Mudar depois

      } else {
        setUser(null); // Desloga e limpa o estado
      }
    });

    // Limpa o listener ao desmontar o componente
    return () => unsubscribe();
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      {user ? <Profile /> : <LoginPage />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
});
