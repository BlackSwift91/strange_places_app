import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, Switch } from 'react-native';
import { THEME } from '../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { CustomButton } from '../components/CustomButton';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '../store/actions/actions';
import i18n from '../localization/i18n';
import { IRootState } from '../store/index';

import auth from '@react-native-firebase/auth';

import { useDispatch, useSelector } from 'react-redux';
import { NavigationRouteContext } from '@react-navigation/core';

export const SettingsScreen = ({ navigation }) => {
  const userLanguage = useSelector((state: IRootState) => state.userLanguageReducer.language);
  const [selectedLanguage, setSelectedLanguage] = useState(userLanguage);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const dispatch = useDispatch();

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  useEffect(() => {
    dispatch(setLanguage(selectedLanguage));
    i18n.changeLanguage(selectedLanguage);
  }, [dispatch, selectedLanguage, userLanguage]);

  console.log('SUR', selectedLanguage);

  const changePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const changeProfileData = () => {
    navigation.navigate('ChangeProfileInfo');
  };

  const enableNotifications = () => {
    setIsEnabled(previousState => !previousState);
  };

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <View style={styles.center}>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        translucent={true}
        hidden={false}
        barStyle="dark-content"
      />
      <View style={{ flexDirection: 'row', marginHorizontal: 15, marginTop: 30, }}>
        <MaterialCommunityIcons name="lock-outline" color={THEME.MAIN_COLOR} size={24} />
        <View style={restorePasswordButtonStyle.buttonContainerStyle}>
          <CustomButton
            buttonStyle={restorePasswordButtonStyle.buttonStyle}
            buttonTextStyle={restorePasswordButtonStyle.buttonTextStyle}
            buttonText={'Change password'}
            onPressHandler={changePassword}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginHorizontal: 15, marginTop: 15, }}>
        <MaterialCommunityIcons name="account-circle-outline" color={THEME.MAIN_COLOR} size={24} />
        <View style={restorePasswordButtonStyle.buttonContainerStyle}>
          <CustomButton
            buttonStyle={restorePasswordButtonStyle.buttonStyle}
            buttonTextStyle={restorePasswordButtonStyle.buttonTextStyle}
            buttonText={'Change profile data'}
            onPressHandler={changeProfileData}
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginHorizontal: 15, marginTop: 15, }}>
        <MaterialCommunityIcons name="translate" color={THEME.MAIN_COLOR} size={24} />
        <View style={restorePasswordButtonStyle.buttonContainerStyle}>
          <CustomButton
            buttonStyle={restorePasswordButtonStyle.buttonStyle}
            buttonTextStyle={restorePasswordButtonStyle.buttonTextStyle}
            buttonText={'Change language'}
            onPressHandler={open}
          />
          <Picker
            ref={pickerRef}
            style={{ color: THEME.MAIN_COLOR, }}
            dropdownIconColor={THEME.MAIN_COLOR}
            selectedValue={selectedLanguage}
            onValueChange={itemValue => setSelectedLanguage(itemValue)}>
            <Picker.Item label="english" value={'en_US'} />
            <Picker.Item label="русский" value={'ru_RU'} />
          </Picker>
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginHorizontal: 15, marginTop: 0 }}>
        <MaterialCommunityIcons name="bell-outline" color={THEME.MAIN_COLOR} size={24} />
        <View style={restorePasswordButtonStyle.buttonContainerStyle}>
          <CustomButton
            buttonStyle={restorePasswordButtonStyle.buttonStyle}
            buttonTextStyle={restorePasswordButtonStyle.buttonTextStyle}
            buttonText={'Enable notifications'}
            onPressHandler={enableNotifications}
          />
        </View>
        <Switch
          style={{ marginLeft: 10 }}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? THEME.MAIN_COLOR : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View style={{ flexDirection: 'row', marginHorizontal: 15, marginTop: 15, position: 'absolute', bottom: 80 }}>
        <MaterialCommunityIcons name="logout" color={THEME.MAIN_COLOR} size={24} />
        <View style={restorePasswordButtonStyle.buttonContainerStyle}>
          <CustomButton
            buttonStyle={restorePasswordButtonStyle.buttonStyle}
            buttonTextStyle={restorePasswordButtonStyle.buttonTextStyle}
            buttonText={'Logout'}
            onPressHandler={signOut}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: THEME.WHITE_COLOR,
  },
  text: {
    color: 'black',
  },
});

const restorePasswordButtonStyle = StyleSheet.create({
  buttonContainerStyle: {
    width: 160,
    textAlign: 'left',
    marginLeft: 10,
  },
  buttonStyle: {
    backgroundColor: THEME.WHITE_COLOR,
    borderColor: THEME.WHITE_COLOR,
    elevation: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 0,
    borderWidth: 0,
  },
  buttonTextStyle: {
    width: '100%',
    textAlign: 'left',
    color: THEME.MAIN_COLOR,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'normal',
  },
});
