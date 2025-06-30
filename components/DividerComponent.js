import {View, StyleSheet, Dimensions} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const lineWidth = screenWidth * 0.7;
export default function DividerComponent() {
	return (
		<View style={styles.line} />
	);
};

const styles = StyleSheet.create({
	line: {
		height: 2,
		backgroundColor: 'hsl(0 0% 20%)',
		width: lineWidth,
		margin: 0,
		marginTop: 20,
		marginBottom: 8,
		borderRadius: 100
	}
});