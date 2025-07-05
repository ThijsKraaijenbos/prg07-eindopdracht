import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";
import DividerComponent from "../components/DividerComponent";
import ListContainer from "../components/ListContainer";
import InputField from "../components/InputField";
import {DarkModeContext} from "../context/DarkModeContext";
import SearchIcon from "../components/icons/SearchIcon";

export default function Home() {

    const [timeValue, setTimeValue] = useState("")
    const [nameValue, setNameValue] = useState("")
    const [recommended, setRecommended] = useState([])
    const [favorites, setFavorites] = useState([])
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
                    // await AsyncStorage.removeItem("favorites")
                    const name = await AsyncStorage.getItem('username');
                    const favorites = await AsyncStorage.getItem('favorites');
                    const parsedName = JSON.parse(name)
                    const parsedFavorites = JSON.parse(favorites)
                    setNameValue(parsedName ? parsedName : "Gebruiker")
                    setFavorites(parsedFavorites)
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
        <SafeAreaProvider style={{flexDirection: 'row', backgroundColor: isDarkMode ? "hsl(0, 0%, 15%)" : "hsl(0, 0%, 85%)"}}>
            <LinearGradient
                colors={isDarkMode ? ['hsl(0 0% 25%)', 'transparent'] : ['hsl(0 0% 100%)', 'transparent']}
                style={[StyleSheet.absoluteFill, {height: 136}]}
            />
            <ScrollView
                style={{
                    paddingLeft: 16,
                    paddingRight: 16,
                }}
                contentContainerStyle={{paddingBottom: 80}}
            >
                <SafeAreaView>
                    <Text style={[styles.textMedium, {color: isDarkMode ? 'hsl(45 15% 80%)' : 'hsl(45 5% 25%)'}, {marginLeft: 8}]}>{timeValue}, {nameValue}</Text>

                    <InputField placeholderText={"Zoek een locatie..."}>
                        <SearchIcon size={36}/>
                    </InputField>
                        <View style={styles.mainContentContainer}>
                            <DividerComponent />
                            <Text style={[styles.textSemiBold, {color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'}]}>Opgeslagen Locaties</Text>
                            <ListContainer data={favorites}/>

                            <DividerComponent />
                            <Text style={[styles.textSemiBold, {color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'}]}>Aanbevolen Locaties</Text>
                            <ListContainer data={recommended}/>
                        </View>
                </SafeAreaView>
            </ScrollView>
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
    },
});