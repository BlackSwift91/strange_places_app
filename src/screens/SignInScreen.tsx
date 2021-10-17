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
} from 'react-native';
import { useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { THEME } from '../theme';
import { CustomButton } from '../components/CustomButton';
import {
  userNameChangeInput,
  userPasswordChangeInput,
} from '../store/actions/actions';

export const SignInScreen = ({ navigation }) => {
  console.log(navigation);
  
  const changeInputBlur = useRef();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);

  // const onChangeUserName = (value: string) => {
  //   setUserName(value);
  // };
  // const onChangeUserPassword = (value: string) => {
  //   console.log(value);
  //   setUserPassword(value);
  // };

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
          {/* <View style={styles.passwordInput}>
            <UserNameInputField
              inputValue={userName}
              onChangeUserName={onChangeUserName}
              onChangeFocus={onChangeFocus}
            />
          </View>
          <View style={styles.passwordInput}>
            <PasswordInputField
              inputValue={userPassword}
              onChangeUserPassword={onChangeUserPassword}
              ref={lastNameRef}
            />
          </View> */}
          <View style={styles.passwordInput}>
            <View style={styles.inputContainer}>
              <View style={styles.leftIconContainer}>
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
          <View style={styles.passwordInput}>
            <View style={styles.inputContainer}>
              <View style={styles.leftIconContainer}>
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
                style={styles.leftIconContainer}
                onPress={() => setPasswordVisible(prev => !prev)}>
                <MaterialCommunityIcons
                  name="eye"
                  color={THEME.darkGray}
                  size={24}
                />
              </TouchableOpacity>
            </View>
          </View>

          <CustomButton
            buttonStyle={styles.signInButton}
            buttonText={'Sign In'}
            onPressButtonValue={'SignInScreen'}
            onPressHandler={navToScreen}
          />
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

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
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
  passwordInput: {
    width: '90%',
    marginTop: 10,
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
    zIndex: -100,
  },
  inputContainer: {
    position: 'relative',
    borderRadius: 10,
    borderColor: THEME.lightGray,
    borderWidth: 3,
    backgroundColor: THEME.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  leftIconContainer: {
    paddingHorizontal: 5,
  },
  inputStyle: {
    flexGrow: 1,
  },
});
