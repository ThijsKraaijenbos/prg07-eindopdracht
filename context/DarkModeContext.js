import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState(true);

	useEffect(() => {
		const loadSavedPreference = async () => {
			try {
				const value = await AsyncStorage.getItem('darkMode');
				if (value !== null) {
					setIsDarkMode(JSON.parse(value));
				}
			} catch (e) {
				console.error('Failed to load dark mode from storage', e);
			}
		};

		loadSavedPreference();
	}, []);

	const toggleDarkMode = async () => {
		await AsyncStorage.setItem('darkMode', (!isDarkMode).toString());
		setIsDarkMode(prev => !prev)
	};

	return (
		<DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>
			{children}
		</DarkModeContext.Provider>
	);
}