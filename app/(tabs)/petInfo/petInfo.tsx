import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from "expo-router";
import { colors } from '@/assets/colors';

export default function petInfo() {


  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={colors.primary} />
        <Text style={styles.backText}></Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.newPetText}>Duby</Text>
      </View>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15
  },
  backText: {
    marginLeft: 5,
    color: colors.gray,
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
  },

  newPetText : {
    fontSize : 25,
    fontFamily : 'Nunito_700Bold'
  },

  form: {
    flex : 1,
    padding: 10
  },

  input : {
    width : '100%',
    borderWidth : 1,
    borderColor : colors.gray,
    height : 50,
    padding : 10,
    borderRadius : 12
  },

})