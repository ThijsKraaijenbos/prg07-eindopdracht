import React, {useContext} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { useState, useEffect, useRef } from 'react';
import {Text, View, StyleSheet, ActivityIndicator, Pressable} from 'react-native';
import darkMapStyle from '../assets/darkMapStyle.json';
import lightMapStyle from '../assets/lightMapStyle.json';

import * as Location from 'expo-location';
import {useFocusEffect} from "@react-navigation/native";
import DividerComponent from "../components/DividerComponent";
import Svg, {Path} from "react-native-svg";
import Tag from "../components/Tag";
import {LinearGradient} from "expo-linear-gradient";
import {DarkModeContext} from "../context/DarkModeContext";
import RedirectButtonComponent from "../components/RedirectButtonComponent";
import {SafeAreaProvider, useSafeAreaInsets} from "react-native-safe-area-context";
import LocationIcon from "../components/icons/LocationIcon";
import TagIcon from "../components/icons/TagIcon";
import StarIcon from "../components/icons/StarIcon";

export default function Search() {
    const [location, setLocation] = useState();
    const [loading, setLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState();
    const [markers, setMarkers] = useState([])
    const [selectedMarker, setSelectedMarker] = useState(null);
    const {isDarkMode} = useContext(DarkModeContext)
    const insets = useSafeAreaInsets();

    async function getCurrentLocation() {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Toegang tot de locatie was niet toegestaan');
                return;
            }

            const loc = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest,
            });

            const newCoords = {
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
            };

            setLocation({
                ...newCoords,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });

        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    async function getAllLocations() {
        const response = await fetch('http://145.24.223.116/api/restaurants?map=true', {
            method: 'GET',
            headers: {
                'Accept' : "application/json"
            }
        })

        const data = await response.json()
        setMarkers(data);
    }

    useEffect(() => {
        getCurrentLocation();
        getAllLocations()
    }, []);

    if (loading || !location) {
        return (
            <View style={[styles.loading, { backgroundColor: isDarkMode ? "hsl(0, 0%, 15%)" : "hsl(0, 0%, 85%)" }]}>
                <Text style={[styles.textLarge, { color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)' }]}>Loading Location</Text>
                <ActivityIndicator size={"large"} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? "hsl(0, 0%, 15%)" : "hsl(0, 0%, 85%)" }]}>
            <View style={[styles.topButton, {top: insets.top}]}>
                <RedirectButtonComponent href={{route: "AllRestaurants"}}>Bekijk Alle</RedirectButtonComponent>
            </View>
            <MapView
                userLocationPriority={"balanced"}
                showsUserLocation={true}
                customMapStyle={isDarkMode ? darkMapStyle : lightMapStyle}
                initialRegion={
                    location
                        ? {
                            longitude: location.longitude,
                            latitude: location.latitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }
                        : undefined
                }
                region={location}
                style={styles.map}
                showsMyLocationButton={false}
            >
                {markers.map((item, index) =>
                    <Marker
                        key={index}
                        title={item.name}
                        coordinate={{
                            longitude: item.longitude,
                            latitude: item.latitude,
                        }}
                        onDeselect={() => setSelectedMarker(null)}
                        onSelect={() => setSelectedMarker(item)}
                    />
                )}

            </MapView>

            {selectedMarker && (
                <View style={styles.popupWrapper}>
                    <LinearGradient
                        colors={isDarkMode ? ['hsl(0 0% 35%)', 'transparent', 'transparent'] : ['hsl(0 0% 100%)', 'transparent', 'transparent']}
                        style={styles.borderGradient}
                    />
                    <View style={[styles.popup, {backgroundColor: isDarkMode ? 'hsl(0 0% 15%)' : 'hsl(0 0% 85%)',}]}>
                        <Text
                            style={[styles.textLarge, {color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'}]}
                        >{selectedMarker.name}</Text>
                        <DividerComponent></DividerComponent>

                        <View style={styles.detailContainer}>
                            {/*Location pin*/}
                            <View style={styles.detailWrapper}>
                                <LocationIcon size={24}/>
                                <Text style={[styles.infoText, styles.textMedium, {color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'}]}>{selectedMarker.address}</Text>
                            </View>

                            {/*Star*/}
                            <View style={styles.detailWrapper}>
                                <StarIcon size={24}/>
                                <Text style={[styles.infoText, styles.textMedium, {color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'}]}>{selectedMarker.star_count}</Text>
                            </View>

                            {/*Tag*/}
                            <View style={styles.detailWrapper}>
                                <TagIcon size={24}/>
                                {selectedMarker.tags.map((item, index) =>
                                <Tag key={index} size={16}>{item.tag_name}</Tag>
                                )}
                            </View>
                            <View style={styles.detailLeft}>
                                <RedirectButtonComponent href={{ route: 'Detail', params: { id: selectedMarker.id } }}>Meer details</RedirectButtonComponent>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    textMedium: {
        fontFamily: 'Urbanist_500Medium',
        fontSize: 24
    },
    textLarge: {
        fontFamily: 'Urbanist_700Bold',
        fontSize: 32,
        textAlign: "center",
    },

    container: {
        flex: 1,
        position: "relative"
    },
    loading : {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: '110%',
        height: '110%',
    },
    topButton: {
        position: "absolute",
        zIndex: 100,
        right: 16,
    },
    popupWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },

    borderGradient: {
        position: 'absolute',
        top: -2,
        left: -2,
        right: -2,
        bottom: 0,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        zIndex: 1,
        boxShadow: '0 5 5 0 rgba(0,0,0,0.2)', //shadows look a little weird in the emulator
    },

    popup: {
        padding: 16,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        zIndex: 1,
        paddingBottom: "25%",
    },
    detailWrapper: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 4,
        alignItems: "center"
    },
    detailContainer: {
        display: "flex",
        position: "relative",
        flexDirection: "column",
    },
    infoText: {
        marginLeft: 8,
        maxWidth: "70%",
    },
    detailLeft: {
        position: "absolute",
        bottom: 0,
        alignSelf: "flex-end", // or "center"
    },
});
