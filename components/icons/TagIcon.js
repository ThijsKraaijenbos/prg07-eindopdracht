import {StyleSheet} from 'react-native';
import React, {useContext} from "react";
import {DarkModeContext} from "../../context/DarkModeContext";
import Svg, {Path} from "react-native-svg";
export default function TagIcon({size}) {
	const {isDarkMode} = useContext(DarkModeContext)
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" className="d-none">
			<Path
				d="M7.5,6A1.5,1.5,0,1,0,9,7.5,1.5,1.5,0,0,0,7.5,6Zm13.62,4.71L12.71,2.29A1,1,0,0,0,12,2H3A1,1,0,0,0,2,3v9a1,1,0,0,0,.29.71l8.42,8.41a3,3,0,0,0,4.24,0L21.12,15a3,3,0,0,0,0-4.24Zm-1.41,2.82h0l-6.18,6.17a1,1,0,0,1-1.41,0L4,11.59V4h7.59l8.12,8.12a1,1,0,0,1,.29.71A1,1,0,0,1,19.71,13.53Z"
				fill={isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'} className="color000 svgShape"/>
		</Svg>
	);
};