import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import React, {useContext} from "react";
import {DarkModeContext} from "../context/DarkModeContext";
export default function ListContainer({children}) {
	const [toggled, setToggled] = [false]
	const {isDarkMode} = useContext(DarkModeContext)
	return (
		<View style={styles.listContainerWrapper}>
			<LinearGradient
				colors={isDarkMode ? ['hsl(0 0% 35%)', 'transparent', 'transparent'] : ['hsl(0 0% 100%)', 'transparent', 'transparent']}
				style={styles.borderGradient}
			/>
			<ScrollView style={[styles.listContainer, {backgroundColor: isDarkMode ? "hsl(0 0% 20%)" : "hsl(0 0% 90%)"}]}>
				{children}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	listContainerWrapper: {
		position: "relative",
		width: "100%",
		paddingTop: 16,
	},

	borderGradient: {
		position: 'absolute',
		top: 14,
		left: -2,
		right: -2,
		bottom: 0,
		borderRadius: 15,
		zIndex: 0,
	},

	listContainer: {
		minHeight: 60,
		maxHeight: 240,
		width: "100%",
		borderRadius: 15,
		boxShadow: '0 5 5 0 rgba(0,0,0,0.2)',
	}
});