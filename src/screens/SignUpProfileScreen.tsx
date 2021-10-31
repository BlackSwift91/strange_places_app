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
  PermissionsAndroid,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

import { THEME } from '../theme';
import { UserIcon } from '../images/UserIcon';
import { ISignUpProfileScreen } from '../interfaces/INavigation';
import { ICustomButtonStyle } from '../interfaces/ICustomButtonStyle';
import { setAllUserData } from '../store/actions/actions';

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
}

export interface IUser {
  [key: string]: string;
}

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: 'App Camera Permission',
      message: 'App needs access to your camera ',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    });
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission given');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const SignUpProfileScreen: React.FC<ISignUpProfileScreen> = ({ navigation, route }) => {
  BackHandler.addEventListener('hardwareBackPress', () => true);
  const dispatch = useDispatch();

  const [userLogin, setUserLogin] = useState<string>(route.params.user_name);
  const [userId, setUserId] = useState<string>(route.params.user_id);
  const [userFirstName, setUserFirstName] = useState<string>('');
  const [userLastName, setUserLastName] = useState<string>('');
  const [aboutUserText, setAboutUserText] = useState<string>('');
  const [userCity, setUserCity] = useState<string>('');
  const [userCountry, setUserCountry] = useState<string>('');
  const [image, setImage] = useState({ uri: UserIcon, width: 140, height: 140 });

  console.log('log', userLogin);
  console.log('id', userId);


  // setLocation({
  //   city: userCity,
  //   country: userCountry,
  // });

  // useEffect(() => {
  //   if (userDBId) {
  //     dispatch(
  //       setAllUserData(
  //         userId,
  //         userDBId,
  //         userLogin,
  //         userFirstName,
  //         userLastName,
  //         aboutUserText,
  //         image.uri,
  //         location,
  //       ),
  //     );
  //   }
  // }, [
  //   dispatch,
  //   userDBId,
  //   aboutUserText,
  //   image.uri,
  //   userFirstName,
  //   userLastName,
  //   userId,
  //   userLogin,
  //   location,
  // ]);

  function pickSingleBase64(cropit: boolean) {
    ImagePicker.openPicker({
      width: 140,
      height: 140,
      cropping: cropit,
      includeBase64: true,
      includeExif: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
    })
      .then(img => {
        console.log('received base64 image');
        setImage({
          uri: `data:${img.mime};base64,` + img.data,
          width: img.width,
          height: img.height,
        });
      })
      .catch(e => console.log(e));
  }
  const onButtonPress = React.useCallback(() => {
    requestCameraPermission();
    pickSingleBase64(true);
  }, []);

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

  // useEffect(() => {
  //   if (route.params.user_name) {
  //     setUserLogin(route.params.user_name);
  //   }
  // }, [route.params.user_name]);

  // useEffect(() => {
  //   if (route.params.user_id) {
  //     setUserId(route.params.user_id);
  //   }
  // }, [route.params.user_id]);

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
    //await firestore()
    //   .collection('users')
    //   .add({
    //     user_id: userId,
    //     user_name: userLogin,
    //     first_name: userFirstName,
    //     last_name: userLastName,
    //     about_user: aboutUserText,
    //     avatar_url: image.image.uri,
    //     location: {
    //       city: userCity,
    //       country: userCountry,
    //     },
    //   })
    //   .then(() => {
    //     console.log('User added!');
    //   });
    console.log('User added!');
    await firestore()
      .collection('users')
      .where('user_id', '==', `${userId}`)
      .get()
      .then(response => {
        response.forEach((doc: any) => {
          data.push({ _id: doc.id });
        });
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

  const changeUserLocationText = () => {
    console.log(2);
  };

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
        />
        <View style={styles.authentificationContainer}>
          <View style={styles.userImageContainer}>
            <Image
              source={{
                width: image.width,
                height: image.height,
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
          <View>
            <Text>{userLogin}</Text>
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
          <View style={signInButtonStyle.buttonContainerStyle}>
            <CustomButton
              buttonStyle={signInButtonStyle.buttonStyle}
              buttonTextStyle={signInButtonStyle.buttonTextStyle}
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
});

const signInButtonStyle = StyleSheet.create<ICustomButtonStyle>({
  buttonContainerStyle: {
    width: '90%',
    marginTop: 60,
  },
  buttonStyle: {
    backgroundColor: THEME.mainColor,
  },
  buttonTextStyle: {
    color: THEME.whiteColor,
  },
});

const changeAvatarButtonStyle = StyleSheet.create<ICustomButtonStyle>({
  buttonContainerStyle: {
    paddingTop: 15,
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
    color: THEME.mainColor,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'normal',
  },
});
