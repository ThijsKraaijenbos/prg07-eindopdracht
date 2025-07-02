import {View, StyleSheet, Dimensions} from 'react-native';
import {useContext} from "react";
import {DarkModeContext} from "../context/DarkModeContext";

const { width: screenWidth } = Dimensions.get('window');
const lineWidth = screenWidth * 0.7;
export default function DividerComponent() {
	const {isDarkMode} = useContext(DarkModeContext)
	return (
		<View style={[styles.line, {backgroundColor: isDarkMode ? 'hsl(0 0% 20%)' : 'hsl(0 0% 80%)' }]} />
	);
};

const styles = StyleSheet.create({
	line: {
		height: 2,
		width: lineWidth,
		margin: 0,
		marginTop: 20,
		alignSelf:"center",
		marginBottom: 8,
		borderRadius: 100
	}
});