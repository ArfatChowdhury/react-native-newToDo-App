import { Image, StyleSheet, Text, TextInput, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
    return (
        <View>
            <View style={styles.header}>
                <Ionicons name="menu" size={30} color="black" />
                <Image
                    source={{
                        uri: 'https://plus.unsplash.com/premium_photo-1757517371699-3a2ce58688db?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    }}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                />
            </View>
            <View style={styles.searchBar}>
                <TextInput
                placeholder='Search your task'
                style={styles.input}
                />

            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    searchBar:{
        borderWidth: 1,
        borderRadius: 10 
    },
    input:{
        paddingHorizontal:40
    }
})