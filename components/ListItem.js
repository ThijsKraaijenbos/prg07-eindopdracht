import {View, StyleSheet, ScrollView, Text, Image} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import React, {useContext} from "react";
import {DarkModeContext} from "../context/DarkModeContext";
export default function ListItem({data}) {
	const {isDarkMode} = useContext(DarkModeContext)
	return (
		<View style={styles.listItemWrapper}>
			<LinearGradient
				colors={isDarkMode ? ['hsl(0 0% 35%)', 'transparent', 'transparent'] : ['hsl(0 0% 100%)', 'transparent', 'transparent']}
				style={styles.borderGradient}
			/>
			<View style={[styles.details, {backgroundColor: isDarkMode ? "hsl(0 0% 25%)" : "hsl(0 0% 95%)"}]}>
				<Image
					style={styles.coverImage}
					source={{
						uri: `${data.img_url}`,
					}}
				/>
				<View>
					<Text style={[styles.textMedium, {color: isDarkMode ? 'hsl(45 15% 80%)' : 'hsl(45 5% 25%)'}]}>{data.name}</Text>
					<Text style={[styles.textMedium, {color: isDarkMode ? 'hsl(45 15% 80%)' : 'hsl(45 5% 25%)'}]}>{data.address}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	listItemWrapper: {
		position: "relative",
		width: "90%",
		paddingVertical: 16,
		alignSelf: "center",
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

	details: {
		display: "flex",
		flexDirection: "row",
		gap: 8,
		fontFamily: 'Urbanist_500Medium',
		fontSize: 16,
		padding: 8,
		borderRadius: 15,
		boxShadow: '0 5 5 0 rgba(0,0,0,0.2)',
	},

	coverImage: {
		width: 50,
		height: 50,
	},
});