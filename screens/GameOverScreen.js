import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import TitleText from '../components/TitleText.js';
import BodyText from '../components/BodyText.js';
import Color from '../constants/colors.js';
import MainButton from '../components/MainButton.js';

const GameOverScreen = (props) => {
  return (
		<View style={styles.screen}>
			<TitleText>Game is Over!</TitleText>
			<View style={styles.imageContainer}>
				<Image 
					// source={require('../assets/images/success.png')} 
					source={{uri: "https://res.cloudinary.com/teepublic/image/private/s--C2CXMYkf--/t_Preview/b_rgb:6e2229,c_limit,f_jpg,h_630,q_90,w_630/v1560345157/production/designs/5050996_0.jpg"}} 
					style={styles.image} 
					resizeMode="cover"
				/>
			</View>
			<BodyText>Number of rounds: <Text style={styles.highlight}>{props.numberOfRounds}</Text></BodyText>
			<BodyText>The number was: <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>
			<MainButton onPress={props.onRestart}>New Game</MainButton>
		</View>
			
	);

}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
	},
	imageContainer: {
		marginVertical: 20,
		width: 300,
		height: 300,
		borderRadius: 150,
		borderWidth: 3,
		borderColor: 'black',
		overflow: 'hidden'
	},
	highlight: {
		color: Color.primary,
		fontFamily: 'open-sans-bold'

	}
});

export default GameOverScreen;