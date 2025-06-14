import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function Search({ route }) {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{height: 100, flexDirection: 'row'}}>
                <Text>Search</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};