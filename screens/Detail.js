import React, {useCallback, useContext, useEffect, useState} from 'react';
import {SafeAreaView, SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Pressable, TextInput, Text, StyleSheet, View, Switch, Image, ActivityIndicator, ScrollView} from "react-native";
import {DarkModeContext} from "../context/DarkModeContext";
import {LinearGradient} from "expo-linear-gradient";
import LocationIcon from "../components/icons/LocationIcon";
import StarIcon from "../components/icons/StarIcon";
import TagIcon from "../components/icons/TagIcon";
import Tag from "../components/Tag";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import ButtonComponent from "../components/ButtonComponent";

export default function Detail({route}) {
    const { id } = route.params;
    const [loading, setLoading] = useState(true)
    const [restaurant, setRestaurant] = useState({})
    const [favorite, setFavorite] = useState(false)
    const navigation = useNavigation()
    const {isDarkMode} = useContext(DarkModeContext);
    const insets = useSafeAreaInsets();


    useEffect( () => {
        const fetchRestaurant = async () => {
            const response = await fetch(`http://145.24.223.116/api/restaurants/${id}?full_detail=true`, {
                method: 'GET',
                headers: {
                    'Accept': "application/json"
                }
            })

            const data = await response.json()
            setRestaurant(data)
            setLoading(false)
        }
        async function fetchData() {
            try {
                const favorites = await AsyncStorage.getItem('favorites');
                let parsedFavorites = JSON.parse(favorites);
                const isFavorite = parsedFavorites.some(item => item.id === id);

                if (!parsedFavorites) {
                    await AsyncStorage.setItem('favorites', JSON.stringify([]));
                }

                setFavorite(isFavorite);

            } catch (e) {
                console.log(e)
            }
        }
        fetchRestaurant()
        fetchData()
    }, []);

    const handleFavorite = async () => {
        try {
            const favorites = await AsyncStorage.getItem('favorites');
            let updatedFavorites;

            const parsedFavorites = JSON.parse(favorites) || [];

            if (favorite) {
                // Remove restaurant by ID
                updatedFavorites = parsedFavorites.filter(item => item.id !== restaurant.id);
            } else {
                const current = {
                    id: restaurant.id,
                    name: restaurant.name,
                    address: restaurant.address,
                    star_count: restaurant.star_count,
                    img_url: restaurant.img_url,
                    tags: restaurant.tags,
                };
                updatedFavorites = [...parsedFavorites, current];
            }

            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorite(!favorite);
        } catch (e) {
            console.log(e);
        }
    };


    if (loading || !restaurant) {
        return (
            <View style={[styles.loading, { backgroundColor: isDarkMode ? "hsl(0, 0%, 15%)" : "hsl(0, 0%, 85%)" }]}>
                <Text style={[styles.textLarge, { color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)' }]}>Loading Restaurant</Text>
                <ActivityIndicator size={"large"} />
            </View>
        );
    }

    return (
        <SafeAreaProvider style={{backgroundColor: isDarkMode ? "hsl(0, 0%, 15%)" : "hsl(0, 0%, 85%)"}}>
            <LinearGradient
                colors={isDarkMode ? ['hsl(0 0% 25%)', 'transparent'] : ['hsl(0 0% 100%)', 'transparent']}
                style={[StyleSheet.absoluteFill, {position: "absolute", top: 0, height: 136}]}
            />
            <ScrollView style={{paddingLeft: 16, paddingRight: 16}}>
                <SafeAreaView style={{top: insets.top, paddingBottom: insets.top + 32}}>
                        <Pressable style={styles.backButton} onPress={navigation.goBack}>
                            <FontAwesome5Icon size={32} color={isDarkMode ? "hsl(45 100% 80%)" : "hsl(225 30% 40%)"} name={"chevron-left"}/>
                        </Pressable>

                    <Pressable onPress={handleFavorite} style={styles.favoriteButton}>
                        {favorite ? (
                            <MaterialIcons size={40} color={isDarkMode ? 'hsl(0, 85%, 60%)' : 'hsl(0, 85%, 60%)'} name={"favorite"}/>
                        ) : (
                            <MaterialIcons size={40} color={isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'} name={"favorite-outline"}/>
                        )}
                    </Pressable>

                        <View style={styles.details}>
                            <Image
                                style={styles.coverImage}
                                source={{
                                    uri: `${restaurant.img_url}`,
                                }}
                            />

                            <Text
                                style={[styles.textLarge, {color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'}]}
                            >{restaurant.name}</Text>
                            <View style={[styles.line, {backgroundColor: isDarkMode ? 'hsl(0 0% 30%)' : 'hsl(0 0% 80%)' }]} />

                            <View style={styles.detailContainer}>

                                {/*Location pin*/}
                                <View style={styles.detailWrapper}>
                                    <LocationIcon size={24}/>
                                    <Text style={[styles.infoText, {color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'}]}>{restaurant.address}</Text>
                                </View>

                                {/*Star*/}
                                <View style={styles.detailWrapper}>
                                    <StarIcon size={24}/>
                                    <Text style={[styles.infoText, {color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'}]}>{restaurant.star_count}</Text>
                                </View>

                                <View style={styles.detailWrapper}>
                                    <TagIcon size={24}/>
                                    {restaurant.tags.map((item, index) =>
                                        <Tag key={index} size={16}>{item.tag_name}</Tag>
                                    )}
                                </View>
                            </View>
                            <View style={[styles.line, {backgroundColor: isDarkMode ? 'hsl(0 0% 30%)' : 'hsl(0 0% 80%)' }]} />
                            <View>
                                <Text style={[styles.descriptionHeader, {color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'}]}>Beschrijving</Text>
                                <Text style={[styles.description, {color: isDarkMode ? 'hsl(45 15% 80%)' : 'hsl(45 5% 25%)'}]}>{restaurant.description}</Text>
                            </View>
                        </View>
                    <View style={{alignItems: "flex-start", marginTop: 16, height: "100%"}}>
                        <ButtonComponent onPress={() => navigation.navigate('BottomTabs', {
                            screen: 'Search',
                            params: {
                                selectedRestaurant: {
                                    id: restaurant.id,
                                    latitude: restaurant.latitude,
                                    longitude: restaurant.longitude,
                                },
                            },
                        })}>Bekijk op kaart</ButtonComponent>
                    </View>
                </SafeAreaView>
            </ScrollView>
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

    backButton: {
        position:"absolute"
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

    line: {
        height: 2,
        width: "90%",
        margin: 0,
        marginVertical: 8,
        alignSelf:"center",
        borderRadius: 100
    },

    details: {
        display: "flex",
        flexDirection: "column",
    },

    coverImage: {
        width: "100%",
        height: 240,
        borderRadius: 8,
        boxShadow: '0 5 5 0 rgba(0,0,0,0.2)',
        marginTop: 16
    },

    infoText: {
        marginLeft: 8,
        maxWidth: "70%",
        fontFamily: 'Urbanist_500Medium',
        fontSize: 24
    },
    heading: {
        fontFamily: 'Urbanist_600SemiBold',
        fontSize: 20,
        textAlign: "center"
    },

    detailContainer: {
        display: "flex",
        position: "relative",
        flexDirection: "column",
        gap: 4
    },
    detailWrapper: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 4,
        alignItems: "center",
    },
    descriptionHeader: {
        fontFamily: 'Urbanist_700Bold',
        fontSize: 24,
    },
    description: {
        marginTop: 4,
        fontFamily: 'Urbanist_500Medium',
        fontSize: 16,
    },
    favoriteButton: {
        position: "absolute",
        right: 0
    }
})