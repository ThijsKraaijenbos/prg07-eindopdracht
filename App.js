import * as React from 'react';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './screens/Home.js'
import Settings from './screens/Settings.js'
import {Image, StyleSheet, View} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Search from "./screens/Search";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
    const { colors } = useTheme();
    const iconSize = 50;
    return (
        <Tab.Navigator

            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: iconSize + 20,
                },
                tabBarItemStyle: {
                    top: 15,
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'center',
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconView}>
                            <FontAwesome5 name="home" size={iconSize} color={focused ? colors.primary : "000"}/>
                        </View>
                    ),
                    headerShown: false,
                    title: 'Home',
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ focused }) => (
                    <View style={styles.iconView}>
                        <FontAwesome5 name="search-location" size={iconSize} color={focused ? colors.primary : "000"}/>
                    </View>
                    ),
                    headerShown: false,
                    title: 'Test1'
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarIcon: ({ focused }) => (
                    <View style={styles.iconView}>
                        <FontAwesome6 name="gear" size={iconSize} color={focused ? colors.primary : "000"}/>
                    </View>
                    ),
                    headerShown: false,
                    title: 'Test2'
                }}
            />
        </Tab.Navigator>
    );
}

function RootStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="BottomTabs"
                component={BottomTabs}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <RootStack></RootStack>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    iconView: {
        justifyContent: "center",
        alignItems: "center",
        height: 64,
        width: 64
    },
});