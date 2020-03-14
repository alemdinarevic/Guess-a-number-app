import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';

import Colors from '../constants/colors.js';
import TitleText from '../components/TitleText.js';


const Header = (props) => {

    return (
    	<View style={styles.headerContainer}>
        <TitleText style={styles.headerTitle}>{props.title}</TitleText>
			</View>
		);
}

const styles = StyleSheet.create({
	headerContainer: {
    backgroundColor: Colors.primary,
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: Platform.OS === "ios" ? 'black' : 'grey'
  }, 
  headerTitle: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'open-sans-bold',
    color: 'white'
  }
});

export default Header;