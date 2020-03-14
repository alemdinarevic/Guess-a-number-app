import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, TouchableWithoutFeedback, 
		Keyboard, Alert, Dimensions} from 'react-native';

import Card from '../components/Card.js';
import Colors from '../constants/colors.js';
import Input from '../components/Input.js';
import BodyText from '../components/BodyText.js';
import MainButton from '../components/MainButton.js';

const StartGameScreen = (props) => {
	const [enteredValue, setEnteredValue] = useState('');
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState();
	
	const inputValueHandler = (enteredVal) => {
		setEnteredValue(enteredVal.replace(/[^0-9]/g, ''));
	}
	const resetInputHandler = () => {
		setEnteredValue('');
		setConfirmed(false);
	}
	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
			Alert.alert(
				'Invalid number!', 
				'Please enter a number between 1 and 99.', 
				[{text: 'OK', style: "destructive", onPress: resetInputHandler}]
			);
			return;
		}
		setConfirmed(true);
		setEnteredValue('');
		setSelectedNumber(chosenNumber);
		Keyboard.dismiss();
	}

	let confirmedOutput;
	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.confirmationText}>
				<BodyText>Confirmed number: {selectedNumber}</BodyText>
				<View style={styles.confirmationButton}>
					<MainButton onPress={() => props.onStartGame(selectedNumber)}>Start Game</MainButton>
				</View>
			</Card>
			);
	}

	return (
		<TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
			<View style={styles.screen}>
				<Text style={styles.titleText}>Start A New Game!</Text>
				<Card style={styles.inputContainer}>
					<BodyText>Select a number...</BodyText>
					<Input 
						style={styles.input} 
						keyboardType='number-pad' 
						maxLength={2}
						value={enteredValue}
						onChangeText={inputValueHandler}
					/>
					<View style={styles.buttonContainer}>
						<View style={styles.button}>
							<Button title="Reset" color={Colors.accent} onPress={resetInputHandler}/>
						</View>
						<View style={styles.button}>
							<Button title="Confirm" color={Colors.primary} onPress={confirmInputHandler}/>
						</View>
					</View>
				</Card>
				{confirmedOutput}
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'flex-start' //by default
	},
	titleText: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: 'open-sans-bold',
	},
	inputContainer: {
		width: '80%',
		//maxWidth: '95%',
		minWidth: 300,
		alignItems: 'center',
	},

	input: {
		width: 50,
		textAlign: 'center'
	},
	buttonContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	button: {
		width: Dimensions.get('window').width / 4,
	},
	confirmationText: {
		marginVertical: 20
	},
	confirmationButton: {
	}
});

export default StartGameScreen;