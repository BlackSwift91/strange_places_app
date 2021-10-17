import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';

import { CustomButton } from '../components/CustomButton';

type StackNavigatorParamsList = {
  StartScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
};

interface StartProps {
  navigation: StackNavigationProp<StackNavigatorParamsList, 'StartScreen'>
}


export const StartScreen: React.FC<StartProps> = ({ navigation }) => {
  function navToScreen(value: string) {
    navigation.navigate(value);
  }

  return (
    <View style={styles.center}>
      <ImageBackground
        source={require('../images/StartScreenImg.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          translucent={true}
          hidden={false}
        />
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../images/logo_round.png')}
          />
        </View>
        <View style={styles.authentificationContainer}>
          <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
            Welcome to Strange Places
          </Text>
          <Text
            style={{ color: 'black', fontSize: 18, lineHeight: 24, paddingTop: 10, textAlign: 'center' }}>
            Travel, discover and share amazing places around you
          </Text>
          <CustomButton
            buttonStyle={styles.signInButton}
            buttonText={'Sign In'}
            onPressButtonValue={'SignInScreen'}
            onPressHandler={navToScreen}
          />
          <CustomButton
            buttonStyle={styles.signUpButton}
            buttonTextStyle={styles.signUpButtonText}
            buttonText={'Sign Up'}
            onPressButtonValue={'SignInScreen'}
            onPressHandler={navToScreen}
          />
          <Text
            style={{ color: '#0071bc', fontSize: 16, lineHeight: 24, paddingTop: 15, textAlign: 'center', }}>
            Restore password
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
  },
  logoContainer: {
    marginTop: 120,
    width: 140,
    height: 140,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
  authentificationContainer: {
    marginBottom: 40,
    width: '85%',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  signInButton: {
    marginTop: 30,
  },
  signUpButton: {
    marginTop: 10,
    backgroundColor: '#ffffff',
  },
  signUpButtonText: {
    color: '#0071bc',
  },
  logo: {
    width: 96,
    height: 96,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
