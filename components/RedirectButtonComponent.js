import {Text, StyleSheet, Pressable} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import React, {useContext} from "react";
import {DarkModeContext} from "../context/DarkModeContext";
import {useNavigation} from "@react-navigation/native";
export default function RedirectButtonComponent({children, href}) {
	const navigation = useNavigation();
	const {isDarkMode} = useContext(DarkModeContext)

	return (
		<Pressable style={styles.wrapper} onPress={() => navigation.navigate(href.route, href.params)}>
			<LinearGradient
				colors={isDarkMode ? ['hsl(225 80% 80%)', 'transparent', 'transparent'] : ['hsl(0 0% 100%)', 'transparent', 'transparent']}
				style={styles.borderGradient}
			/>
			<Text style={[styles.tag, {backgroundColor: isDarkMode ? "hsl(0 0% 20%)" : "hsl(0 0% 90%)", color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'}]}>{children}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		marginLeft: 8,
		alignItems: "center",
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
	tag: {
		fontFamily: 'Urbanist_500Medium',
		fontSize: 16,
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 100,
		textAlign: "center",
	}
});