import React, {useCallback, useContext, useEffect, useState} from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {Text, StyleSheet, View, FlatList, ActivityIndicator, Pressable,} from "react-native";
import {DarkModeContext} from "../context/DarkModeContext";
import ListItem from "../components/ListItem";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

export default function AllRestaurants() {
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(true)
    const {isDarkMode} = useContext(DarkModeContext);
    const navigation = useNavigation()

    useFocusEffect(
        useCallback(() => {
            const fetchRestaurant = async () => {
                const response = await fetch(`http://145.24.223.116/api/restaurants?full_detail=true`, {
                    method: 'GET',
                    headers: {
                        'Accept': "application/json"
                    }
                })

                const data = await response.json()
                setRestaurants(data)
                setLoading(false)
            }
            fetchRestaurant()
        }, [])
    );


    if (loading || !restaurants) {
        return (
            <View style={[styles.loading, { backgroundColor: isDarkMode ? "hsl(0, 0%, 15%)" : "hsl(0, 0%, 85%)" }]}>
                <Text style={[styles.textLarge, { color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)' }]}>Loading Restaurants</Text>
                <ActivityIndicator size={"large"} />
            </View>
        );
    }

    return (
        <SafeAreaProvider style={{backgroundColor: isDarkMode ? "hsl(0, 0%, 15%)" : "hsl(0, 0%, 85%)"}}>
            <Pressable onPress={navigation.goBack}>
                <FontAwesome5Icon size={32} color={isDarkMode ? "hsl(45 100% 80%)" : "hsl(225 30% 40%)"} name={"chevron-left"}/>
            </Pressable>
            <SafeAreaView style={{paddingLeft: 16, paddingTop:8, paddingRight: 16}}>
                <FlatList
                    data={restaurants}
                    renderItem={({item}) => <ListItem data={item}/>}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    textLarge: {
        fontFamily: 'Urbanist_700Bold',
        fontSize: 32,
        textAlign: "center",
    },
    loading : {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
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