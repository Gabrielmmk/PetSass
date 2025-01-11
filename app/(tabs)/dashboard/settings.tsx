import { Text, View, StyleSheet, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function SettingsScreen() {

  const sair = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Logado</Text>
      <Button title='Sair' onPress={sair} />
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
})