import React, { createContext, useState, useContext } from 'react';

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState(true);

	const toggleDarkMode = () => {
		setIsDarkMode(prev => !prev)
	};

	return (
		<DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>
			{children}
		</DarkModeContext.Provider>
	);
}