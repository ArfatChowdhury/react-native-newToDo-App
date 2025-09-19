import { FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Data = [
    {
        id: 1,
        task: 'Complete React Native tutorial',
        isDone: false
    },
    {
        id: 2,
        task: 'Buy groceries for the week',
        isDone: true
    },
    {
        id: 3,
        task: 'Call mom for her birthday',
        isDone: false
    },
    {
        id: 4,
        task: 'Finish work presentation',
        isDone: false
    },
    {
        id: 5,
        task: 'Go to the gym',
        isDone: true
    }
];

const HomeScreen = () => {
    const [initial, setInitial] = useState('')
    const [newData, setNewData] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const getTodos = async () => {
            try {
                const todos = await AsyncStorage.getItem('my-todo');
                console.log('Loaded from storage:', todos);
                if (todos !== null) {
                    setNewData(JSON.parse(todos));
                } else {
                    setNewData(Data);
                    await AsyncStorage.setItem('my-todo', JSON.stringify(Data));
                }
            } catch (error) {
                console.log('Error loading todos:', error);
            }
        }
        getTodos();
    }, []);


    const filteredData = newData.filter(todo => todo.task.toLowerCase().includes(searchQuery.toLocaleLowerCase()))

    const handleAdd = async () => {
        if (initial === '') return
        try {
            const newTask = {
                id: Date.now(),
                task: initial,
                isDone: false
            }
            const updatedData = [...newData, newTask]
            setNewData(updatedData)
            setInitial('')
            await AsyncStorage.setItem('my-todo', JSON.stringify(updatedData))
            Keyboard.dismiss()
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = async (id) => {
        try {
            const newTodo = newData.filter((item) => item.id !== id)
            await AsyncStorage.setItem('my-todo', JSON.stringify(newTodo))
            setNewData(newTodo)
        } catch (error) {
            console.log(error);

        }
    }

    const handleDone = async (id) => {
        try {
            const newTodos = newData.map((item) => {
                if (item.id === id) {
                    item.isDone = !item.isDone
                }
                return item
            })
            await AsyncStorage.setItem('my-todo', JSON.stringify(newTodos))
            setNewData(newTodos)
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <View style={styles.Container}>
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
                <Ionicons name="search" size={30} color="gray" style={styles.searchIcon} />
                <TextInput
                    placeholder='Search your task'
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={styles.input}
                />
            </View>
            <FlatList
                data={searchQuery ? filteredData : [...newData].reverse()}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) =>
                    <View style={styles.taskCon}>
                        <View style={styles.taskContainer}>
                            <Checkbox value={item.isDone} color={'purple'} onValueChange={() => handleDone(item.id)} />
                            <Text style={[styles.TaskText, item.isDone && styles.completedTask]}>{item.task}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleDelete(item.id)}>
                            <Ionicons name="trash" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                }
            />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.addContainer}>
                    <TextInput
                        placeholder='Enter new task'
                        style={[styles.input, styles.newInput]}
                        value={initial}
                        onChangeText={setInitial}

                    />
                    <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
                        <Ionicons name="add" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    Container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchBar: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 4,
        alignItems: 'center',
        backgroundColor: 'white'

    },
    input: {
        flex: 1,
        paddingHorizontal: 1,
        fontSize: 16,
        backgroundColor: 'white',


    },
    searchIcon: {
        paddingHorizontal: 10
    },
    TaskText: {
        fontSize: 16
    },
    taskContainer: {
        flexDirection: 'row',
        gap: 10,
        padding: 5,
        alignItems: 'center',
        flex: 1
    },
    taskCon: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffff',
        marginVertical: 10,
    },
    addContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        gap: 10

    },
    addButton: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: 'purple',
        borderRadius: 15
    },
    newInput: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 5
    },
    completedTask: {
        textDecorationLine: 'line-through'
    },
})