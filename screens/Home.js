import React, {useCallback, useEffect, useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import H1 from "../components/Header1";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "@react-navigation/native";
import {Image} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";

export default function Home({ route }) {

    const [timeValue, setTimeValue] = useState("")
    const [nameValue, setNameValue] = useState("")

    useFocusEffect(
        useCallback(() => {
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
            getTime()
        }, [])
    )

    //return appropriate message depending on time of day
    function getTime() {
        let hours = new Date().getHours();
        if (hours < 6) {
            setTimeValue("nacht")
        } else if (hours < 12) {
            setTimeValue("morgen")
        } else if (hours < 18) {
            setTimeValue("middag")
        } else if (hours < 24) {
            setTimeValue("navond")
        }
    }


    return (
        <SafeAreaProvider style={{height: 100, flexDirection: 'row', backgroundColor: "#252525", padding: 8}}>
            <SafeAreaView>
                <H1>Goede{timeValue}, {nameValue}</H1>
                <LinearGradient
                    // Button Linear Gradient
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={styles.button}>
                </LinearGradient>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#fff',
    },
    text_muted: {
        color: '#fff',
    },
    text_medium: {
        fontSize: 24
    },
    text_large: {
        fontSize: 32
    },
});