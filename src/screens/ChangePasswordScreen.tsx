import React, { useState, useRef } from 'react';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { THEME } from '../theme';
import { CustomButton } from '../components/CustomButton';
import { AlertText } from '../components/AlertText';

export const ChangePasswordScreen = () => {
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);
  const [currentPassword, setCurrentPassword] = useState<string | undefined>(undefined);
  const [newPassword, setNewPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [errorDescription, setErrorDescription] = useState<string>('');
  const [isPasswordChanged, setIsPasswordChanged] = useState<boolean>(false);

  const passwordInputRef = useRef<TextInput>(null);
  const newPasswordInputRef = useRef<TextInput>(null);
  const newPasswordRepeatedInputRef = useRef<TextInput>(null);

  const { t } = useTranslation();

  const changeErrorDescription = (error: string) => {
    setErrorDescription(error);
  };

  const formValidation = () => {
    setIsPasswordChanged(false);
    if (currentPassword === undefined) {
      return;
    } else if (newPassword.length < 6) {
      setPasswordError(true);
      changeErrorDescription(t('changePasswordScreen.alertPasswordLength'));
    } else {
      setPasswordError(false);
      changeErrorDescription('');
      if (repeatedPassword === undefined) {
        return;
      } else if (repeatedPassword !== '') {
        if (newPassword === repeatedPassword) {
          setPasswordError(false);
          changeErrorDescription('');
        } else {
          setPasswordError(true);
          changeErrorDescription(t('changePasswordScreen.alertInputEmailEqual'));
        }
      } else {
        setPasswordError(false);
        changeErrorDescription(t('changePasswordScreen.alertInputEmailEqual'));
      }
    }
  };

  const reauthenticate = (currentPass: string) => {
    const user = auth().currentUser;
    if (user?.email) {
      const cred = auth.EmailAuthProvider.credential(user?.email, currentPass);
      return user?.reauthenticateWithCredential(cred);
    } else {
      return 'error';
    }
  };

  const changePassword = async () => {
    formValidation();
    if (!currentPassword) {
      return;
    }
    reauthenticate(currentPassword)
      .then(() => {
        const user = auth().currentUser;
        if (user === null) {
          return;
        }
        user.updatePassword(newPassword).then(() => {
          setPasswordError(false);
          setCurrentPassword(undefined);
          setNewPassword('');
          setRepeatedPassword('');
          setIsPasswordChanged(true);
        });
      })
      .catch((error: any) => {
        console.log(error);
        if (error.code === 'auth/wrong-password') {
          setPasswordError(true);
          changeErrorDescription(t('changePasswordScreen.wrongPassword'));
        }
      });
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.inputPasswordLabelContainer}>
        <Text style={styles.inputPasswordLabel}>
          {t('changePasswordScreen.currentPasswordLabel')}
        </Text>
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
            <MaterialCommunityIcons name="lock" color={THEME.DARK_GRAY_COLOR} size={24} />
          </View>
          <TextInput
            autoCapitalize="none"
            secureTextEntry={passwordVisible}
            placeholder={t('changePasswordScreen.currentPasswordPlaceholder')}
            placeholderTextColor={THEME.DARK_GRAY_COLOR}
            style={textInputStyle.textInput}
            onChangeText={val => setCurrentPassword(val.trim())}
            value={currentPassword}
            returnKeyType="next"
            ref={passwordInputRef}
            onSubmitEditing={() => {
              newPasswordInputRef.current?.focus();
            }}
            blurOnSubmit={false}
          />
          <TouchableOpacity
            style={textInputStyle.imageContainer}
            onPress={() => setPasswordVisible(prev => !prev)}>
            <MaterialCommunityIcons name="eye" color={THEME.DARK_GRAY_COLOR} size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputNewPasswordLabelContainer}>
        <Text style={styles.inputNewPasswordLabel}>
          {t('changePasswordScreen.newPasswordLabel')}
        </Text>
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
            <MaterialCommunityIcons name="lock" color={THEME.DARK_GRAY_COLOR} size={24} />
          </View>
          <TextInput
            autoCapitalize="none"
            secureTextEntry={passwordVisible}
            placeholder={t('changePasswordScreen.newPasswordPlaceholder')}
            placeholderTextColor={THEME.DARK_GRAY_COLOR}
            style={textInputStyle.textInput}
            onChangeText={val => setNewPassword(val.trim())}
            value={newPassword}
            returnKeyType="next"
            ref={newPasswordInputRef}
            // onEndEditing={() => formValidation()}
            onSubmitEditing={() => {
              newPasswordRepeatedInputRef.current?.focus();
            }}
            blurOnSubmit={false}
          />
          <TouchableOpacity
            style={textInputStyle.imageContainer}
            onPress={() => setPasswordVisible(prev => !prev)}>
            <MaterialCommunityIcons name="eye" color={THEME.DARK_GRAY_COLOR} size={24} />
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
            <MaterialCommunityIcons name="lock" color={THEME.DARK_GRAY_COLOR} size={24} />
          </View>
          <TextInput
            autoCapitalize="none"
            secureTextEntry={passwordVisible}
            placeholder={t('changePasswordScreen.repeatPasswordPlaceholder')}
            placeholderTextColor={THEME.DARK_GRAY_COLOR}
            style={textInputStyle.textInput}
            onEndEditing={() => formValidation()}
            onChangeText={val => setRepeatedPassword(val.trim())}
            value={repeatedPassword}
            ref={newPasswordRepeatedInputRef}
          />
          <TouchableOpacity
            style={textInputStyle.imageContainer}
            onPress={() => setPasswordVisible(prev => !prev)}>
            <MaterialCommunityIcons name="eye" color={THEME.DARK_GRAY_COLOR} size={24} />
          </TouchableOpacity>
        </View>
      </View>
      {isPasswordChanged ? (
        <Text style={styles.passwordChangedText}>{t('changePasswordScreen.changedPassword')}</Text>
      ) : (
        <AlertText text={errorDescription} />
      )}
      <View style={signInButtonStyle.buttonContainerStyle}>
        <CustomButton
          buttonStyle={signInButtonStyle.buttonStyle}
          buttonTextStyle={signInButtonStyle.buttonTextStyle}
          buttonText={t('changePasswordScreen.changePasswordButton')}
          onPressHandler={changePassword}
          disabled={passwordError ? true : false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: THEME.WHITE_COLOR,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  authentificationContainer: {
    marginTop: 300,
    width: '85%',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 30,
    backgroundColor: THEME.WHITE_COLOR,
    alignItems: 'center',
  },
  passwordTextInputWrapper: {
    marginTop: 5,
    flexDirection: 'row',
  },
  loginTextInputWrapper: {
    width: '90%',
    marginTop: 10,
    flexDirection: 'row',
  },
  inputPasswordLabelContainer: {
    width: '100%',
    marginTop: 20,
  },
  inputPasswordLabel: {
    color: 'black',
    textAlign: 'left',
    fontSize: 16,
  },
  inputNewPasswordLabelContainer: {
    width: '100%',
    marginTop: 10,
  },
  inputNewPasswordLabel: {
    color: 'black',
    textAlign: 'left',
    fontSize: 16,
  },
  passwordChangedText: {
    color: 'green',
    paddingTop: 10,
    fontSize: 15,
    width: '90%',
  },
});

const signInButtonStyle = StyleSheet.create({
  buttonContainerStyle: {
    width: '90%',
    marginTop: 15,
  },
  buttonStyle: {
    backgroundColor: THEME.MAIN_COLOR,
  },
  buttonTextStyle: {
    color: THEME.WHITE_COLOR,
  },
});

const textInputStyle = StyleSheet.create({
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
    borderColor: THEME.RED_COLOR,
    borderWidth: 1,
  },
});
