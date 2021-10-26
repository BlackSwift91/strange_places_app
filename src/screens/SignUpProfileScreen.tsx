import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Dimensions,
  ViewStyle,
  ImageStyle,
  TextStyle,
  BackHandler,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { setUniqueUserId } from '../store/actions/actions';

import { THEME } from '../theme';
import { CustomButton } from '../components/CustomButton';
import { ProfileTextInput } from './../components/ProfileTextInput';
import { ProfileModalTextInput } from './../components/ProfileModalTextInput';

import { DB } from '../../sglib.config';

import { AuthStackNavigatorParamsList } from '../interfaces/INavigation';

interface IProps {
  screenContainer: ViewStyle;
  backgroundImage: ImageStyle;
  authentificationContainer: ImageStyle;
  loginTextInputWrapper: ViewStyle;
  passwordTextInputWrapper: ViewStyle;
  userImageContainer: ViewStyle;
  textInputWrapper: ViewStyle;
}



interface ICustomButtonStyle {
  buttonContainerStyle: ViewStyle;
  buttonStyle: ViewStyle;
  buttonTextStyle: TextStyle;
}

interface SignInScreenProps {
  navigation: StackNavigationProp<AuthStackNavigatorParamsList, 'SignUpProfileScreen'>;
}

export const SignUpProfileScreen: React.FC<SignInScreenProps> = ({ navigation, route }) => {
  BackHandler.addEventListener('hardwareBackPress', function () { return true });
  const dispatch = useDispatch();

  // const userNameInputRef = useRef<TextInput>(null);
  // const userPasswordInputRef = useRef<TextInput>(null);
  // const userRepeatPasswordInputRef = useRef<TextInput>(null);
  const [userFirstName, setUserFirstName] = useState<string>('');
  const [aboutUserText, setAboutUserText] = useState<string>('');
  const [errorDescription, setErrorDescription] = useState<string>('');

  React.useEffect(() => {
    setAboutUserText(route.params?.post);
  }, [route]);

  const test = () => {
    console.log(1);
  };

  const changeUserFirstName = (name: string) => {
    setUserFirstName(name);
  };

  const changeAboutUserTextInfo = (text: string) => {
    setAboutUserText(text);
  };

  const textInputModalNavigation = () => {
    navigation.navigate('TextInputModalScreen', {
      textValue: aboutUserText,
    });
  };

  console.log('name', aboutUserText);

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
            {/* <Image /> */}
          </View>

          <View style={changeAvatarButtonStyle.buttonContainerStyle}>
            <CustomButton
              buttonStyle={changeAvatarButtonStyle.buttonStyle}
              buttonTextStyle={changeAvatarButtonStyle.buttonTextStyle}
              buttonText={'Change your avatar'}
              onPressHandler={test}
            />
          </View>
          <View>
            <Text>{111}</Text>
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
              onChangeTextHandler={changeUserFirstName}
            />
          </View>
          <View style={styles.textInputWrapper}>
            <ProfileModalTextInput
              textLabel={'About you'}
              placeholder={'About you'}
              onChangeTextHandler={changeAboutUserTextInfo}
              onFocusHandler={textInputModalNavigation}
              value={aboutUserText}
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
    paddingTop: Number(StatusBar.currentHeight) + 60,
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
    backgroundColor: 'red',
  },
});


const textInputStyle = StyleSheet.create<ItextInputStyle>({
  insideWrapper: {
    borderRadius: 0,
    borderColor: THEME.darkGray,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 0,

  },
  imageContainer: {
    paddingHorizontal: 5,
    paddingVertical: 0,
  },
  textInput: {
    alignSelf: 'flex-start',
    flexGrow: 1,
    flexShrink: 1,
    fontSize: 16,
  },
  alertStyle: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderColor: 'red',
    borderWidth: 1,
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
