import React from 'react';
import {View, Text, StyleSheet, Image, 
				Dimensions, ScrollView} from 'react-native';

import TitleText from '../components/TitleText.js';
import BodyText from '../components/BodyText.js';
import Color from '../constants/colors.js';
import MainButton from '../components/MainButton.js';

const GameOverScreen = (props) => {
  return (
			<ScrollView>
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
					<BodyText>Your phone needed <Text style={styles.highlight}>{props.numberOfRounds}</Text> rounds.</BodyText>
					<BodyText>The number was: <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>
					<MainButton style={styles.newGameButton} onPress={props.onRestart}>New Game</MainButton>
				</View>
			</ScrollView>	
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: Dimensions.get('window').height * 0.05
	},
	image: {
		width: '100%',
		height: '100%',
	},
	imageContainer: {
		marginVertical: Dimensions.get('window').height * 0.05,
		width: Dimensions.get('window').width * 0.7,
		height: Dimensions.get('window').width * 0.7,
		borderRadius: Dimensions.get('window').width * 0.7 / 2,
		borderWidth: 3,
		borderColor: 'black',
		overflow: 'hidden'
	},
	highlight: {
		color: Color.primary,
		fontFamily: 'open-sans-bold',
	},
	newGameButton: {
		marginTop: Dimensions.get('window').height * 0.025
	}
});

export default GameOverScreen;