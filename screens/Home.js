import React, {useCallback, useEffect, useState} from 'react';
import {Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import H1 from "../components/Header1";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "@react-navigation/native";

export default function Home({ route }) {

    useFocusEffect(
        useCallback(() => {

        }, [])
    )

    //return appropriate message depending on time of day
    function getTime() {
        let hours = new Date().getHours();
        let res = ""
        if (hours < 6) {
            res = "nacht"
        } else if (hours < 12) {
            res = "morgen"
        } else if (hours < 18) {
            res = "middag"
        } else if (hours < 24) {
            res = "avond"
        }
        return res
    }


    return (
        <SafeAreaProvider style={{height: 100, flexDirection: 'row'}}>
            <SafeAreaView>
                <H1>Goede{getTime()},</H1>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};