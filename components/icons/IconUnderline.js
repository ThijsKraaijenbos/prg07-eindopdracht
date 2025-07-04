import {View} from 'react-native';
import React, {useContext} from "react";
import {DarkModeContext} from "../../context/DarkModeContext";

export default function IconUnderline({focused}) {
	const {isDarkMode} = useContext(DarkModeContext)
	return (
		<View
			style={{
				marginTop: 1,
				height: 4,
				width: 32,
				backgroundColor: isDarkMode ? "hsl(45, 100%, 80%)" : "hsl(225, 30%, 40%)",
				borderRadius: 2,
				opacity: focused ? 1 : 0,
			}}
		/>
	);
};