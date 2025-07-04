import {View, StyleSheet, TextInput} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import React, {useContext} from "react";
import Svg, {Path} from "react-native-svg";
import {DarkModeContext} from "../context/DarkModeContext";
export default function InputField({placeholderText, children, onChange, value}) {
	const {isDarkMode} = useContext(DarkModeContext)
	return (
		<View style={styles.inputFieldWrapper}>

			<View style={[styles.inputContainer, {backgroundColor: isDarkMode ? 'hsl(0 0% 20%)' : 'hsl(0 0% 90%)'}]}>
				<LinearGradient
					colors={isDarkMode ? ['hsl(0 0% 35%)', 'transparent', 'transparent'] : ['hsl(0 0% 100%)', 'transparent', 'transparent']}
					style={styles.borderGradient}
				/>
				{children}
				<TextInput
					value={value}
					style={[styles.input, {color: isDarkMode ? 'hsl(45 15% 80%)' : 'hsl(45 5% 25%)'}]}
					onChangeText={onChange}
					placeholder={placeholderText}
					placeholderTextColor={isDarkMode ? 'hsl(45 15% 80%)' : 'hsl(45 5% 25%)'}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	inputFieldWrapper: {
		position: "relative",
		width: "100%",
	},

	inputContainer: {
		display: "flex",
		flexDirection:"row",
		alignItems: "center",
		borderRadius: 100,
		paddingRight: 12,
		paddingLeft: 4,
		marginTop: 8,
		width: "65%"
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

	input: {
		fontFamily: 'Urbanist_500Medium',
		fontSize: 16,
		height: 40,
		padding: 10,
		zIndex: 1,
		width: "100%",
	},
});