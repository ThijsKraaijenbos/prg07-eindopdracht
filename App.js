import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home.js';
import Settings from './screens/Settings.js';
import Search from './screens/Search.js';
import {View, Dimensions, StyleSheet, Keyboard} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {LinearGradient} from "expo-linear-gradient";
import {useFonts} from "expo-font";
import {Urbanist_700Bold} from "@expo-google-fonts/urbanist/700Bold";
import {Urbanist_500Medium, Urbanist_600SemiBold} from "@expo-google-fonts/urbanist";
import {useContext, useEffect, useState} from "react";
import {DarkModeContext, DarkModeContextProvider} from "./context/DarkModeContext";
import Detail from "./screens/Detail";
import AllRestaurants from "./screens/AllRestaurants";
import SearchIcon from "./components/icons/SearchIcon";
import IconUnderline from "./components/icons/IconUnderline";
import HomeIcon from "./components/icons/HomeIcon";
import SettingsIcon from "./components/icons/SettingsIcon";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const { width: screenWidth } = Dimensions.get('window');
const tabBarWidth = screenWidth * 0.75;


function BottomTabs() {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const {isDarkMode} = useContext(DarkModeContext);

    //hide navbar when keyboard opens
    useEffect(() => {
         Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });
    }, []);

    return (
        <View style={{ flex: 1}}>
            <LinearGradient
                colors={isDarkMode ? ['hsl(0 0% 35%)', 'transparent', 'transparent'] : ['hsl(0 0% 100%)', 'transparent', 'transparent']}
                style={{
                    position: 'absolute',
                    bottom: keyboardVisible ? -100 : 15,
                    width: tabBarWidth + 2,
                    height: 64,
                    transform: [{ translateX: screenWidth / 2 - tabBarWidth / 2 - 1 }],
                    borderRadius: 100,
                    zIndex:1,
                }}
            />

            <Tab.Navigator
                screenOptions={{
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: 'absolute',
                        bottom: keyboardVisible ? -100 : 15,
                        width: tabBarWidth,
                        transform: [{ translateX: screenWidth / 2 - tabBarWidth / 2 }],
                        height: 62,
                        backgroundColor: isDarkMode ? 'hsl(0 0% 20%)' : 'hsl(0 0% 90%)',
                        borderRadius: 100,
                        overflow: 'hidden',
                        paddingTop: 12,
                        boxShadow: '0 5 5 0 rgba(0,0,0,0.2)', //shadows look a little weird in the emulator
                        zIndex: 5,
                        borderColor: "transparent"
                    },
                    tabBarItemStyle: {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 48,
                    },
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center' }}>
                                <HomeIcon size={42} focused={focused}/>
                                <IconUnderline focused={focused}/>
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
                            <View style={{ alignItems: 'center' }}>
                                <SearchIcon size={42} focused={focused}/>
                                <IconUnderline focused={focused}/>
                            </View>
                        ),
                        headerShown: false,
                        title: 'Test1',
                    }}
                />

                <Tab.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center' }}>
                                <SettingsIcon size={42} focused={focused}/>
                                <IconUnderline focused={focused}/>
                            </View>
                        ),
                        headerShown: false,
                        title: 'Test2',
                    }}
                />
            </Tab.Navigator>
        </View>
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
            <Stack.Screen
                name="AllRestaurants"
                component={AllRestaurants}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Detail"
                component={Detail}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default function App() {
    const [fontsLoaded] = useFonts({
        Urbanist_500Medium,
        Urbanist_600SemiBold,
        Urbanist_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <DarkModeContextProvider>
            <NavigationContainer>
                <RootStack />
            </NavigationContainer>
        </DarkModeContextProvider>
    );
}
