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
        <SafeAreaProvider style={{backgroundColor: isDarkMode ? "hsl(0, 0%, 15%)" : "#D9D9D9"}}>
            <SafeAreaView style={{flexDirection: 'row'}}>
                <View style={styles.container}>
                    <InputField
                        placeholderText={"Naam"}
                        onChange={updateNameText}/>
                    <View style={styles.dmSwitchWrapper}>
                        <Text style={{color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'}}>Toggle Dark Mode</Text>
                        <Switch
                            style={styles.switch}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleDarkMode}
                            value={isDarkMode}
                        />
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