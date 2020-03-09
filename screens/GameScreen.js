import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert, ScrollView, FlatList} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import Card from '../components/Card.js';
import DefaultStyles from '../constants/default-styles.js';
import MainButton from '../components/MainButton.js';
import BodyText from '../components/BodyText.js';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude){
      return generateRandomBetween(min, max, exclude);
  } else {
     return rndNum;
  	}
}

const renderListItem = (listLength, itemData) => {
	return (
		<View key={itemData} style={styles.guessListItem}>
			<BodyText>#{listLength - itemData.index}</BodyText>
			<BodyText>{itemData.item}</BodyText>
		</View>
	);
}

const GameScreen = (props) => {
	const initialGuess = generateRandomBetween(1, 100, props.userChoice);

	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const {userChoice, onGameOver} = props;

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, userChoice, onGameOver]);
	
	const nextGuessHandler = (direction) => {
		if ((direction === 'lower' && currentGuess < props.userChoice) ||
		(direction === 'greater' && currentGuess > props.userChoice)) {
			Alert.alert('False information detected.', 'Be honest next time', [{text: 'Sorry', style: 'cancel'}]);
			return;
		}

		if (direction === 'lower') {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess +1;
		}

		const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
		//setRounds(currentRounds => currentRounds+1);
		setPastGuesses(currPastGuesses => [nextNumber.toString(), ...pastGuesses]);
	}

	return (
		<View style={styles.screen}>
			<Text style={DefaultStyles.title}>Opponent's guess: {currentGuess}</Text>
			<Card style={styles.buttonCard}>
				<MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
					<Ionicons name="md-remove" size={24} color="white"/>
				</MainButton>
				<MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
					<Ionicons name="md-add" size={24} color="white"/>
				</MainButton>
			</Card>
			<View style={styles.guessListContainer}>
				{/* <ScrollView contentContainerStyle={styles.guessList}>
					{pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
				</ScrollView> */}
				<FlatList 
					keyExtractor={(item) => item}
					data={pastGuesses} 
					renderItem={renderListItem.bind(this, pastGuesses.length)}
					contentContainerStyle={styles.guessList}
				/>
			</View>		
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		marginTop: 30,
		alignItems: 'center'
	},
	buttonCard: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		width: 300,
		maxWidth: '80%'
	},
	guessListContainer: {
		flex: 1,
		width: 250,
		maxWidth: '60%'
	},
	guessList: {
		flexGrow: 1,
		justifyContent: 'flex-end',
	},
	guessListItem: {
		borderColor: 'black',
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		width: '100%',
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});

export default GameScreen;