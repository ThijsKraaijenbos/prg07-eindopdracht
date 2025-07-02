import {Text, StyleSheet, View} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import React from "react";
export default function Tag({children}) {
	return (
		<View style={styles.wrapper}>
		<LinearGradient
			colors={['hsl(0 0% 35%)', 'transparent', 'transparent']}
			style={styles.borderGradient}
		/>
		<Text style={styles.tag}>{children}</Text>
		</View>
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
		backgroundColor: 'hsl(0 0% 25%)',
		color: 'hsl(45 100% 95%)',
		fontFamily: 'Urbanist_500Medium',
		fontSize: 16,
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 100,
		textAlign: "center",
	}
});