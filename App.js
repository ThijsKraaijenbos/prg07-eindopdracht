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
import Svg, {Path} from "react-native-svg";


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
                    position: 'absolute',
                    bottom: 15,
                    width: 300,
                    left: '50%',
                    transform: [{ translateX: 50 }],
                    height: 70,
                    backgroundColor: '#404040',
                    borderRadius: 100,
                    paddingTop: 15,
                    elevation: 0,
                    shadowOpacity: 0,
                    shadowOffset: { width: 0, height: 0 },
                    shadowRadius: 0,
                },
                tabBarItemStyle: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 48
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center' }}>
                            <Svg width={48} height={48} viewBox="0 0 24 24">
                                <Path
                                    d="M20,8h0L14,2.74a3,3,0,0,0-4,0L4,8a3,3,0,0,0-1,2.26V19a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V10.25A3,3,0,0,0,20,8ZM14,20H10V15a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1Zm5-1a1,1,0,0,1-1,1H16V15a3,3,0,0,0-3-3H11a3,3,0,0,0-3,3v5H6a1,1,0,0,1-1-1V10.25a1,1,0,0,1,.34-.75l6-5.25a1,1,0,0,1,1.32,0l6,5.25a1,1,0,0,1,.34.75Z"
                                    fill={focused ? "#FFE597" : "#A6A6A6"}
                                />
                            </Svg>
                            <View
                                style={{
                                    marginTop: 1,
                                    height: 4,
                                    width: 32,
                                    backgroundColor: '#FFE597',
                                    borderRadius: 2,
                                    opacity: focused ? 1 : 0,
                                }}
                            />
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
                    tabBarIcon: ({focused}) => (
                        <View style={{ alignItems: 'center' }}>
                            <Svg width={48} height={48} viewBox="0 0 24 24">
                                <Path
                                    d="M21.07,16.83,19,14.71a3.08,3.08,0,0,0-3.4-.57l-.9-.9a7,7,0,1,0-1.41,1.41l.89.89A3,3,0,0,0,14.71,19l2.12,2.12a3,3,0,0,0,4.24,0A3,3,0,0,0,21.07,16.83Zm-8.48-4.24a5,5,0,1,1,0-7.08A5,5,0,0,1,12.59,12.59Zm7.07,7.07a1,1,0,0,1-1.42,0l-2.12-2.12a1,1,0,0,1,0-1.42,1,1,0,0,1,1.42,0l2.12,2.12A1,1,0,0,1,19.66,19.66Z"
                                    fill={focused ? "#FFE597" : "#A6A6A6"} className="color000 svgShape"/>
                            </Svg>
                            <View
                                style={{
                                    marginTop: 1,
                                    height: 4,
                                    width: 32,
                                    backgroundColor: '#FFE597',
                                    borderRadius: 2,
                                    opacity: focused ? 1 : 0,
                                }}
                            />
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
                    tabBarIcon: ({focused}) => (
                        <View style={{ alignItems: 'center' }}>
                            <Svg width={48} height={48} viewBox="0 0 24 24">
                                <Path
                                    d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM18.41 14l.8.9-1.28 2.22-1.18-.24a3 3 0 0 0-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 0 0-3.45-2l-1.18.24-1.3-2.21.8-.9a3 3 0 0 0 0-4l-.8-.9 1.28-2.2 1.18.24a3 3 0 0 0 3.45-2L10.36 4h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24 1.28 2.22-.8.9a3 3 0 0 0 0 3.98Zm-6.77-6a4 4 0 1 0 4 4 4 4 0 0 0-4-4Zm0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2Z"
                                    fill={focused ? "#FFE597" : "#A6A6A6"} className="color000 svgShape"/>
                            </Svg>
                            <View
                                style={{
                                    marginTop: 1,
                                    height: 4,
                                    width: 32,
                                    backgroundColor: '#FFE597',
                                    borderRadius: 2,
                                    opacity: focused ? 1 : 0,
                                }}
                            />
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
                options={{headerShown: false}}
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
        justifyContent: "flex-end",
        alignItems: "flex-end",
    }
});