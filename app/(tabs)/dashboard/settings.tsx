import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, Dimensions, TouchableOpacity, Image } from 'react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { colors } from '@/assets/colors';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from '@/firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';



export default function SettingsScreen() {

  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        //console.log(uid)
        //getUserPets(uid)
        getUserData2(uid)

      }
    });
  })



  const getUserData2 = async (uid: string) => {
    const docRef = doc(db, "users", uid, "Pets", "Duby");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const remedios: { name: string; date: any }[] = docSnap.data().Remedios || [];
      // Converte os timestamps para um formato legível
      const remediosFormatados = remedios.map((remedio: { name: string; date: any }) => ({
        name: remedio.name,
        date: remedio.date.toDate().toLocaleString() // Converte Timestamp para string legível
      }));

      //console.log("Remédios:", remediosFormatados);
      //console.log(remedios.map(remedios => remedios.name))
      //console.log(remedios.map(remedios => remedios.date.toDate().toLocaleString()))
    } else {
      console.log("No such document!");
    }


  };

  const getUserPets = async (uid: string) => {
    const petsCollectionRef = collection(db, "users", uid, "Pets");
    const petsSnapshot = await getDocs(petsCollectionRef);

    if (!petsSnapshot.empty) {
      const petsData = petsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Pets Data:", petsData);

    } else {
      console.log("Você ainda não cadastrou nenhum pet!");
    }
  };

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.containerName}>
        <Text style={styles.textHeader}>Seus Pets</Text>
      </View>
      <View style={styles.containerSection}>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={55} color={colors.secondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.Petsbutton}>
          <View style={styles.nameCard}>
            <Image source={require('../../../assets/images/turtle.jpg')} style={styles.imageHeader} />
          </View>
          <View style={styles.infoCard}>
            <Text>A</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Petsbutton}>
          <View style={styles.nameCard}>
            <Image source={require('../../../assets/images/turtle.jpg')} style={styles.imageHeader} />
          </View>
          <View style={styles.infoCard}>
            <Text>A</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Petsbutton}>
          <View style={styles.nameCard}>
            <Image source={require('../../../assets/images/turtle.jpg')} style={styles.imageHeader} />
          </View>
          <View style={styles.infoCard}>
            <Text>A</Text>
          </View>
        </TouchableOpacity>


      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  containerSection: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    padding: 10
  },

  addButton: {
    borderWidth: 1,
    borderColor: colors.gray,
    height: 170,
    width: '35%',
    marginTop: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Petsbutton: {
    borderWidth: 1,
    borderColor: colors.gray,
    height: 170,
    width: '35%',
    marginTop: 30,
    borderRadius: 15,
  },
  nameCard: {
    flex: 2,

  },
  infoCard: {
    flex: 2,
    borderRadius : 50
  },
  imageHeader: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius : 15,
    borderTopRightRadius : 15
  },
  textCardName: {
    fontSize: 18,
    textAlign: 'left',
    color: colors.primary,
    fontFamily: "Nunito_700Bold",
    borderBottomColor : colors.secondary,
    borderBottomWidth : 1
  },
  textCardInfo: {
    color: colors.primary,
    fontFamily: "Nunito_700Bold",
    fontSize : 12
  }
});
