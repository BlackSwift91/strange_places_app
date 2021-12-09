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
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { THEME } from '../theme';
import { CustomButton } from '../components/CustomButton';
import { ICustomButtonStyle } from '../interfaces/ICustomButtonStyle';
import { ItextInputStyle } from '../interfaces/ItextInputStyle';
import { setAllUserData, setIsNewUser } from '../store/actions/actions';
import { AlertText } from '../components/AlertText';
import { ISignInScreenProps } from '../interfaces/INavigation';

interface IProps {
  screenContainer: ViewStyle;
  backgroundImage: ImageStyle;
  authentificationContainer: ImageStyle;
  userLoginTextInputContainer: ViewStyle;
  userPasswordTextInputContainer: ViewStyle;
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
  const userNameInputRef = useRef<TextInput>(null);
  const userPasswordInputRef = useRef<TextInput>(null);
  const [userLogin, setUserLogin] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);

  const [errorDescription, setErrorDescription] = useState<string>('');
  const [loginError, setLoginError] = useState<Boolean>(false);
  const [passwordError, setPasswordError] = useState<Boolean>(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(setIsNewUser(false));
    }
  }, [dispatch, isFocused]);

  const userSignIn = () => {
    if (userPassword === '') {
      formValidation();
      return;
    }
    formValidation();
    const user: IUser[] = [];
    auth()
      .signInWithEmailAndPassword(userLogin, userPassword)
      .then(result => {
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
        if (error.code === 'auth/invalid-email') {
          changeErrorDescription(t('signInScreen.homeScreen'));
          setLoginError(true);
        } else if (error.code === 'auth/user-not-found') {
          changeErrorDescription(t('signInScreen.alertUserNotFound'));
          setLoginError(true);
        } else if (error.code === 'auth/wrong-password') {
          setLoginError(false);
          setPasswordError(true);
          changeErrorDescription(t('signInScreen.alertWrongPassword'));
        }
      });
  };

  const restorePassword = () => {
    console.log('restore password');
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
      changeErrorDescription(t('signInScreen.alertInputEmail'));
      return;
    } else if (userLogin !== '') {
      setLoginError(false);
      changeErrorDescription('');
    }
    if (userPassword.length < 6) {
      setPasswordError(true);
      changeErrorDescription(t('signInScreen.alertPasswordLength'));
    } else {
      setPasswordError(false);
      changeErrorDescription('');
    }
  };

  return (
    <View style={styles.screenContainer}>
      <ImageBackground
        source={require('../images/sign_in_screen.jpg')}
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
                <MaterialCommunityIcons name="account" color={THEME.DARK_GRAY_COLOR} size={24} />
              </View>
              <TextInput
                ref={userNameInputRef}
                returnKeyType="next"
                maxLength={30}
                autoCapitalize="none"
                placeholder={t('signInScreen.textInputUserEmail')}
                placeholderTextColor={THEME.DARK_GRAY_COLOR}
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
                <MaterialCommunityIcons name="lock" color={THEME.DARK_GRAY_COLOR} size={24} />
              </View>
              <TextInput
                autoCapitalize="none"
                secureTextEntry={passwordVisible}
                placeholder={t('signInScreen.textInputPassword')}
                placeholderTextColor={THEME.DARK_GRAY_COLOR}
                style={textInputStyle.textInput}
                onChangeText={val => setUserPassword(val)}
                value={userPassword}
                ref={userPasswordInputRef}
                onEndEditing={() => formValidation()}
              />
              <TouchableOpacity
                style={textInputStyle.imageContainer}
                onPress={() => setPasswordVisible(prev => !prev)}>
                <MaterialCommunityIcons name="eye" color={THEME.DARK_GRAY_COLOR} size={24} />
              </TouchableOpacity>
            </View>
          </View>
          <AlertText text={errorDescription} />
          <View style={signInButtonStyle.buttonContainerStyle}>
            <CustomButton
              buttonStyle={signInButtonStyle.buttonStyle}
              buttonTextStyle={signInButtonStyle.buttonTextStyle}
              buttonText={t('signInScreen.signIn')}
              onPressHandler={userSignIn}
            />
          </View>
          <View style={restorePasswordButtonStyle.buttonContainerStyle}>
            <CustomButton
              buttonStyle={restorePasswordButtonStyle.buttonStyle}
              buttonTextStyle={restorePasswordButtonStyle.buttonTextStyle}
              buttonText={t('signInScreen.restorePassword')}
              onPressHandler={restorePassword}
            />
          </View>
          <View style={signUpButtonStyle.buttonContainerStyle}>
            <CustomButton
              buttonStyle={signUpButtonStyle.buttonStyle}
              buttonTextStyle={signUpButtonStyle.buttonTextStyle}
              buttonText={t('signInScreen.signUp')}
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
    width: '85%',
    position: 'absolute',
    bottom: 110,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 30,
    backgroundColor: THEME.WHITE_COLOR,
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
    borderColor: THEME.LIGHT_GRAY_COLOR,
    borderWidth: 1,
    backgroundColor: THEME.LIGHT_GRAY_COLOR,
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
    color: THEME.DARK_GRAY_COLOR,
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
    backgroundColor: THEME.MAIN_COLOR,
  },
  buttonTextStyle: {
    color: THEME.WHITE_COLOR,
  },
});

const signUpButtonStyle = StyleSheet.create<ICustomButtonStyle>({
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

const restorePasswordButtonStyle = StyleSheet.create<ICustomButtonStyle>({
  buttonContainerStyle: {
    paddingTop: 15,
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
