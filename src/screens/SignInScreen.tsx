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
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import auth from '@react-native-firebase/auth';

import { THEME } from '../theme';
import { CustomButton } from '../components/CustomButton';
import { userNameChangeInput, userPasswordChangeInput } from '../store/actions/actions';

import { DB } from '../../sglib.config';

import { AuthStackNavigatorParamsList } from '../interfaces/INavigation';

interface IProps {
  screenContainer: ViewStyle;
  backgroundImage: ImageStyle;
  authentificationContainer: ImageStyle;
  userLoginTextInputContainer: ViewStyle;
  textInputContainer: ViewStyle;
  inputIconContainer: ViewStyle;
  inputStyle: ViewStyle;
  userPasswordTextInputContainer: ViewStyle;
}

interface ICustomButtonStyle {
  buttonContainerStyle: ViewStyle;
  buttonStyle: ViewStyle;
  buttonTextStyle: TextStyle;
}

interface SignInScreenProps {
  navigation: StackNavigationProp<AuthStackNavigatorParamsList, 'SignInScreen'>;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const userNameInputRef = useRef<TextInput>(null);
  const userPasswordInputRef = useRef<TextInput>(null);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const result = await DB.users.getAllUsers();
      console.log(result);
    })();
  }, []);

  const test = () => {
    console.log('1111122');
  };

  useEffect(() => {
    dispatch(userNameChangeInput(userName));
  }, [dispatch, userName]);

  useEffect(() => {
    dispatch(userPasswordChangeInput(userPassword));
  }, [dispatch, userPassword]);

  const navToSignUpScreen = async () => {
    await Keyboard.dismiss();
    navigation.navigate('SignUpScreen');
  };

  // useEffect(() => {
  //   userNameInputRef.current?.focus();
  // }, []);

  // auth()
  //   .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
  //   .then(() => {
  //     console.log('User account created & signed in!');
  //   })
  //   .catch(error => {
  //     if (error.code === 'auth/email-already-in-use') {
  //       console.log('That email address is already in use!');
  //     }

  //     if (error.code === 'auth/invalid-email') {
  //       console.log('That email address is invalid!');
  //     }

  //     console.error(error);
  //   });

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
            <View style={styles.textInputContainer}>
              <View style={styles.inputIconContainer}>
                <MaterialCommunityIcons name="account" color={THEME.darkGray} size={24} />
              </View>

              <TextInput
                ref={userNameInputRef}
                returnKeyType="next"
                maxLength={30}
                autoCapitalize="none"
                placeholder="User Name"
                style={styles.inputStyle}
                onChangeText={val => setUserName(val)}
                value={userName}
                onSubmitEditing={() => {
                  userPasswordInputRef.current?.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
          </View>

          <View style={styles.userPasswordTextInputContainer}>
            <View style={styles.textInputContainer}>
              <View style={styles.inputIconContainer}>
                <MaterialCommunityIcons name="lock" color={THEME.darkGray} size={24} />
              </View>
              <TextInput
                autoCapitalize="none"
                secureTextEntry={passwordVisible}
                placeholder="Password"
                style={styles.inputStyle}
                onChangeText={val => setUserPassword(val)}
                value={userPassword}
                ref={userPasswordInputRef}
              />
              <TouchableOpacity
                style={styles.inputIconContainer}
                onPress={() => setPasswordVisible(prev => !prev)}>
                <MaterialCommunityIcons name="eye" color={THEME.darkGray} size={24} />
              </TouchableOpacity>
            </View>
          </View>

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
  textInputContainer: {
    borderRadius: 10,
    borderColor: THEME.lightGray,
    borderWidth: 3,
    backgroundColor: THEME.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputIconContainer: {
    paddingHorizontal: 5,
  },
  inputStyle: {
    alignSelf: 'flex-start',
    flexGrow: 1,
    flexShrink: 1,
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
