import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {Pressable, TextInput, Text, StyleSheet, View, Switch} from "react-native";
import {DarkModeContext} from "../context/DarkModeContext";

export default function Detail({route}) {
    const { id } = route.params;
    const [restaurant, setRestaurant] = useState({})
    // console.log(route.params)
    const {isDarkMode} = useContext(DarkModeContext);

    // useFocusEffect(
    //     useCallback( () => {
    //         //nested with an async like this because react native gives a warning
    //         //when I do useCallback( async()
    //         const response = await fetch('http://145.24.223.116/api/restaurants?map=true', {
    //             method: 'GET',
    //             headers: {
    //                 'Accept' : "application/json"
    //             }
    //         })
    //
    //         const data = await response.json()
    //     }, [])
    // )

    useEffect( () => {
        const fetchRestaurant = async () => {
            const response = await fetch(`http://145.24.223.116/api/restaurants/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': "application/json"
                }
            })

            const data = await response.json()
            console.log(data)
            setRestaurant(data)
        }
        fetchRestaurant()
    }, []);

    return (
        <SafeAreaProvider style={{backgroundColor: isDarkMode ? "hsl(0, 0%, 15%)" : "hsl(0, 0%, 85%)", paddingLeft: 16, paddingTop:8, paddingRight: 16}}>
            <SafeAreaView>
                <View>
                    <Text>{restaurant.name}</Text>
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

    // button: {
    //     marginTop: 10,
    //     backgroundColor: "#87ceeb",
    //     padding: 10,
    //     borderRadius: 5,
    //     fontWeight: "bold"
    // },
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