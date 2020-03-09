import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import  { AppLoading } from 'expo';

import Header from './components/Header.js';
import StartGameScreen from './screens/StartGameScreen.js';
import GameScreen from './screens/GameScreen.js';
import GameOverScreen from './screens/GameOverScreen.js';


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'), 
  });
}

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  }

  const gameOverHandler = (numberOfRounds) => {
    setGuessRounds(numberOfRounds);
  }

  const newGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  let currentScreen = <StartGameScreen onStartGame={startGameHandler}/>;

  if (userNumber && guessRounds <= 0) {
    currentScreen = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>;
  } else if (guessRounds > 0) {
      currentScreen = 
      <GameOverScreen 
        numberOfRounds={guessRounds} 
        userNumber={userNumber} 
        onRestart={newGameHandler}
      />
  }
  return (
    <View style={styles.screen}>
      <Header title="Guess A Number"/>
      {currentScreen}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});
