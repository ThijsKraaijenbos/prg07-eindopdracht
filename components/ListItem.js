import {View, StyleSheet, ScrollView, Text, Image} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import React, {useContext} from "react";
import {DarkModeContext} from "../context/DarkModeContext";
import Svg, {Path} from "react-native-svg";
import LocationIcon from "./icons/LocationIcon";
import Tag from "./Tag";
import StarIcon from "./icons/StarIcon";
import TagIcon from "./icons/TagIcon";
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
				<View style={styles.detailContainer}>
					{/*Location pin*/}
					<View style={styles.detailWrapper}>
						<LocationIcon size={24}/>
						<Text style={[styles.infoText, styles.textMedium, {color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'}]}>{data.address}</Text>
					</View>

					{/*Star*/}
					<View style={styles.detailWrapper}>
						<StarIcon size={24}/>
						<Text style={[styles.infoText, styles.textMedium, {color: isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'}]}>{data.star_count}</Text>
					</View>

					{/*Tag*/}
					<View style={styles.detailWrapper}>
						<TagIcon size={24}/>
						{data.tags.map((item, index) =>
							<Tag key={index} size={12}>{item.tag_name}</Tag>
						)}
					</View>
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

	details: {
		display: "flex",
		flexDirection: "row",
		fontFamily: 'Urbanist_500Medium',
		fontSize: 16,
		padding: 8,
		borderRadius: 15,
		boxShadow: '0 5 5 0 rgba(0,0,0,0.2)',
		margin: 0,
		alignItems: "center"
	},

	coverImage: {
		width: 100,
		height: 80,
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
});