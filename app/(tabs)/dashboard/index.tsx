import { View, Text, StyleSheet, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Home() {
    const sair = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    return (
        <View style={styles.container}>
            <Text>Home Page</Text>
            <Button title='Sair' onPress={sair} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "lightblue",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    }
})