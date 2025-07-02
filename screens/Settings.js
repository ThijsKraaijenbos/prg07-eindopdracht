import React, {useContext, useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {useState} from 'react';
import {Pressable, TextInput, Text, StyleSheet, View, Switch} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import {useCallback} from "react"
import InputField from "../components/InputField";
import {DarkModeContext} from "../context/DarkModeContext";

export default function Settings({ route }) {
    const [nameValue, setNameValue] = useState('');
    const {isDarkMode, toggleDarkMode} = useContext(DarkModeContext);

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

    const updateNameText = async (text) => {
        setNameValue(prevState => {
            // Save to AsyncStorage with the new value
            AsyncStorage.setItem('username', JSON.stringify(text));
            return text;
        });
        console.log("Name updated:", text);
    }

    return (
        <SafeAreaProvider style={{backgroundColor: isDarkMode ? "hsl(0, 0%, 15%)" : "hsl(0, 0%, 85%)", paddingLeft: 16, paddingTop:8, paddingRight: 16}}>
            <SafeAreaView style={{flexDirection: 'row'}}>
                <View style={styles.container}>
                    <InputField
                        placeholderText={"Naam"}
                        onChange={updateNameText}
                        value={nameValue}
                        />
                    <View style={styles.dmSwitchWrapper}>
                        <Text style={{color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'}}>Light Mode</Text>
                        <Switch
                            style={{marginHorizontal: 4}}
                            trackColor={{ false: 'hsl(0, 0%, 60%)', true: 'hsl(0, 0%, 40%)' }}
                            thumbColor={isDarkMode ? 'hsl(45, 100%, 80%)' : 'hsl(225, 30%, 40%)'}
                            onValueChange={toggleDarkMode}
                            value={isDarkMode}
                        />
                        <Text style={{color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'}}>Dark Mode</Text>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    textMedium: {
        fontFamily: 'Urbanist_500Medium',
        fontSize: 24
    },
    container: {
        display: "flex",
        alignItems: "flex-start",
        width: "100%",
        gap: 6
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
    },
    dmSwitchWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
})