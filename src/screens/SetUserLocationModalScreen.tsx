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
  const userCityInputRef = useRef<TextInput>(null);
  const userCountryInputRef = useRef<TextInput>(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Location',
      headerTintColor: THEME.MAIN_COLOR,
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
    setTimeout(() => userCityInputRef.current?.focus(), 40);
  }, []);

  return (
    <View style={styles.center}>
      <View style={styles.countryWrapper}>
        <Text style={styles.label}>Country</Text>
        <TextInput
          ref={userCityInputRef}
          // placeholder={route.params.placeholder}
          placeholderTextColor={THEME.DARK_GRAY_COLOR}
          style={styles.textInput}
          onChangeText={value => setCountry(value)}
          value={country}
          returnKeyType="next"
          maxLength={20}
          onSubmitEditing={() => {
            userCountryInputRef.current?.focus();
          }}
          blurOnSubmit={false}
        />
      </View>

      <View style={styles.cityWrapper}>
        <Text style={styles.label}>City</Text>
        <TextInput
          ref={userCountryInputRef}
          // placeholder={route.params.placeholder}
          style={styles.textInput}
          onChangeText={value => setCity(value)}
          value={city}
          maxLength={20}
          onSubmitEditing={() => {
            navigation.navigate('SignUpProfileScreen', { city: city, country: country });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: THEME.WHITE_COLOR,
    paddingTop: Number(StatusBar.currentHeight) + 80,
    paddingHorizontal: 20,
  },
  text: {
    color: 'black',
  },
  countryWrapper: {
    borderRadius: 0,
    borderColor: THEME.DARK_GRAY_COLOR,
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
    borderColor: THEME.DARK_GRAY_COLOR,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: windowWidth - 40,
    paddingVertical: 0,
  },
  label: {
    alignSelf: 'flex-start',
    color: THEME.BLACK_COLOR,
  },
  textInput: {
    width: windowWidth - 40,
    alignSelf: 'flex-start',
    flexGrow: 1,
    flexShrink: 1,
    fontSize: 16,
    lineHeight: 22,
    color: THEME.DARK_GRAY_COLOR,
  },
  alertStyle: {
    backgroundColor: 'rgba(255, 0, 0, 1)',
    borderColor: 'red',
    borderWidth: 1,
  },
});
