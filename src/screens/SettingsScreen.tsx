import React, { useState, useEffect, useRef } from 'react';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, StatusBar, Switch } from 'react-native';

import i18n from '../localization/i18n';
import { THEME } from '../theme';
import { IRootState } from '../store/index';
import { setLanguage, setNotifications } from '../store/actions/actions';
import { CustomButton } from '../components/CustomButton';
import { ISettingsScreen } from '../interfaces/INavigation';

export const SettingsScreen: React.FC<ISettingsScreen> = ({ navigation }) => {
  const userLanguage = useSelector((state: IRootState) => state.userSettingsReducer.language);
  const notifications = useSelector((state: IRootState) => state.userSettingsReducer.notifications);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(userLanguage);
  const [userNotifications, setUserNotifications] = useState<boolean>(notifications);

  const dispatch = useDispatch();
  const pickerRef = useRef<Picker<string>>(null);
  const { t } = useTranslation();

  function open() {
    pickerRef.current?.focus();
  }

  const toggleSwitch = () => setUserNotifications(previousState => !previousState);

  useEffect(() => {
    dispatch(setLanguage(selectedLanguage));
    i18n.changeLanguage(selectedLanguage);
  }, [dispatch, selectedLanguage, userLanguage]);

  useEffect(() => {
    dispatch(setNotifications(userNotifications));
  }, [dispatch, userLanguage, userNotifications]);

  const changePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const changeProfileData = () => {
    navigation.navigate('ChangeProfile');
  };

  const enableNotifications = () => {
    setUserNotifications(previousState => !previousState);
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
      <View style={styles.changePasswordContainer}>
        <MaterialCommunityIcons name="lock-outline" color={THEME.MAIN_COLOR} size={24} />
        <View style={settingsButtonStyle.buttonContainerStyle}>
          <CustomButton
            buttonStyle={settingsButtonStyle.buttonStyle}
            buttonTextStyle={settingsButtonStyle.buttonTextStyle}
            buttonText={t('settingsScreen.changePassword')}
            onPressHandler={changePassword}
          />
        </View>
      </View>
      <View style={styles.changeProfileDataContainer}>
        <MaterialCommunityIcons name="account-circle-outline" color={THEME.MAIN_COLOR} size={24} />
        <View style={settingsButtonStyle.buttonContainerStyle}>
          <CustomButton
            buttonStyle={settingsButtonStyle.buttonStyle}
            buttonTextStyle={settingsButtonStyle.buttonTextStyle}
            buttonText={t('settingsScreen.changeProfileData')}
            onPressHandler={changeProfileData}
          />
        </View>
      </View>

      <View style={styles.changeLanguageContainer}>
        <MaterialCommunityIcons name="translate" color={THEME.MAIN_COLOR} size={24} />
        <View style={settingsButtonStyle.buttonContainerStyle}>
          <CustomButton
            buttonStyle={settingsButtonStyle.buttonStyle}
            buttonTextStyle={settingsButtonStyle.buttonTextStyle}
            buttonText={t('settingsScreen.changeLanguage')}
            onPressHandler={open}
          />
          <Picker
            ref={pickerRef}
            style={styles.pickerStyle}
            dropdownIconColor={THEME.MAIN_COLOR}
            selectedValue={selectedLanguage}
            onValueChange={itemValue => setSelectedLanguage(itemValue)}>
            <Picker.Item label="english" value={'en_US'} />
            <Picker.Item label="русский" value={'ru_RU'} />
          </Picker>
        </View>
      </View>

      <View style={styles.enableNotificationsContainer}>
        <MaterialCommunityIcons name="bell-outline" color={THEME.MAIN_COLOR} size={24} />
        <View style={settingsButtonStyle.buttonContainerStyle}>
          <CustomButton
            buttonStyle={settingsButtonStyle.buttonStyle}
            buttonTextStyle={settingsButtonStyle.buttonTextStyle}
            buttonText={t('settingsScreen.enableNotifications')}
            onPressHandler={enableNotifications}
          />
        </View>
        <Switch
          style={styles.switchStyle}
          trackColor={{ false: THEME.DARK_GRAY_COLOR, true: THEME.DARK_GRAY_COLOR }}
          thumbColor={userNotifications ? THEME.MAIN_COLOR : THEME.RED_COLOR}
          onValueChange={toggleSwitch}
          value={userNotifications}
        />
      </View>

      <View style={styles.logOutContainer}>
        <MaterialCommunityIcons name="logout" color={THEME.MAIN_COLOR} size={24} />
        <View style={settingsButtonStyle.buttonContainerStyle}>
          <CustomButton
            buttonStyle={settingsButtonStyle.buttonStyle}
            buttonTextStyle={settingsButtonStyle.buttonTextStyle}
            buttonText={t('settingsScreen.logOut')}
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
  changePasswordContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 30,
  },
  changeProfileDataContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 15,
  },
  changeLanguageContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 15,
  },
  enableNotificationsContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 0,
  },
  logOutContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 15,
    position: 'absolute',
    bottom: 80,
  },
  switchStyle: {
    marginLeft: 10,
  },
  pickerStyle: {
    color: THEME.MAIN_COLOR,
  },
});

const settingsButtonStyle = StyleSheet.create({
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
