import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { THEME } from '../theme';
import { CustomButton } from '../components/CustomButton';
import {
  userNameChangeInput,
  userPasswordChangeInput,
} from '../store/actions/actions';

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


export const SignInScreen = ({ navigation }) => {
  const changeInputBlur = useRef();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);

    const test = () => {
    console.log('1111122');
  };

  useEffect(() => {
    dispatch(userNameChangeInput(userName));
  }, [dispatch, userName]);

  useEffect(() => {
    dispatch(userPasswordChangeInput(userPassword));
  }, [dispatch, userPassword]);

  function navToScreen() {
    console.log('not navigate');
  }

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
                <MaterialCommunityIcons
                  name="account"
                  color={THEME.darkGray}
                  size={24}
                />
              </View>

              <TextInput
                returnKeyType="next"
                maxLength={30}
                autoCapitalize="none"
                placeholder="User Name"
                style={styles.inputStyle}
                onChangeText={val => setUserName(val)}
                value={userName}
                onSubmitEditing={() => {
                  changeInputBlur.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
          </View>

          <View style={styles.userPasswordTextInputContainer}>
            <View style={styles.textInputContainer}>
              <View style={styles.inputIconContainer}>
                <MaterialCommunityIcons
                  name="lock"
                  color={THEME.darkGray}
                  size={24}
                />
              </View>
              <TextInput
                autoCapitalize="none"
                secureTextEntry={passwordVisible}
                placeholder="Password"
                style={styles.inputStyle}
                onChangeText={val => setUserPassword(val)}
                value={userPassword}
                ref={changeInputBlur}
              />
              <TouchableOpacity
                style={styles.inputIconContainer}
                onPress={() => setPasswordVisible(prev => !prev)}>
                <MaterialCommunityIcons
                  name="eye"
                  color={THEME.darkGray}
                  size={24}
                />
              </TouchableOpacity>
            </View>
          </View>



          <View style={signInButtonStyle.buttonContainerStyle}>
            <CustomButton
              buttonStyle={signInButtonStyle.buttonStyle}
              buttonTextStyle={signInButtonStyle.buttonTextStyle}
              buttonText={'Sign In'}
              onPressButtonValue={'SignInScreen'}
              onPressHandler={test}
              authButtonType={true}
            />
          </View>


          <TouchableOpacity
            onPress={async () => {
              await Keyboard.dismiss();
              navigation.navigate('SignUpScreen');
            }}>
            <Text
              style={{
                color: THEME.mainColor,
                fontSize: 16,
                lineHeight: 24,
                paddingTop: 10,
                textAlign: 'center',
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              color: THEME.mainColor,
              fontSize: 16,
              lineHeight: 24,
              paddingTop: 5,
              textAlign: 'center',
            }}>
            Restore password
          </Text>
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

// signUpButtonText: {
//   color: '#0071bc',
// },

// signUpButtonStyle: {
//   marginTop: 10,
//   backgroundColor: '#ffffff',
// },
// signUpContainer: {
//   width: '90%',
// },

// signUpButtonTextStyle: {
//   color: THEME.mainColor,
// },

// signUpButtonStyle: {
//   marginTop: 10,
//   backgroundColor: THEME.whiteColor,
// },