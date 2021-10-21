import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';

import { CustomButton } from '../components/CustomButton';
import { DB } from '../../sglib.config';
import { THEME } from '../theme';

export type StackNavigatorParamsList = {
  StartScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
};

interface IProps {
  screenWrapper: ViewStyle;
  logoContainer: ViewStyle;
  authentificationContainer: ViewStyle;

  signInContainer: ViewStyle;
  signUpContainer: ViewStyle;
  signInButton: ViewStyle;
  signUpButton: ViewStyle;
  signUpButtonText: TextStyle;
  signInButtonText: TextStyle;

  logo: ImageStyle;
  image: ImageStyle;
  buttonStyle: ViewStyle;

  h1TextStyle: TextStyle;
  h2TextStyle: TextStyle;
  restorePasswordContainer: TextStyle;
  restorePasswordButton: TextStyle;
  restorePasswordButtonText: TextStyle;
}

type Style = {
  buttonStyle: ViewStyle;
  buttonTextStyle: TextStyle;
};

interface StartScreenProps {
  navigation: StackNavigationProp<StackNavigatorParamsList, 'StartScreen'>;
}

export const StartScreen: React.FC<StartScreenProps> = ({ navigation }) => {
  const navToScreen = (value: keyof StackNavigatorParamsList) => {
    navigation.navigate(value);
  };

  useEffect(() => {
    (async () => {
      // const result = await DB.getAllUsers();
      const result = await DB.users.getAllUsers();
      console.log(result);
    })();
  }, []);

  return (
    <View style={styles.screenWrapper}>
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
          <Text style={styles.h1TextStyle}> Welcome to Strange Places</Text>
          <Text style={styles.h2TextStyle}>
            Travel, discover and share amazing places around you
          </Text>

          <View style={styles.signInContainer}>
            <CustomButton
              buttonStyle={styles.buttonStyle}
              buttonTextStyle={styles.signInButtonText}
              buttonText={'Sign In'}
              onPressButtonValue={'SignInScreen'}
              onPressHandler={navToScreen}
              navButtonType={true}
            />
          </View>

          <View style={styles.signUpContainer}>
            <CustomButton
              buttonStyle={styles.signUpButton}
              buttonTextStyle={styles.signUpButtonText}
              buttonText={'Sign Up'}
              onPressButtonValue={'SignUpScreen'}
              onPressHandler={navToScreen}
              navButtonType={true}
            />
          </View>
          <View style={styles.restorePasswordContainer}>
            <CustomButton
              buttonStyle={styles.restorePasswordButton}
              buttonTextStyle={styles.restorePasswordButtonText}
              buttonText={'Restore password'}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create<IProps>({
  screenWrapper: {
    flex: 1,
  },
  logoContainer: {
    marginTop: 120,
    width: 140,
    height: 140,
    backgroundColor: THEME.whiteColor,
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
    backgroundColor: THEME.whiteColor,
    alignItems: 'center',
  },

  signInContainer: {
    width: '90%',
    marginTop: 30,
  },
  signUpContainer: {
    width: '90%',
  },
  signInButton: {
    backgroundColor: THEME.mainColor,
  },
  signUpButton: {
    marginTop: 10,
    backgroundColor: THEME.whiteColor,
  },
  signUpButtonText: {
    color: THEME.mainColor,
  },
  signInButtonText: {
    color: THEME.whiteColor,
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
  buttonStyle: {
    backgroundColor: THEME.mainColor,
  },
  h1TextStyle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  h2TextStyle: {
    color: 'black',
    fontSize: 18,
    lineHeight: 24,
    paddingTop: 10,
    textAlign: 'center',
  },
  restorePasswordContainer: {
    paddingTop: 12,
    width: 150,
  },
  restorePasswordButton: {
    textAlign: 'center',
    backgroundColor: THEME.whiteColor,
    borderColor: 'white',
    elevation: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 0,
    borderWidth: 0,
  },
  restorePasswordButtonText: {
    color: THEME.mainColor,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: 'normal',
  },
});
