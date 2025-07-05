import {View, StyleSheet, ScrollView, Text, FlatList, Pressable} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import React, {useContext, useState} from "react";
import {DarkModeContext} from "../context/DarkModeContext";
import ListItem from "./ListItem";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
export default function ListContainer({data}) {
	const [toggled, setToggled] = useState(false)
	const {isDarkMode} = useContext(DarkModeContext)
	return (
		<View style={styles.listContainerWrapper}>
			<LinearGradient
				colors={isDarkMode ? ['hsl(0 0% 35%)', 'transparent', 'transparent'] : ['hsl(0 0% 100%)', 'transparent', 'transparent']}
				style={styles.borderGradient}
			/>
			<View style={[styles.listContainer, {backgroundColor: isDarkMode ? "hsl(0 0% 20%)" : "hsl(0 0% 90%)"}]}>
				{!data ? (
					<Text style={[styles.textMedium, {color: isDarkMode ? 'hsl(45 15% 80%)' : 'hsl(45 5% 25%)'}]}>Geen locaties gevonden</Text>
				) : (
					toggled ? (
							<Pressable onPress={() => setToggled(false)} style={styles.toggleButton}>
								<FontAwesome5Icon size={32} color={isDarkMode ? "hsl(45 100% 80%)" : "hsl(225 30% 40%)"} name={"chevron-up"}/>
							</Pressable>
						) : (
							<>
								<Pressable onPress={() => setToggled(true)} style={styles.toggleButton}>
									<FontAwesome5Icon size={32} color={isDarkMode ? "hsl(45 100% 80%)" : "hsl(225 30% 40%)"} name={"chevron-down"}/>
								</Pressable>
								<FlatList
									scrollEnabled={false}
									data={data}
									renderItem={({item}) => <ListItem data={item}/>}
									keyExtractor={item => item.id}
								/>
							</>
					)
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	textMedium: {
		fontFamily: 'Urbanist_500Medium',
		fontSize: 24,
		padding: 8,
		textAlign: "center"
	},

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
		paddingVertical: 8,
		// minHeight: 60,
		width: "100%",
		borderRadius: 15,
		boxShadow: '0 5 5 0 rgba(0,0,0,0.2)',
	},
	toggleButton: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "center",
	}
});