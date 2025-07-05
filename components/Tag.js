import {Text, StyleSheet, View} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import React, {useContext} from "react";
import {DarkModeContext} from "../context/DarkModeContext";
export default function Tag({children, size, listItem}) {
	const {isDarkMode} = useContext(DarkModeContext)

	return (
		<View style={[styles.wrapper, {marginLeft: listItem ? 4 : 8}]}>
		<LinearGradient
			colors={isDarkMode ? ['hsl(0 0% 35%)', 'transparent', 'transparent'] : ['hsl(0 0% 100%)', 'transparent', 'transparent']}
			style={styles.borderGradient}
		/>
		<Text style={[styles.tag, {fontSize: size, backgroundColor: isDarkMode ? "hsl(0 0% 20%)" : "hsl(0 0% 90%)", color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'}]}>{children}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		alignItems: "center",
	},
	borderGradient: {
		position: 'absolute',
		top: -1,
		left: -1,
		right: -1,
		bottom: 0,
		borderRadius: 100,
		zIndex: 1,
		boxShadow: '0 5 5 0 rgba(0,0,0,0.2)', //shadows look a little weird in the emulator
	},
	tag: {
		fontFamily: 'Urbanist_500Medium',
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 100,
		textAlign: "center",
		zIndex: 5,
	}
});