import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import React from "react";
export default function ListContainer() {
	return (
		<View style={styles.listContainerWrapper}>
			<LinearGradient
				colors={['hsla(0 0% 35% / 100)', 'transparent', 'transparent']}
				style={styles.borderGradient}
			/>
			<ScrollView style={styles.listContainer}>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	listContainerWrapper: {
		position: "relative",
		width: "100%",
		paddingTop: 16
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
		backgroundColor: "hsl(0 0% 20%)",
		height: 160,
		width: "100%",
		borderRadius: 15,
		boxShadow: '0 5 5 0 rgba(0,0,0,0.2)',
	}
});