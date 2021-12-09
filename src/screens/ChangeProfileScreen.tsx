import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, Text, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { requestCameraPermission } from '../AndroidPermissions';

import { THEME } from '../theme';
import { IRootState } from '../store/index';
import { CustomButton } from '../components/CustomButton';
import { setAllUserData } from '../store/actions/actions';
import { ProfileTextInput } from '../components/ProfileTextInput';
import { ImageSourceModal } from '../components/ImageSourceModal';
import { IChangeProfileScreen } from '../interfaces/INavigation';
import { ProfileModalTextInput } from '../components/ProfileModalTextInput';
import { pickSingleFromGallery, pickSingleWithCamera } from '../ImagePicker';

export const ChangeProfileScreen: React.FC<IChangeProfileScreen> = ({ navigation, route }) => {
  const userData = useSelector((state: IRootState) => state.userDataReducer);
  const [userLogin] = useState<string>(userData.user_name);
  const [userId] = useState<string>(userData._id);
  const [userFirstName, setUserFirstName] = useState<string>(userData.first_name);
  const [userLastName, setUserLastName] = useState<string>(userData.last_name);
  const [aboutUserText, setAboutUserText] = useState<string>(userData.about_user);
  const [userCity, setUserCity] = useState<string>(userData.location.city);
  const [userCountry, setUserCountry] = useState<string>(userData.location.country);
  const [image, setImage] = useState({ uri: userData.avatar_url, width: 140, height: 140 });
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const dispatch = useDispatch();
  const userLocationTextValue = setTextInputUserLocationValue();
  const { t } = useTranslation();

  useEffect(() => {
    if (route?.params?.city) {
      setUserCity(route?.params?.city);
    }
  }, [route]);

  useEffect(() => {
    if (route?.params?.country) {
      setUserCountry(route?.params?.country);
    }
  }, [route]);

  useEffect(() => {
    if (route.params?.textInput) {
      setAboutUserText(route.params.textInput);
    }
  }, [route.params?.textInput]);

  const submitUserInformation = async () => {
    await firestore()
      .collection('users')
      .doc(userData._id)
      .update({
        user_name: userData.user_name,
        first_name: userFirstName,
        last_name: userLastName,
        about_user: aboutUserText,
        avatar_url: image.uri,
        'location.city': userCity,
        'location.country': userCountry,
      })
      .then(() => {
        const location = {
          city: userCity,
          country: userCountry,
        };
        dispatch(
          setAllUserData(
            userId,
            userData._id,
            userLogin,
            userFirstName,
            userLastName,
            aboutUserText,
            image.uri,
            location,
          ),
        );
        console.log('User data updated!');
      })
      .then(() => {
        navigation.goBack();
      });
  };

  const selectPhotoFromLibrary = async () => {
    await setModalVisible(!modalVisible);
    const resImagee = await pickSingleFromGallery();
    if (resImagee) {
      setImage(resImagee);
    }
  };

  const makeNewPhoto = async () => {
    await setModalVisible(false);
    const resImagee = await pickSingleWithCamera();
    if (resImagee) {
      setImage(resImagee);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const onButtonPress = async () => {
    await requestCameraPermission();
    await setModalVisible(!modalVisible);
  };

  const changeUserFirstName = (text: string) => {
    setUserFirstName(text);
  };

  const changeUserLastName = (text: string) => {
    setUserLastName(text);
  };

  const changeAboutUserTextInfo = (text: string) => {
    setAboutUserText(text);
  };

  const changeUserLocationText = () => {};

  const userInfoModalScreen = () => {
    navigation.navigate('AboutUserModalScreen', {
      textValue: aboutUserText,
      textLabel: t('changeProfileScreen.userAboutInfo'),
      placeholder: t('changeProfileScreen.userAboutInfo'),
    });
  };

  const locationInputModalNavigation = () => {
    navigation.navigate('ChangeLocationModalScreen', {
      city: userCity,
      country: userCountry,
    });
  };

  function setTextInputUserLocationValue() {
    if (!userCountry) {
      return userCity;
    } else if (!userCity) {
      return userCountry;
    } else {
      return `${userCountry}, ${userCity}`;
    }
  }

  return (
    <View style={styles.screenContainer}>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        translucent={true}
        hidden={false}
        barStyle="dark-content"
      />
      <View style={styles.authentificationContainer}>
        <View style={styles.userImageContainer}>
          <Image
            source={{
              width: 140,
              height: 140,
              uri: image.uri,
            }}
          />
        </View>
        <View style={changeAvatarButtonStyle.buttonContainerStyle}>
          <CustomButton
            buttonStyle={changeAvatarButtonStyle.buttonStyle}
            buttonTextStyle={changeAvatarButtonStyle.buttonTextStyle}
            buttonText={t('changeProfileScreen.changeAvatar')}
            onPressHandler={onButtonPress}
          />
        </View>
        <ImageSourceModal
          visibility={modalVisible}
          closeModal={closeModal}
          makePhoto={makeNewPhoto}
          selectFromLibrary={selectPhotoFromLibrary}
        />
        <View style={styles.userNameStyle}>
          <Text style={styles.userLogin}>{userLogin}</Text>
        </View>
        <View style={styles.textInputWrapper}>
          <ProfileTextInput
            textLabel={t('changeProfileScreen.userFirstName')}
            placeholder={t('changeProfileScreen.userFirstName')}
            onChangeTextHandler={changeUserFirstName}
          />
        </View>
        <View style={styles.textInputWrapper}>
          <ProfileTextInput
            textLabel={t('changeProfileScreen.userLastName')}
            placeholder={t('changeProfileScreen.userLastName')}
            onChangeTextHandler={changeUserLastName}
          />
        </View>

        <View style={styles.textInputWrapper}>
          <ProfileModalTextInput
            textLabel={t('changeProfileScreen.userAboutInfo')}
            placeholder={t('changeProfileScreen.userAboutInfo')}
            onChangeTextHandler={changeAboutUserTextInfo}
            onFocusHandler={userInfoModalScreen}
            value={aboutUserText}
          />
        </View>
        <View style={styles.textInputWrapper}>
          <ProfileModalTextInput
            textLabel={t('changeProfileScreen.userLocation')}
            placeholder={t('changeProfileScreen.userLocation')}
            onChangeTextHandler={changeUserLocationText}
            onFocusHandler={locationInputModalNavigation}
            value={userLocationTextValue}
          />
        </View>
        <View style={confirmButtonStyle.buttonContainerStyle}>
          <CustomButton
            buttonStyle={confirmButtonStyle.buttonStyle}
            buttonTextStyle={confirmButtonStyle.buttonTextStyle}
            buttonText={t('changeProfileScreen.confirmButton')}
            onPressHandler={submitUserInformation}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  authentificationContainer: {
    width: '100%',
    height: '100%',
    paddingTop: Number(StatusBar.currentHeight),
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: THEME.WHITE_COLOR,
    alignItems: 'center',
  },
  userNameStyle: {
    marginTop: 10,
  },
  textInputWrapper: {
    width: '90%',
    marginTop: 10,
  },
  loginTextInputWrapper: {
    width: '90%',
    marginTop: 10,
    flexDirection: 'row',
  },
  userImageContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: 'hidden',
  },
  userLogin: {
    fontSize: 18,
    color: THEME.DARK_GRAY_COLOR,
  },
});

const confirmButtonStyle = StyleSheet.create({
  buttonContainerStyle: {
    width: '90%',
    marginTop: 40,
  },
  buttonStyle: {
    backgroundColor: THEME.MAIN_COLOR,
  },
  buttonTextStyle: {
    color: THEME.WHITE_COLOR,
  },
});

const changeAvatarButtonStyle = StyleSheet.create({
  buttonContainerStyle: {
    paddingTop: 10,
    width: 200,
  },
  buttonStyle: {
    textAlign: 'center',
    backgroundColor: THEME.TRANSPARENT,
    borderColor: THEME.WHITE_COLOR,
    elevation: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 0,
    borderWidth: 0,
  },
  buttonTextStyle: {
    color: THEME.MAIN_COLOR,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'normal',
  },
});
