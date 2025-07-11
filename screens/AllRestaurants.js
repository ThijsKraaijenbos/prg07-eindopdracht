import React, {useCallback, useContext, useEffect, useState} from 'react';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text, StyleSheet, View, FlatList, ActivityIndicator, Pressable,} from "react-native";
import {DarkModeContext} from "../context/DarkModeContext";
import ListItem from "../components/ListItem";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {LinearGradient} from "expo-linear-gradient";
import InputField from "../components/InputField";
import SearchIcon from "../components/icons/SearchIcon";

export default function AllRestaurants() {
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(true)
    const [filterValue, setFilterValue] = useState("");
    const {isDarkMode} = useContext(DarkModeContext);
    const navigation = useNavigation()
    const insets = useSafeAreaInsets();

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

    const search = async (text) => {
        setFilterValue(text);
    }

    useEffect( () => {
        async function filter(){
            const response = await fetch(`http://145.24.223.116/api/restaurants?filter=${filterValue}&full_detail=true`, {
                method: 'GET',
                headers: {
                    'Accept' : "application/json"
                }
            })

            const data = await response.json()
            setRestaurants(data);
        }
        filter()
    }, [filterValue]);


    if (loading || !restaurants) {
        return (
            <View style={[styles.loading, { backgroundColor: isDarkMode ? "hsl(0, 0%, 15%)" : "hsl(0, 0%, 85%)" }]}>
                <Text style={[styles.textLarge, { color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)' }]}>Restaurants zijn aan het laden...</Text>
                <ActivityIndicator size={"large"} />
            </View>
        );
    }

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: isDarkMode ? "hsl(0, 0%, 15%)" : "hsl(0, 0%, 85%)" }}>
            <LinearGradient
                colors={isDarkMode ? ['hsl(0 0% 25%)', 'transparent'] : ['hsl(0 0% 100%)', 'transparent']}
                style={[StyleSheet.absoluteFill, {height: 136}]}
            />
            <FlatList
                data={restaurants}
                contentContainerStyle={{
                    paddingBottom: insets.bottom + 16,
                }}
                ListHeaderComponent={
                <View style={{ zIndex: 10, marginLeft: 16, marginBottom: 8, marginTop: insets.top }}>
                    <Pressable onPress={navigation.goBack}>
                        <FontAwesome5Icon
                            size={32}
                            color={isDarkMode ? "hsl(45 100% 80%)" : "hsl(225 30% 40%)"}
                            name={"chevron-left"}
                        />
                    </Pressable>
                        <InputField
                            onChange={search}
                            placeholderText={"Zoek een locatie..."}>
                        <SearchIcon size={36}/>
                    </InputField>
                </View>
                }
                renderItem={({ item }) => <ListItem data={item} />}
                keyExtractor={item => item.id}
            />
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

    // button: {
    //     marginTop: 10,
    //     backgroundColor: "#87ceeb",
    //     padding: 10,
    //     borderRadius: 5,
    //     fontWeight: "bold"
    // },
})