import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, Image, TouchableOpacity, Alert } from 'react-native';
import { colors } from '@/assets/colors';
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, signOut } from 'firebase/auth';
import { router } from 'expo-router';

export default function profile() {
    // Configurando a fonte com o useFonts
    const [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_700Bold,
    });

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

    // Exibir indicador de carregamento até que a fonte seja carregada
    if (!fontsLoaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            {/*Header*/}
            <View style={styles.containerHeader}>
                <Image source={require('../../../assets/images/turtle.jpg')} style={styles.imageHeader}/>
                <Text style={styles.textHeader}>Gabriel Medeiros</Text>
            </View>

            {/*Content*/}
            <View style={styles.containerContent}>
                <TouchableOpacity style= {styles.buttonContent}>
                    <Ionicons name="person-outline" size={20} color={colors.primary} />
                    <Text style={styles.textContent}>Informações da conta</Text>
                </TouchableOpacity>
                <TouchableOpacity style= {styles.buttonContent}>
                    <Ionicons name="settings-outline" size={20} color={colors.primary} />
                    <Text style={styles.textContent}>Configurações da conta</Text>
                </TouchableOpacity>
                <TouchableOpacity style= {styles.buttonContent}>
                    <Ionicons name="calendar-outline" size={20} color={colors.primary} />
                    <Text style={styles.textContent}>Lembretes</Text>
                </TouchableOpacity>
                <TouchableOpacity style= {styles.buttonContent} onPress={logOut}>
                    <Ionicons name="log-out-outline" size={20} color={colors.primary} />
                    <Text style={styles.textContent}>Sair</Text>
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
    containerHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageHeader : {
        width : 80,
        height : 80,
        borderRadius : 50,
        borderWidth: 1,
    },
    textHeader : {
        fontFamily : 'Nunito_700Bold',
        fontSize : 20,
        marginTop : 15,
        color : colors.white
    },
    containerContent: {
        flex: 2,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        padding: 20,
        backgroundColor: colors.white,
    },
    buttonContent : {
        borderBottomWidth : 1,
        borderColor : colors.bluePrincipal,
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        height : 60
    },
    textContent : {
        marginLeft : 10,
        fontFamily : 'Nunito_400Regular',
        
    }
})