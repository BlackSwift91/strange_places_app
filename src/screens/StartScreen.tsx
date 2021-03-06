import React from 'react';
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

import { THEME } from '../theme';
import { StartScreenProps } from '../interfaces/INavigation';
import { useTranslation } from 'react-i18next';

import { CustomButton } from '../components/CustomButton';
import { ICustomButtonStyle } from '../interfaces/ICustomButtonStyle';

interface IProps {
  screenWrapper: ViewStyle;
  authentificationContainer: ViewStyle;
  logoContainer: ViewStyle;
  logo: ImageStyle;
  backgroundImage: ImageStyle;
  h1TextStyle: TextStyle;
  h2TextStyle: TextStyle;
}

export const StartScreen: React.FC<StartScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();

  const navToSignInScreen = () => {
    navigation.navigate('SignInScreen');
  };
  const navToSignUpScreen = () => {
    navigation.navigate('SignUpScreen');
  };

  const restorePassword = () => {
    console.log('restore password');
  };

  return (
    <View style={styles.screenWrapper}>
      <ImageBackground
        source={require('../images/StartScreenImg.jpg')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          translucent={true}
          hidden={false}
        />
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../images/logo_round.png')} />
        </View>
        <View style={styles.authentificationContainer}>
          <Text style={styles.h1TextStyle}>{t('startScreen.appGreeting')}</Text>
          <Text style={styles.h2TextStyle}>{t('startScreen.appDescription')}</Text>

          <View style={signInButtonStyle.buttonContainerStyle}>
            <CustomButton
              buttonStyle={signInButtonStyle.buttonStyle}
              buttonTextStyle={signInButtonStyle.buttonTextStyle}
              buttonText={t('startScreen.signInButton')}
              onPressHandler={navToSignInScreen}
            />
          </View>

          <View style={signUpButtonStyle.buttonContainerStyle}>
            <CustomButton
              buttonStyle={signUpButtonStyle.buttonStyle}
              buttonTextStyle={signUpButtonStyle.buttonTextStyle}
              buttonText={t('startScreen.signUpButton')}
              onPressHandler={navToSignUpScreen}
            />
          </View>
          <View style={restorePasswordContainer.buttonContainerStyle}>
            <CustomButton
              buttonStyle={restorePasswordContainer.buttonStyle}
              buttonTextStyle={restorePasswordContainer.buttonTextStyle}
              buttonText={t('startScreen.restorePasswordButton')}
              onPressHandler={restorePassword}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const signUpButtonStyle = StyleSheet.create<ICustomButtonStyle>({
  buttonContainerStyle: {
    width: '90%',
    marginTop: 10,
  },
  buttonStyle: {
    backgroundColor: THEME.WHITE_COLOR,
  },
  buttonTextStyle: {
    color: THEME.MAIN_COLOR,
  },
});

const signInButtonStyle = StyleSheet.create<ICustomButtonStyle>({
  buttonContainerStyle: {
    width: '90%',
    marginTop: 30,
  },
  buttonStyle: {
    backgroundColor: THEME.MAIN_COLOR,
  },
  buttonTextStyle: {
    color: THEME.WHITE_COLOR,
  },
});

const restorePasswordContainer = StyleSheet.create<ICustomButtonStyle>({
  buttonContainerStyle: {
    paddingTop: 12,
    width: 200,
  },
  buttonStyle: {
    textAlign: 'center',
    backgroundColor: THEME.WHITE_COLOR,
    borderColor: THEME.WHITE_COLOR,
    elevation: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 0,
    borderWidth: 0,
  },
  buttonTextStyle: {
    color: THEME.MAIN_COLOR,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: 'normal',
  },
});

const styles = StyleSheet.create<IProps>({
  screenWrapper: {
    flex: 1,
  },
  logoContainer: {
    marginTop: 120,
    width: 140,
    height: 140,
    backgroundColor: THEME.WHITE_COLOR,
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
    backgroundColor: THEME.WHITE_COLOR,
    alignItems: 'center',
  },
  logo: {
    width: 96,
    height: 96,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  h1TextStyle: {
    color: THEME.BLACK_COLOR,
    fontSize: 20,
    fontWeight: 'bold',
  },
  h2TextStyle: {
    color: THEME.BLACK_COLOR,
    fontSize: 18,
    lineHeight: 24,
    paddingTop: 10,
    textAlign: 'center',
  },
});
