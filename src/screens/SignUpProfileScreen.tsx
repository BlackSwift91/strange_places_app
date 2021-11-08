import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ViewStyle,
  ImageStyle,
  BackHandler,
  Text,
  Image,
  TextStyle,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { useDispatch } from 'react-redux';

import { THEME } from '../theme';
import { UserIcon } from '../images/UserIcon';
import { ISignUpProfileScreen } from '../interfaces/INavigation';
import { ICustomButtonStyle } from '../interfaces/ICustomButtonStyle';
import { setAllUserData, setIsNewUser } from '../store/actions/actions';
import { requestCameraPermission } from '../AndroidPermissions';
import { pickSingleFromGallery, pickSingleWithCamera } from '../ImagePicker';
import { useTranslation } from 'react-i18next';

import { CustomButton } from '../components/CustomButton';
import { ProfileTextInput } from './../components/ProfileTextInput';
import { ProfileModalTextInput } from './../components/ProfileModalTextInput';
import { ImageSourceModal } from '../components/ImageSourceModal';

interface IStyle {
  screenContainer: ViewStyle;
  authentificationContainer: ImageStyle;
  loginTextInputWrapper: ViewStyle;
  userImageContainer: ViewStyle;
  textInputWrapper: ViewStyle;
  userNameStyle: ViewStyle;
  userLogin: TextStyle;
}

interface IUser {
  [key: string]: string;
}

export const SignUpProfileScreen: React.FC<ISignUpProfileScreen> = ({ navigation, route }) => {
  BackHandler.addEventListener('hardwareBackPress', () => true);

  const [userLogin, setUserLogin] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [userFirstName, setUserFirstName] = useState<string>('');
  const [userLastName, setUserLastName] = useState<string>('');
  const [aboutUserText, setAboutUserText] = useState<string>('');
  const [userCity, setUserCity] = useState<string>('');
  const [userCountry, setUserCountry] = useState<string>('');
  const [image, setImage] = useState({ uri: UserIcon, width: 140, height: 140 });
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const dispatch = useDispatch();
  const userLocationTextValue = setTextInputUserLocationValue();
  const { t } = useTranslation();

  useEffect(() => {
    if (route.params?.city) {
      setUserCity(route.params.city);
    } else {
      setUserCity('');
    }
  }, [route.params.city]);

  useEffect(() => {
    if (route.params?.country) {
      setUserCountry(route.params.country);
    } else {
      setUserCountry('');
    }
  }, [route.params.country]);

  useEffect(() => {
    if (route.params.user_name) {
      setUserLogin(route.params.user_name);
    }
  }, [route.params.user_name]);

  useEffect(() => {
    if (route.params.user_id) {
      setUserId(route.params.user_id);
    }
  }, [route.params.user_id]);

  useEffect(() => {
    if (route.params?.textInput) {
      setAboutUserText(route.params.textInput);
    }
  }, [route.params?.textInput]);

  useEffect(() => {
    if (route.params?.textInput) {
      setAboutUserText(route.params.textInput);
    }
  }, [route.params?.textInput]);

  const submitUserInformation = async () => {
    const data: IUser[] = [];

    await firestore()
      .collection('users')
      .where('user_id', '==', `${userId}`)
      .get()
      .then(response => {
        response.forEach((doc: any) => {
          data.push({ _id: doc.id });
        });
      });

    await firestore()
      .collection('users')
      .doc(data[0]._id)
      .update({
        user_name: userLogin,
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
            data[0]._id,
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
        dispatch(setIsNewUser(false));
        console.log('New user successfully created!');
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
    navigation.navigate('TextInputModalScreen', {
      textValue: aboutUserText,
      textLabel: t('signUpProfileScreen.userAboutInfo'),
      placeholder: t('signUpProfileScreen.userAboutInfo'),
    });
  };

  const locationInputModalNavigation = () => {
    navigation.navigate('SetUserLocationModalScreen', {
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
            buttonText={t('signUpProfileScreen.changeAvatar')}
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
            textLabel={t('signUpProfileScreen.userFirstName')}
            placeholder={t('signUpProfileScreen.userFirstName')}
            onChangeTextHandler={changeUserFirstName}
          />
        </View>
        <View style={styles.textInputWrapper}>
          <ProfileTextInput
            textLabel={t('signUpProfileScreen.userLastName')}
            placeholder={t('signUpProfileScreen.userLastName')}
            onChangeTextHandler={changeUserLastName}
          />
        </View>

        <View style={styles.textInputWrapper}>
          <ProfileModalTextInput
            textLabel={t('signUpProfileScreen.userAboutInfo')}
            placeholder={t('signUpProfileScreen.userAboutInfo')}
            onChangeTextHandler={changeAboutUserTextInfo}
            onFocusHandler={userInfoModalScreen}
            value={aboutUserText}
          />
        </View>
        <View style={styles.textInputWrapper}>
          <ProfileModalTextInput
            textLabel={t('signUpProfileScreen.userLocation')}
            placeholder={t('signUpProfileScreen.userLocation')}
            onChangeTextHandler={changeUserLocationText}
            onFocusHandler={locationInputModalNavigation}
            value={userLocationTextValue}
          />
        </View>
        <View style={confirmButtonStyle.buttonContainerStyle}>
          <CustomButton
            buttonStyle={confirmButtonStyle.buttonStyle}
            buttonTextStyle={confirmButtonStyle.buttonTextStyle}
            buttonText={t('signUpProfileScreen.confirmButton')}
            onPressHandler={submitUserInformation}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create<IStyle>({
  screenContainer: {
    flex: 1,
  },
  authentificationContainer: {
    width: '100%',
    height: '100%',
    paddingTop: Number(StatusBar.currentHeight) + 70,
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

const confirmButtonStyle = StyleSheet.create<ICustomButtonStyle>({
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

const changeAvatarButtonStyle = StyleSheet.create<ICustomButtonStyle>({
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
