import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ViewStyle,
  TextStyle,
  StatusBar,
  Dimensions,
  Keyboard,
  Text,
} from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { ISetUserLocationModalScreen } from '../interfaces/INavigation';
import { NavigationButton } from '../components/NavigationButton';

import { THEME } from '../theme';

interface IProfileTextInputStyle {
  wrapper: ViewStyle;
  label: ViewStyle;
  textInput: TextStyle;
  alertStyle?: ViewStyle;
}

interface IProfileTextInputProps {
  textLabel: string;
  placeholder: string;
  onChangeTextHandler: (value: string) => void;
  onFocusHandler?: () => void;
}

const windowWidth = Dimensions.get('window').width;

export const SetUserLocationModalScreen: React.FC<ISetUserLocationModalScreen> = ({
  navigation,
  route,
}) => {
  const [city, setCity] = useState<string>(route.params.city);
  const [country, setCountry] = useState<string>(route.params.country);
  const userNameInputRef = useRef<TextInput>(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Location',
      headerTintColor: THEME.mainColor,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={NavigationButton}>
          <Item
            title="check"
            iconName="check"
            onPress={async () => {
              await Keyboard.dismiss();
              navigation.navigate('SignUpProfileScreen', { city: city, country: country });
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, city, country]);

  useEffect(() => {
    setTimeout(() => userNameInputRef.current?.focus(), 40);
  }, []);

  return (
    <View style={styles.center}>
      <View style={styles.countryWrapper}>
        <Text style={styles.label}>Country</Text>
        <TextInput
          ref={userNameInputRef}
          // placeholder={route.params.placeholder}
          style={styles.textInput}
          onChangeText={value => setCountry(value)}
          value={country}
          returnKeyType={'none'}
          maxLength={30}
        />
      </View>

      <View style={styles.cityWrapper}>
        <Text style={styles.label}>City</Text>
        <TextInput
          ref={userNameInputRef}
          // placeholder={route.params.placeholder}
          style={styles.textInput}
          onChangeText={value => setCity(value)}
          value={city}
          returnKeyType={'none'}
          maxLength={30}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: THEME.whiteColor,
    paddingTop: Number(StatusBar.currentHeight) + 80,
    paddingHorizontal: 20,
  },
  text: {
    color: 'black',
  },
  countryWrapper: {
    borderRadius: 0,
    borderColor: THEME.darkGray,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: windowWidth - 40,
    paddingVertical: 0,
  },
  cityWrapper: {
    marginTop: 20,
    borderRadius: 0,
    borderColor: THEME.darkGray,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: windowWidth - 40,
    paddingVertical: 0,
  },
  label: {
    alignSelf: 'flex-start',
  },
  textInput: {
    width: windowWidth - 40,
    alignSelf: 'flex-start',
    flexGrow: 1,
    flexShrink: 1,
    fontSize: 16,
    lineHeight: 22,
    color: 'black',
  },
  alertStyle: {
    backgroundColor: 'rgba(255, 0, 0, 1)',
    borderColor: 'red',
    borderWidth: 1,
  },
});
