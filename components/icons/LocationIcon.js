import {StyleSheet} from 'react-native';
import React, {useContext} from "react";
import {DarkModeContext} from "../../context/DarkModeContext";
import Svg, {Path} from "react-native-svg";
export default function LocationIcon({size}) {
	const {isDarkMode} = useContext(DarkModeContext)
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" className="d-none">
			<Path
				d="M12,2a8,8,0,0,0-8,8c0,5.4,7.05,11.5,7.35,11.76a1,1,0,0,0,1.3,0C13,21.5,20,15.4,20,10A8,8,0,0,0,12,2Zm0,17.65c-2.13-2-6-6.31-6-9.65a6,6,0,0,1,12,0C18,13.34,14.13,17.66,12,19.65ZM12,6a4,4,0,1,0,4,4A4,4,0,0,0,12,6Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,12Z"
				fill={isDarkMode ? 'hsl(45 100% 95%)' : 'hsl(45 10% 15%)'} className="color000 svgShape"/>
		</Svg>
	);
};