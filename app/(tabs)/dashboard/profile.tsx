import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function profile() {
    return (
        <SafeAreaView style={styles.container}>
            {/*Header*/}
            <View style={styles.containerHeader}>
                <Text>FOi</Text>
            </View>
            
            {/*Content*/}
            <View style={styles.containerContent}>
                <Text>FOi2</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#50b9e0',
    },
    containerHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerContent: {
        flex: 2,
        borderTopLeftRadius : 14,
        borderTopRightRadius : 14,
        padding : 20,
        backgroundColor: 'white',
    }
})