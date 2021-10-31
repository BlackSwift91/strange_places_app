import React, { useState, useRef, useEffect } from 'react';
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
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { setAllUserData, setIsNewUser } from '../store/actions/actions';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { THEME } from '../theme';
import { CustomButton } from '../components/CustomButton';
import { AlertText } from '../components/AlertText';
import { ISignInScreenProps } from '../interfaces/INavigation';

interface IProps {
  screenContainer: ViewStyle;
  backgroundImage: ImageStyle;
  authentificationContainer: ImageStyle;
  userLoginTextInputContainer: ViewStyle;
  userPasswordTextInputContainer: ViewStyle;
}

interface ICustomButtonStyle {
  buttonContainerStyle: ViewStyle;
  buttonStyle: ViewStyle;
  buttonTextStyle: TextStyle;
}

interface ItextInputStyle {
  insideWrapper: ViewStyle;
  imageContainer: ViewStyle;
  textInput: ViewStyle;
  alertStyle?: ViewStyle;
}

export interface IUser {
  _id: string;
  about_user: string;
  avatar_url: string;
  first_name: string;
  last_name: string;
  location: {
    city: string;
    country: string;
  };
  user_id: string;
  user_name: string;
}

export const SignInScreen: React.FC<ISignInScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const userNameInputRef = useRef<TextInput>(null);
  const userPasswordInputRef = useRef<TextInput>(null);
  const [userLogin, setUserLogin] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);

  const [errorDescription, setErrorDescription] = useState<string>('');
  const [loginError, setLoginError] = useState<Boolean>(false);
  const [passwordError, setPasswordError] = useState<Boolean>(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(setIsNewUser(false));
    }
  }, [dispatch, isFocused]);

  const test = () => {
    if (userPassword === '') {
      formValidation();
      return;
    }
    formValidation();
    const user: IUser[] = [];
    auth()
      .signInWithEmailAndPassword(userLogin, userPassword)
      .then(result => {
        console.log('User account created & signed in!');
        console.log(result.user.uid);
        setPasswordError(false);
        setLoginError(false);
        changeErrorDescription('');

        firestore()
          .collection('users')
          .where('user_id', '==', `${result.user.uid}`)
          .get()

          .then(response => {
            console.log(response);
            response.forEach((doc: any) => {
              user.push({ ...doc.data(), _id: doc.id });
            });
            const location = {
              city: user[0].location.city,
              country: user[0].location.country,
            };
            dispatch(
              setAllUserData(
                user[0].user_id,
                user[0]._id,
                user[0].user_name,
                user[0].first_name,
                user[0].last_name,
                user[0].about_user,
                user[0].avatar_url,
                location,
              ),
            );
          });
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          console.log('That email address is invalid!');
          changeErrorDescription('This email address is invalid!');

          setLoginError(true);
        } else if (error.code === 'auth/wrong-password') {
          setLoginError(false);
          setPasswordError(true);
          changeErrorDescription('Wrong password!');
          // navigation.navigate('SignUpProfileScreen');
        }
      });
  };

  const navToSignUpScreen = async () => {
    await Keyboard.dismiss();
    navigation.navigate('SignUpScreen');
  };

  const changeErrorDescription = (error: string) => {
    setErrorDescription(error);
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
          <View style={styles.userLoginTextInputContainer}>
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
                placeholder="User Name"
                style={textInputStyle.textInput}
                onChangeText={val => setUserLogin(val)}
                value={userLogin}
                onSubmitEditing={() => {
                  userPasswordInputRef.current?.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
          </View>

          <View style={styles.userPasswordTextInputContainer}>
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
                onChangeText={val => setUserPassword(val)}
                value={userPassword}
                ref={userPasswordInputRef}
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
          <View style={signInButtonStyle.buttonContainerStyle}>
            <CustomButton
              buttonStyle={signInButtonStyle.buttonStyle}
              buttonTextStyle={signInButtonStyle.buttonTextStyle}
              buttonText={'Sign In'}
              onPressHandler={test}
            />
          </View>
          <View style={restorePasswordButtonStyle.buttonContainerStyle}>
            <CustomButton
              buttonStyle={restorePasswordButtonStyle.buttonStyle}
              buttonTextStyle={restorePasswordButtonStyle.buttonTextStyle}
              buttonText={'Restore password'}
              onPressHandler={test}
            />
          </View>
          <View style={signUpButtonStyle.buttonContainerStyle}>
            <CustomButton
              buttonStyle={signUpButtonStyle.buttonStyle}
              buttonTextStyle={signUpButtonStyle.buttonTextStyle}
              buttonText={'Sign Up'}
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
    bottom: 0,
    left: 0,
    right: 0,
  },
  authentificationContainer: {
    marginTop: 430,
    width: '85%',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  userLoginTextInputContainer: {
    width: '90%',
    marginTop: 10,
    flexDirection: 'row',
  },
  userPasswordTextInputContainer: {
    width: '90%',
    marginTop: 10,
    flexDirection: 'row',
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

const signInButtonStyle = StyleSheet.create<ICustomButtonStyle>({
  buttonContainerStyle: {
    width: '90%',
    marginTop: 20,
  },
  buttonStyle: {
    backgroundColor: THEME.mainColor,
  },
  buttonTextStyle: {
    color: THEME.whiteColor,
  },
});

const signUpButtonStyle = StyleSheet.create<ICustomButtonStyle>({
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
