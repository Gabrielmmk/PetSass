import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { colors } from '@/assets/colors';
import { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default function InfoAccount() {
    const [uidUser, setUidUser] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [isEditable, setIsEditable] = useState(false)

    const db = getFirestore();
    const auth = getAuth();



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUidUser(uid);
                getUserData(user.uid)

            }
        });

        // Limpa o listener ao desmontar o componente
        return () => unsubscribe();
    }, []);




    const getUserData = async(uid : string) => {
        if(!uid){
          console.log("NUMERO NÂO EXISTE")
        }
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.name.name)
          setEmail(userData.email.email)
          setAge(userData.age.age)
          console.log(name)
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      }




    const teste = () => {
        setIsEditable((prevState) => !prevState); // Alterna entre true e false
        console.log('O botão agora é: ', isEditable)
        console.log(name)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={colors.primary} />
                    <Text style={styles.backText}></Text>
                </TouchableOpacity>
                <TextInput
                    value={name} // Exibe o nome diretamente
                    style={styles.input}
                    editable={false}
                />
                <TextInput
                    value={email} // Exibe o nome diretamente
                    style={styles.input}
                    editable={false}
                />
                <TextInput
                    value={age} // Exibe o nome diretamente
                    style={styles.input}
                    editable={false}
                />

                <View style={styles.inpuTest}>
                    <TextInput
                        value={email} // Exibe o nome diretamente
                        style={styles.textInput}
                        editable={isEditable}
                        onChangeText={setEmail}
                    />
                    <TouchableOpacity onPress={teste}>
                        <Ionicons name="pencil" size={20} color={colors.primary} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
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
        marginTop: 15,
    },
    backText: {
        marginLeft: 5,
        color: '#45484A',
        fontSize: 16,
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
        color: colors.primary
    },

    inpuTest: {
        width: '100%',
        height: 50,
        borderColor: colors.secondary,
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textInput: {
        color: colors.primary
    }
});
