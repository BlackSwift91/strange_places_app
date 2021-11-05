import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Dimensions,
  ViewStyle,
  ImageStyle,
  BackHandler,
  Text,
  Image,
  Modal,
  Pressable,
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

import { CustomButton } from '../components/CustomButton';
import { ProfileTextInput } from './../components/ProfileTextInput';
import { ProfileModalTextInput } from './../components/ProfileModalTextInput';

interface IProps {
  screenContainer: ViewStyle;
  backgroundImage: ImageStyle;
  authentificationContainer: ImageStyle;
  loginTextInputWrapper: ViewStyle;
  passwordTextInputWrapper: ViewStyle;
  userImageContainer: ViewStyle;
  textInputWrapper: ViewStyle;
  userNameStyle: ViewStyle;
}

export interface IUser {
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

  const selectPhotoFromLibrary = async () => {
    await setModalVisible(!modalVisible);
    const img = await pickSingleFromGallery();
    if (img) {
      setImage(img);
    }
  };

  const makeNewPhoto = async () => {
    await setModalVisible(!modalVisible);
    const img = await pickSingleWithCamera();
    if (img) {
      setImage(img);
    }
  };

  const onButtonPress = async () => {
    await requestCameraPermission();
    await setModalVisible(!modalVisible);
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
      textLabel: 'About you',
      placeholder: 'About you',
    });
  };

  const locationInputModalNavigation = () => {
    navigation.navigate('SetUserLocationModalScreen', {
      city: userCity,
      country: userCountry,
    });
  };

  const userLocationTextValue = setTextInputUserLocationValue();

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
              buttonText={'Change your avatar'}
              onPressHandler={onButtonPress}
            />
          </View>

          <View style={styles.centeredView}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      makeNewPhoto();
                    }}>
                    <Text style={styles.textStyle}>Make a new photo</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      selectPhotoFromLibrary();
                    }}>
                    <Text style={styles.textStyle}>Select from library</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>

          <View style={styles.userNameStyle}>
            <Text style={styles.userLogin}>{userLogin}</Text>
          </View>
          <View style={styles.textInputWrapper}>
            <ProfileTextInput
              textLabel={'Name'}
              placeholder={'Name'}
              onChangeTextHandler={changeUserFirstName}
            />
          </View>
          <View style={styles.textInputWrapper}>
            <ProfileTextInput
              textLabel={'Surname'}
              placeholder={'Surname'}
              onChangeTextHandler={changeUserLastName}
            />
          </View>

          <View style={styles.textInputWrapper}>
            <ProfileModalTextInput
              textLabel={'About you'}
              placeholder={'About you'}
              onChangeTextHandler={changeAboutUserTextInfo}
              onFocusHandler={userInfoModalScreen}
              value={aboutUserText}
            />
          </View>
          <View style={styles.textInputWrapper}>
            <ProfileModalTextInput
              textLabel={'Your location'}
              placeholder={'Your location'}
              onChangeTextHandler={changeUserLocationText}
              onFocusHandler={locationInputModalNavigation}
              value={userLocationTextValue}
            />
          </View>
          <View style={confirmButtonStyle.buttonContainerStyle}>
            <CustomButton
              buttonStyle={confirmButtonStyle.buttonStyle}
              buttonTextStyle={confirmButtonStyle.buttonTextStyle}
              buttonText={'Confirm'}
              onPressHandler={submitUserInformation}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: '100%',
    height: '100%',
    paddingTop: Number(StatusBar.currentHeight) + 40,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'rgba(255, 255, 255, 1)',
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
  centeredView: {
    width: '100%',
    top: 280,
    position: 'absolute',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 15,
    padding: 10,
    width: '90%',
    elevation: 2,
    marginBottom: 15,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
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
    backgroundColor: 'transparent',
    borderColor: 'white',
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
