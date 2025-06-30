import React, {useCallback, useEffect, useState} from 'react';
import {Text, StyleSheet, TextInput, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "@react-navigation/native";
import {Image} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import Svg, {Path} from "react-native-svg";
import DividerComponent from "../components/DividerComponent";
import ListContainer from "../components/ListContainer";
import InputField from "../components/InputField";

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
                    } else {
                        setNameValue("gebruiker")
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
    //make sure to add multi language support here if theres time
    function getTime() {
        let hours = new Date().getHours();
        if (hours < 6) {
            setTimeValue("Goedenacht")
        } else if (hours < 12) {
            setTimeValue("Goedemorgen")
        } else if (hours < 18) {
            setTimeValue("Goedemiddag")
        } else if (hours < 24) {
            setTimeValue("Goedenavond")
        }
    }

    return (
        <SafeAreaProvider style={{height: 100, flexDirection: 'row', backgroundColor: "#252525", paddingLeft: 16, paddingTop:8, paddingRight: 16}}>
            <LinearGradient
                colors={['hsla(0 0% 25% / 100)', 'hsla(0 0% 0% / 0)']}
                style={[StyleSheet.absoluteFill, {height: 136}]}
            />
            <SafeAreaView>
                <Text style={[styles.textMedium, styles.textMuted, {marginLeft: 8}]}>{timeValue}, {nameValue}</Text>

                <InputField placeholderText={"Zoek een locatie..."}>
                    <Svg width={36} height={36} viewBox="0 0 24 24">
                        <Path
                            d="M21.07,16.83,19,14.71a3.08,3.08,0,0,0-3.4-.57l-.9-.9a7,7,0,1,0-1.41,1.41l.89.89A3,3,0,0,0,14.71,19l2.12,2.12a3,3,0,0,0,4.24,0A3,3,0,0,0,21.07,16.83Zm-8.48-4.24a5,5,0,1,1,0-7.08A5,5,0,0,1,12.59,12.59Zm7.07,7.07a1,1,0,0,1-1.42,0l-2.12-2.12a1,1,0,0,1,0-1.42,1,1,0,0,1,1.42,0l2.12,2.12A1,1,0,0,1,19.66,19.66Z"
                            fill={"#A6A6A6"}
                        />
                    </Svg>
                </InputField>
                <View style={styles.mainContentContainer}>
                    <DividerComponent />
                    <Text style={[styles.text, styles.textSemiBold]}>Opgeslagen Locaties</Text>
                    <ListContainer></ListContainer>

                    <DividerComponent />
                    <Text style={[styles.text, styles.textSemiBold]}>Aanbevolen Locaties</Text>
                    <ListContainer></ListContainer>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    text: {
        color: 'hsl(45 100% 95%)',
    },
    textMuted: {
        color: 'hsl(45 15% 80%)',
    },
    textMedium: {
        fontFamily: 'Urbanist_500Medium',
        fontSize: 24
    },
    textSemiBold: {
        fontFamily: 'Urbanist_600SemiBold',
        fontSize: 24
    },
    textLarge: {
        fontFamily: 'Urbanist_700Bold',
        fontSize: 32
    },

    mainContentContainer: {
        minWidth: "100%",
        display: "flex",
        flex: 1,
        alignItems: "center",
    },
});