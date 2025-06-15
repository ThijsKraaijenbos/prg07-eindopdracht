import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {useEffect, useState} from 'react';
import {Pressable, TextInput, Text, StyleSheet} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import {useCallback} from "react"

export default function Settings({ route }) {
    const [nameValue, setNameValue] = useState('');

    useFocusEffect(
        useCallback( () => {
            //nested with an async like this because react native gives a warning
            //when I do useCallback( async()
            async function fetchData() {
                try {
                    const name = await AsyncStorage.getItem('username');
                    if (name !== null) {
                        setNameValue(JSON.parse(name))
                    }
                } catch (e) {
                    console.log(e)
                }
            }

            fetchData()
        }, [])
    )

    const onSave = async () => {
        try {
            const jsonValue = JSON.stringify(nameValue);
            const result = await AsyncStorage.setItem('username', jsonValue);
            if (result !== null) {
                console.log(`Result = ${result} & jsonValue = ${jsonValue}` )
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{height: 100, flexDirection: 'row'}}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => setNameValue(text)}
                    placeholder="name"
                    value={nameValue}
                />
                <Pressable title={"Opslaan"} onPress={onSave}>
                    <Text style={styles.button}>Opslaan</Text>
                </Pressable>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
    },
    button: {
        marginTop: 10,
        backgroundColor: "#87ceeb",
        padding: 10,
        borderRadius: 5,
        fontWeight: "bold"
    },
    textInput: {
        backgroundColor: "#ebebeb",
        borderRadius: 10,
        width: "50%"
    }
})