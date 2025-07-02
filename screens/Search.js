import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import { useState, useEffect, useRef } from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import darkMapStyle from '../assets/darkMapStyle.json';

import * as Location from 'expo-location';
import {useFocusEffect} from "@react-navigation/native";
import DividerComponent from "../components/DividerComponent";
import Svg, {Path} from "react-native-svg";
import Tag from "../components/Tag";
import {LinearGradient} from "expo-linear-gradient";

export default function Search() {
    const [location, setLocation] = useState();
    const [loading, setLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState();
    const [markers, setMarkers] = useState([])
    const [selectedMarker, setSelectedMarker] = useState(null);

    const watchId = useRef()

    async function getCurrentLocation() {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Toegang tot de locatie was niet toegestaan');
                return;
            }

            watchId.current = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.Highest,
                    // timeInterval: 1000,
                    distanceInterval: 5,
                },
                (loc) => {
                    const newCoords = {
                        latitude: loc.coords.latitude,
                        longitude: loc.coords.longitude,
                    }

                    setLocation({
                        ...newCoords,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    })
                }
            )

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

        const locations = data.map(item => ({
            name: item.name,
            latitude: item.latitude,
            longitude: item.longitude,
            star_count: item.star_count,
            tags: item.tags,
        }));
        setMarkers(locations);
    }

    useEffect(() => {
        console.log(selectedMarker)
    }, [selectedMarker]);

    useFocusEffect(
        React.useCallback(() => {
            getCurrentLocation();
            getAllLocations()
        }, [])
    );

    if (loading === true) {
        return (
            <View style={styles.loading}>
                <Text style={[styles.text, styles.textLarge]}>Loading Location</Text>
                <ActivityIndicator size={"large"}></ActivityIndicator>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <MapView
                userLocationPriority={"balanced"}
                showsUserLocation={true}
                customMapStyle={darkMapStyle}
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
                        colors={['hsl(0 0% 35%)', 'transparent', 'transparent']}
                        style={styles.borderGradient}
                    />
                    <View style={[styles.popup, styles.text]}>
                        <Text
                            style={[styles.textLarge, styles.text]}
                        >{selectedMarker.name}</Text>
                        <DividerComponent></DividerComponent>

                        {/*Location pin*/}
                        <View style={styles.detailWrapper}>
                            <Svg width={24} height={24} viewBox="0 0 24 24" className="d-none">
                                <Path
                                    d="M12,2a8,8,0,0,0-8,8c0,5.4,7.05,11.5,7.35,11.76a1,1,0,0,0,1.3,0C13,21.5,20,15.4,20,10A8,8,0,0,0,12,2Zm0,17.65c-2.13-2-6-6.31-6-9.65a6,6,0,0,1,12,0C18,13.34,14.13,17.66,12,19.65ZM12,6a4,4,0,1,0,4,4A4,4,0,0,0,12,6Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,12Z"
                                    fill="#fff9e5" className="color000 svgShape"/>
                            </Svg>
                            <Text>{selectedMarker.address}</Text>
                        </View>

                        {/*Star*/}
                        <View style={styles.detailWrapper}>
                            <Svg width={24} height={24} enable-background="new 0 0 24 24" viewBox="0 0 24 24"
                                 className="d-none">
                                <Path
                                    d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9&#10;&#9;C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7&#10;&#9;c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"
                                    fill="#fff9e5" className="color000 svgShape"/>
                            </Svg>
                            <Text>{selectedMarker.star_count}</Text>
                        </View>

                        {/*Tag*/}
                        <View style={styles.detailWrapper}>
                            <Svg width={24} height={24} viewBox="0 0 24 24" className="d-none">
                                <Path
                                    d="M7.5,6A1.5,1.5,0,1,0,9,7.5,1.5,1.5,0,0,0,7.5,6Zm13.62,4.71L12.71,2.29A1,1,0,0,0,12,2H3A1,1,0,0,0,2,3v9a1,1,0,0,0,.29.71l8.42,8.41a3,3,0,0,0,4.24,0L21.12,15a3,3,0,0,0,0-4.24Zm-1.41,2.82h0l-6.18,6.17a1,1,0,0,1-1.41,0L4,11.59V4h7.59l8.12,8.12a1,1,0,0,1,.29.71A1,1,0,0,1,19.71,13.53Z"
                                    fill="#fff9e5" className="color000 svgShape"/>
                            </Svg>
                            {selectedMarker.tags.map((item, index) =>
                            <Tag key={index}>{item.tag_name}</Tag>
                            )}
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}

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
        fontSize: 32,
        textAlign: "center",
    },

    container: {
        flex: 1,
        backgroundColor: "hsl(0, 0%, 15%)"
    },
    loading : {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "hsl(0, 0%, 15%)"
    },
    map: {
        width: '110%',
        height: '110%',
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },

    popupWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },

    borderGradient: {
        position: 'absolute',
        top: -1,
        left: -1,
        right: -1,
        bottom: 0,
        borderRadius: 100,
        zIndex: -1,
        boxShadow: '0 5 5 0 rgba(0,0,0,0.2)', //shadows look a little weird in the emulator
    },

    popup: {
        backgroundColor: 'hsl(0 0% 15%)',
        padding: 16,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        zIndex: 1,
        paddingBottom: "25%",
    },
    popupTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    detailWrapper: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 4
    }
});
