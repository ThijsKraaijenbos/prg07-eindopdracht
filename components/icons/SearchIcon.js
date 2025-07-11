import {StyleSheet} from 'react-native';
import React, {useContext} from "react";
import {DarkModeContext} from "../../context/DarkModeContext";
import Svg, {Path} from "react-native-svg";
export default function SearchIcon({size, focused}) {
	const {isDarkMode} = useContext(DarkModeContext)
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24">
			<Path
				d="M21.07,16.83,19,14.71a3.08,3.08,0,0,0-3.4-.57l-.9-.9a7,7,0,1,0-1.41,1.41l.89.89A3,3,0,0,0,14.71,19l2.12,2.12a3,3,0,0,0,4.24,0A3,3,0,0,0,21.07,16.83Zm-8.48-4.24a5,5,0,1,1,0-7.08A5,5,0,0,1,12.59,12.59Zm7.07,7.07a1,1,0,0,1-1.42,0l-2.12-2.12a1,1,0,0,1,0-1.42,1,1,0,0,1,1.42,0l2.12,2.12A1,1,0,0,1,19.66,19.66Z"
				// fill={isDarkMode ? "hsl(0, 0%, 65%)" : "hsl(0, 0%, 50%)"}
				fill={isDarkMode ? focused ? "hsl(45, 100%, 80%)" : "hsl(0, 0%, 65%)" : focused ? "hsl(225, 30%, 40%)" : "hsl(0, 0%, 50%)"}
			/>
		</Svg>
	);
};