import {View, StyleSheet, Text, Image, Pressable} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import React, {useContext} from "react";
import {DarkModeContext} from "../context/DarkModeContext";
import LocationIcon from "./icons/LocationIcon";
import Tag from "./Tag";
import StarIcon from "./icons/StarIcon";
import TagIcon from "./icons/TagIcon";
import {useNavigation} from "@react-navigation/native";
export default function ListItem({data}) {
	const { id } = data
	const {isDarkMode} = useContext(DarkModeContext)
	const navigation = useNavigation()
	return (
		<Pressable onPress={() => navigation.navigate('Detail', { id })} style={styles.listItemWrapper}>
			<LinearGradient
				colors={isDarkMode ? ['hsl(0 0% 35%)', 'transparent', 'transparent'] : ['hsl(0 0% 100%)', 'transparent', 'transparent']}
				style={styles.borderGradient}
			/>
			<View style={[styles.detailsContainer, {backgroundColor: isDarkMode ? "hsl(0 0% 25%)" : "hsl(0 0% 95%)"}]}>
				<Text
					style={[styles.heading, {color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'}]}
				>{data.name}</Text>
				<View style={[styles.line, {backgroundColor: isDarkMode ? 'hsl(0 0% 30%)' : 'hsl(0 0% 80%)' }]} />
				<View style={styles.details}>
					<Image
						style={styles.coverImage}
						source={{
							uri: `${data.img_url}`,
						}}
					/>
					<View style={styles.detailContainer}>

						{/*Location pin*/}
						<View style={styles.detailWrapper}>
							<LocationIcon size={16}/>
							<Text style={[styles.infoText, styles.text, {color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'}]}>{data.address}</Text>
						</View>

						{/*Star*/}
						<View style={styles.detailWrapper}>
							<StarIcon size={16}/>
							<Text style={[styles.infoText, styles.text, {color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'}]}>{data.star_count}</Text>
						</View>

						{/*Tag*/}
						<View style={styles.detailWrapper}>
							<TagIcon size={16}/>
							{data.tags.map((item, index) =>
								<Tag key={index} size={12} listItem={true}>{item.tag_name}</Tag>
							)}
						</View>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	listItemWrapper: {
		position: "relative",
		paddingVertical: 16,
		width: "90%",
		alignSelf: "center",
		margin: -8 //had to add this here because the padding causes insanely wonky behavior and for some reason adds a margin as well
	},

	borderGradient: {
		position: 'absolute',
		top: 14,
		left: -2,
		right: -2,
		bottom: 0,
		borderRadius: 15,
		zIndex: 0,
		margin: 0,
	},

	line: {
		height: 2,
		width: "90%",
		margin: 0,
		marginVertical: 8,
		alignSelf:"center",
		borderRadius: 100
	},

	detailsContainer: {
		display: "flex",
		flexDirection: "column",
		fontFamily: 'Urbanist_500Medium',
		paddingTop: 8,
		padding: 12,
		borderRadius: 15,
		boxShadow: '0 5 5 0 rgba(0,0,0,0.2)',
		margin: 0,

	},
	details: {
		display: "flex",
		flexDirection: "row",
	},

	coverImage: {
		width: 120,
		height: "auto",
		borderRadius: 8,
		boxShadow: '0 5 5 0 rgba(0,0,0,0.2)',
	},

	detailWrapper: {
		display: "flex",
		flexDirection: "row",
		marginBottom: 4,
		alignItems: "center"
	},
	detailContainer: {
		display: "flex",
		position: "relative",
		flexDirection: "column",
		marginLeft: 8,
		width: "50%"
	},
	infoText: {
		marginLeft: 4,
	},
	heading: {
		fontFamily: 'Urbanist_600SemiBold',
		fontSize: 20,
		textAlign: "center"
	},
	text: {
		fontFamily: 'Urbanist_500Medium',
		fontSize: 16
	},
});