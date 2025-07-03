import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Text, StyleSheet, TextInput, View, ScrollView} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "@react-navigation/native";
import {Image} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import Svg, {Path} from "react-native-svg";
import DividerComponent from "../components/DividerComponent";
import ListContainer from "../components/ListContainer";
import InputField from "../components/InputField";
import {DarkModeContext} from "../context/DarkModeContext";
import ListItem from "../components/ListItem";

export default function Home() {

    const [timeValue, setTimeValue] = useState("")
    const [nameValue, setNameValue] = useState("")
    const [recommended, setRecommended] = useState([])
    const {isDarkMode} = useContext(DarkModeContext);

    async function getRecommendedLocations() {
        const response = await fetch('http://145.24.223.116/api/restaurants?recommended=true', {
            method: 'GET',
            headers: {
                'Accept' : "application/json"
            }
        })

        const data = await response.json()
        const locations = data.map(item => ({
            id: item.id,
            name: item.name,
            star_count: item.star_count,
            address: item.address,
            tags: item.tags,
            img_url: item.img_url
        }));
        setRecommended(locations);
    }

    useEffect(() => {
        getRecommendedLocations()
    }, []);

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
        <SafeAreaProvider style={{flexDirection: 'row', backgroundColor: isDarkMode ? "hsl(0, 0%, 15%)" : "hsl(0, 0%, 85%)", paddingLeft: 16, paddingTop:8, paddingRight: 16}}>
            <LinearGradient
                colors={isDarkMode ? ['hsl(0 0% 25%)', 'transparent'] : ['hsl(0 0% 100%)', 'transparent']}
                style={[StyleSheet.absoluteFill, {height: 136}]}
            />
            <SafeAreaView>
                <Text style={[styles.textMedium, {color: isDarkMode ? 'hsl(45 15% 80%)' : 'hsl(45 5% 25%)'}, {marginLeft: 8}]}>{timeValue}, {nameValue}</Text>

                <InputField placeholderText={"Zoek een locatie..."}>
                    <Svg width={36} height={36} viewBox="0 0 24 24">
                        <Path
                            d="M21.07,16.83,19,14.71a3.08,3.08,0,0,0-3.4-.57l-.9-.9a7,7,0,1,0-1.41,1.41l.89.89A3,3,0,0,0,14.71,19l2.12,2.12a3,3,0,0,0,4.24,0A3,3,0,0,0,21.07,16.83Zm-8.48-4.24a5,5,0,1,1,0-7.08A5,5,0,0,1,12.59,12.59Zm7.07,7.07a1,1,0,0,1-1.42,0l-2.12-2.12a1,1,0,0,1,0-1.42,1,1,0,0,1,1.42,0l2.12,2.12A1,1,0,0,1,19.66,19.66Z"
                            fill={isDarkMode ? "hsl(0, 0%, 65%)" : "hsl(0, 0%, 50%)"}
                        />
                    </Svg>
                </InputField>
                    <ScrollView style={styles.scrollView}>
                    <View style={styles.mainContentContainer}>
                        <DividerComponent />
                        <Text style={[styles.textSemiBold, {color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'}]}>Opgeslagen Locaties</Text>
                        <ListContainer></ListContainer>

                        <DividerComponent />
                        <Text style={[styles.textSemiBold, {color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'}]}>Aanbevolen Locaties</Text>
                        <ListContainer>
                            {recommended.map((item, index) => (
                                <ListItem key={index} data={item}/>
                            ))}
                        </ListContainer>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    textMedium: {
        fontFamily: 'Urbanist_500Medium',
        fontSize: 24
    },
    textSemiBold: {
        fontFamily: 'Urbanist_600SemiBold',
        fontSize: 24
    },

    mainContentContainer: {
        minWidth: "100%",
        display: "flex",
        flex: 1,
        alignItems: "center",
        marginBottom: 100
    },
});