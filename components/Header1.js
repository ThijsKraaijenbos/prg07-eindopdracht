import React from 'react';
import {Text} from 'react-native';

export default function H1({ children }) {
	return (
		<Text style={{fontWeight: 'bold', fontSize: 20}}>{children}</Text>
	);
};
