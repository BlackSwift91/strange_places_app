import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  TextInput,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

import { THEME } from '../theme';
import { CustomButton } from '../components/CustomButton';
import { AlertText } from '../components/AlertText';

import { DB } from '../../sglib.config';
import { setUniqueUserId } from '../store/actions/actions';

import { AuthStackNavigatorParamsList } from '../interfaces/INavigation';

interface IProps {
  screenContainer: ViewStyle;
  backgroundImage: ImageStyle;
  authentificationContainer: ImageStyle;
  loginTextInputWrapper: ViewStyle;
  passwordTextInputWrapper: ViewStyle;
}

interface ItextInputStyle {
  insideWrapper: ViewStyle;
  imageContainer: ViewStyle;
  textInput: ViewStyle;
  alertStyle?: ViewStyle;
}

interface ICustomButtonStyle {
  buttonContainerStyle: ViewStyle;
  buttonStyle: ViewStyle;
  buttonTextStyle: TextStyle;
}

interface SignInScreenProps {
  navigation: StackNavigationProp<AuthStackNavigatorParamsList, 'SignInScreen'>;
}

export const SignUpScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const userNameInputRef = useRef<TextInput>(null);
  const userPasswordInputRef = useRef<TextInput>(null);
  const userRepeatPasswordInputRef = useRef<TextInput>(null);

  const [userLogin, setUserLogin] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [userRepeatedPassword, setUserRepeatedPassword] = useState<string | undefined>(undefined);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);

  const [errorDescription, setErrorDescription] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [loginError, setLoginError] = useState<Boolean>(false);
  const [passwordError, setPasswordError] = useState<Boolean>(false);
  // const [error, setError] = useState<Boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const result = await DB.users.getAllUsers();
      console.log(result);
    })();
  }, []);

  useEffect(() => {
    dispatch(setUniqueUserId(userId));
  }, [dispatch, userId]);

  // const userDocument = await firestore().collection('users').get();
  // console.log('my da', userDocument._changes);
  const userSignUp = async () => {
    // if (userPassword === '') {
    //   formValidation();
    //   return;
    // }
    setLoginError(false);
    changeErrorDescription(' ');

    auth()
      .signInWithEmailAndPassword('test4@gmail.com', '11111111')
      .then(res => {
        setUserId(res.user.uid);
      })
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('SignUpProfileScreen');
      })
      .catch(error => {
        console.log(error);
      });

    // .createUserWithEmailAndPassword('test4@gmail.com', userPassword)
    //  
    // .then(() => {
    //   console.log('User account created & signed in!');
    // })
    // .catch(error => {
    //   if (error.code === 'auth/email-already-in-use') {
    //     setLoginError(true);
    //     changeErrorDescription('This email address is already in use!');
    //     navigation.navigate('SignUpProfileScreen');
    //   }
    //   if (error.code === 'auth/invalid-email') {
    //     // console.log('That email address is invalid!');
    //     setLoginError(true);
    //     changeErrorDescription('This email address is invalid!');
    //   }
    //   console.log(error);
    // });
  };

  const changeErrorDescription = (error: string) => {
    setErrorDescription(error);
  };

  const navToSignUpScreen = async () => {
    await Keyboard.dismiss();
    navigation.navigate('SignInScreen');
  };

  const formValidation = () => {
    if (userLogin === '') {
      setLoginError(true);
      changeErrorDescription('Please input youl email');
      return;
    } else if (userLogin !== '') {
      setLoginError(false);
      changeErrorDescription('');
    }
    if (userPassword.length < 6) {
      setPasswordError(true);
      changeErrorDescription('The password must be at least six symbols');
    } else {
      setPasswordError(false);
      changeErrorDescription('');
      if (userRepeatedPassword === undefined) {
        return;
      } else if (userRepeatedPassword !== '') {
        if (userPassword === userRepeatedPassword) {
          setPasswordError(false);
          changeErrorDescription('');
        } else {
          setPasswordError(true);
          changeErrorDescription('Passwords must be equal');
        }
      } else {
        setPasswordError(false);
        changeErrorDescription('');
      }
    }
  };

  return (
    <View style={styles.screenContainer}>
      <ImageBackground
        source={require('../images/StartScreenImg2.jpg')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          translucent={true}
          hidden={false}
        />
        <View style={styles.authentificationContainer}>
          <View style={styles.loginTextInputWrapper}>
            <View
              style={
                loginError
                  ? {
                    ...textInputStyle.insideWrapper,
                    ...textInputStyle.alertStyle,
                  }
                  : textInputStyle.insideWrapper
              }>
              <View style={textInputStyle.imageContainer}>
                <MaterialCommunityIcons name="account" color={THEME.darkGray} size={24} />
              </View>
              <TextInput
                ref={userNameInputRef}
                returnKeyType="next"
                maxLength={30}
                autoCapitalize="none"
                placeholder="Login"
                style={textInputStyle.textInput}
                onChangeText={val => setUserLogin(val)}
                value={userLogin}
                onSubmitEditing={() => {
                  formValidation();
                  userPasswordInputRef.current?.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
          </View>

          <View style={styles.passwordTextInputWrapper}>
            <View
              style={
                passwordError
                  ? {
                    ...textInputStyle.insideWrapper,
                    ...textInputStyle.alertStyle,
                  }
                  : textInputStyle.insideWrapper
              }>
              <View style={textInputStyle.imageContainer}>
                <MaterialCommunityIcons name="lock" color={THEME.darkGray} size={24} />
              </View>
              <TextInput
                autoCapitalize="none"
                secureTextEntry={passwordVisible}
                placeholder="Password"
                style={textInputStyle.textInput}
                onChangeText={val => setUserPassword(val.trim())}
                value={userPassword}
                returnKeyType="next"
                ref={userPasswordInputRef}
                onEndEditing={() => formValidation()}
                onSubmitEditing={() => {
                  userRepeatPasswordInputRef.current?.focus();
                }}
                blurOnSubmit={false}
              />
              <TouchableOpacity
                style={textInputStyle.imageContainer}
                onPress={() => setPasswordVisible(prev => !prev)}>
                <MaterialCommunityIcons name="eye" color={THEME.darkGray} size={24} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.passwordTextInputWrapper}>
            <View
              style={
                passwordError
                  ? {
                    ...textInputStyle.insideWrapper,
                    ...textInputStyle.alertStyle,
                  }
                  : textInputStyle.insideWrapper
              }>
              <View style={textInputStyle.imageContainer}>
                <MaterialCommunityIcons name="lock" color={THEME.darkGray} size={24} />
              </View>
              <TextInput
                autoCapitalize="none"
                secureTextEntry={passwordVisible}
                placeholder="Repeat Password"
                style={textInputStyle.textInput}
                onChangeText={val => setUserRepeatedPassword(val.trim())}
                value={userRepeatedPassword}
                ref={userRepeatPasswordInputRef}
                onEndEditing={() => formValidation()}
              />

              <TouchableOpacity
                style={textInputStyle.imageContainer}
                onPress={() => setPasswordVisible(prev => !prev)}>
                <MaterialCommunityIcons name="eye" color={THEME.darkGray} size={24} />
              </TouchableOpacity>
            </View>
          </View>
          <AlertText text={errorDescription} />
          <View style={signUpButtonStyle.buttonContainerStyle}>
            <CustomButton
              buttonStyle={signUpButtonStyle.buttonStyle}
              buttonTextStyle={signUpButtonStyle.buttonTextStyle}
              buttonText={'Sign Up'}
              onPressHandler={userSignUp}
              disabled={passwordError ? true : false}
            />
          </View>
          <View style={restorePasswordButtonStyle.buttonContainerStyle}>
            <CustomButton
              buttonStyle={restorePasswordButtonStyle.buttonStyle}
              buttonTextStyle={restorePasswordButtonStyle.buttonTextStyle}
              buttonText={'Restore password'}
              onPressHandler={userSignUp}
            />
          </View>
          <View style={signInButtonStyle.buttonContainerStyle}>
            <CustomButton
              buttonStyle={signInButtonStyle.buttonStyle}
              buttonTextStyle={signInButtonStyle.buttonTextStyle}
              buttonText={'Sign In'}
              onPressHandler={navToSignUpScreen}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create<IProps>({
  screenContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    height: Dimensions.get('window').height + Number(StatusBar.currentHeight),
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  authentificationContainer: {
    marginTop: 220,
    width: '85%',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  passwordTextInputWrapper: {
    width: '90%',
    marginTop: 10,
    flexDirection: 'row',
  },
  loginTextInputWrapper: {
    width: '90%',
    marginTop: 10,
    flexDirection: 'row',
  },
});

const signUpButtonStyle = StyleSheet.create<ICustomButtonStyle>({
  buttonContainerStyle: {
    width: '90%',
    marginTop: 10,
  },
  buttonStyle: {
    backgroundColor: THEME.mainColor,
  },
  buttonTextStyle: {
    color: THEME.whiteColor,
  },
});

const signInButtonStyle = StyleSheet.create<ICustomButtonStyle>({
  buttonContainerStyle: {
    paddingTop: 12,
    width: 150,
  },
  buttonStyle: {
    textAlign: 'center',
    backgroundColor: THEME.whiteColor,
    borderColor: 'white',
    elevation: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 0,
    borderWidth: 0,
  },
  buttonTextStyle: {
    color: THEME.mainColor,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: 'normal',
  },
});

const textInputStyle = StyleSheet.create<ItextInputStyle>({
  insideWrapper: {
    borderRadius: 10,
    borderColor: THEME.lightGray,
    borderWidth: 1,
    backgroundColor: THEME.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  imageContainer: {
    paddingHorizontal: 5,
  },
  textInput: {
    alignSelf: 'flex-start',
    flexGrow: 1,
    flexShrink: 1,
  },
  alertStyle: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderColor: 'red',
    borderWidth: 1,
  },
});

const restorePasswordButtonStyle = StyleSheet.create<ICustomButtonStyle>({
  buttonContainerStyle: {
    paddingTop: 15,
    width: 150,
  },
  buttonStyle: {
    textAlign: 'center',
    backgroundColor: THEME.whiteColor,
    borderColor: 'white',
    elevation: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 0,
    borderWidth: 0,
  },
  buttonTextStyle: {
    color: THEME.mainColor,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: 'normal',
  },
});

// useEffect(() => {
//   userNameInputRef.current?.focus();
// }, []);
// useEffect(() => {
//   dispatch(userNameChangeInput(userLogin));
// }, [dispatch, userName]);
