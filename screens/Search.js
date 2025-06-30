import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import { useState, useEffect, useRef } from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import darkMapStyle from '../assets/darkMapStyle.json';

import * as Location from 'expo-location';
import {useFocusEffect} from "@react-navigation/native";

export default function Search() {
    const [location, setLocation] = useState();
    const [loading, setLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState();
    const [markerLocations, setMarkerLocations] = useState([])

    const watchId = useRef()



    useFocusEffect(
        React.useCallback(() => {
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
                            console.log(loc)
                            const newCoords = {
                                latitude: loc.coords.latitude,
                                longitude: loc.coords.longitude,
                            }

                            setMarkerLocations(prevLocations => [...prevLocations, loc]);
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
            getCurrentLocation();
        }, [])
    );

    if (loading === true) {
        return (
            <View style={styles.loading}>
                <Text style={{fontSize: 40}}>Loading Location</Text>
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
                {markerLocations.map((item, index) =>
                    <Marker
                        key={index}
                        coordinate={{
                            longitude: item.coords?.longitude,
                            latitude: item.coords?.latitude,
                        }}
                    />
                )}

            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loading : {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: '105%',
        height: '105%',
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
});
