import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Image } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from '@/firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/assets/colors';
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

type Pet = {
  id: string;
  name: string;
  age: number;
  race: string;
  sex: string;
};

export default function Home() {
  const [uid, setUid] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [pet, setPet] = useState<Pet[]>([]); // Definindo o tipo explicitamente
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        getUserData(user.uid);
        getUserPets(user.uid);
      } else {
        setLoading(false);
      }
    });
  }, [auth]);

  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  // Retorna os dados do Usuário
  const getUserData = async (uid: string) => {
    if (!uid) {
      console.log("Usuário não encontrado");
      return;
    }

    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      setName(userData.name.name);
      setLoading(false);
    } else {
      console.log("No such document!");
    }
  };

  // Retorna os dados dos PETS
  const getUserPets = async (uid: string) => {
    const petsCollectionRef = collection(db, "users", uid, "Pets");
    const petsSnapshot = await getDocs(petsCollectionRef);

    if (!petsSnapshot.empty) {
      const petsData = petsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Pet[]; // Forçando o tipo para Pet[]
      setPet(petsData); // Atualiza o estado com os dados dos pets
    } else {
      console.log("Você ainda não cadastrou nenhum pet!");
    }
  };

  // Se estiver carregando, exibe a animação
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerName}>
        <Text style={styles.textHeader}> Olá, {`${name.split(" ")[0]} ${name.split(" ")[1]}`}!</Text>
      </View>

      <View style={styles.containerSection1}>
        <TouchableOpacity style={styles.buttonItens}>
          <MaterialCommunityIcons name="needle" size={17} color={colors.primary} />
          <Text style={styles.textoSection}>Vacinas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonItens}>
          <MaterialCommunityIcons name="pill" size={17} color={colors.primary} />
          <Text style={styles.textoSection}>Remédios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonItens}>
          <MaterialCommunityIcons name="stethoscope" size={17} color={colors.primary} />
          <Text style={styles.textoSection}>Consultas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonItens}>
          <MaterialCommunityIcons name="food-apple-outline" size={17} color={colors.primary} />
          <Text style={styles.textoSection}>Alimentação</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonItens}>
          <Ionicons name="calendar-outline" size={17} color={colors.primary} />
          <Text style={styles.textoSection}>Lembretes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerSection2}>
        <View style={styles.textHeaderSection2}>
          <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 20, color: colors.primary }}>Seus Pets</Text>
        </View>
        <View style={styles.containerPets}>
          <ScrollView style={{ flex: 1 }}>
            {/* Exibindo os pets reais */}
            {pet.length > 0 ? (
              pet.map((item) => (
                <TouchableOpacity key={item.id} style={styles.petBox}>
                  <View style={styles.petImage}>
                    <Image
                      source={require('../../../assets/images/bird.jpg')} // Imagem de exemplo
                      style={styles.imageHeader}
                    />
                  </View>
                  <View style={styles.petName}>
                    <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 16 }}>{item.name}</Text>
                    <Text style={{ fontFamily: 'Nunito_400Regular', fontSize: 14 }}>Idade: {item.age}</Text>
                    <Text style={{ fontFamily: 'Nunito_400Regular', fontSize: 14 }}>Raça: {item.race}</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ textAlign: 'center', marginTop: 10 }}>Você ainda não cadastrou nenhum pet.</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bluePrincipal,
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bluePrincipal,
  },

  containerName: {
    borderWidth: 1,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderColor: colors.white,
    backgroundColor: colors.white,
    justifyContent: 'center',
    height: 50,
    width: '70%',
    marginBottom: 15,
  },

  textHeader: {
    marginLeft: 10,
    fontFamily: 'Nunito_700Bold',
    fontSize: 20,
    color: colors.primary
  },

  containerSection1: {
    flex: 1,
    backgroundColor: colors.white,
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 25,
    marginBottom: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'center',
  },

  textoSection: {
    fontFamily: 'Nunito_400Regular',
    marginLeft: 7,
    color: colors.primary,
    fontSize: 14
  },

  buttonItens: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 25,
    height: 45,
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5,
    paddingLeft: 15,
    marginVertical: 7.5,
  },

  containerSection2: {
    flex: 2,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: colors.white
  },

  containerPets: {
    height: '100%',
    paddingBottom: 65,
  },

  petBox: {
    height: 80,
    flexDirection: 'row',
    marginBottom: 10,
    marginHorizontal: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.gray
  },

  petImage: {
    width: '25%',
  },

  imageHeader: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },

  petName: {
    width: '75%',
    alignItems: 'flex-start',
    padding: 10
  },

  textHeaderSection2: {
    padding: 20,
    fontFamily: 'Nunito_700Bold',
  },

  petsSection2: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: 'red',
    flex: 1
  }
});
