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
} from 'react-native';

import { THEME } from '../theme';
import { ITextInputModalScreen } from '../interfaces/INavigation';
import { NavigationButton } from '../components/NavigationButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

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

export const TextInputModalScreen: React.FC<ITextInputModalScreen> = ({ navigation, route }) => {
  const [text, setText] = useState<string>(route.params.textValue);
  const userNameInputRef = useRef<TextInput>(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.textLabel,
      headerTintColor: THEME.MAIN_COLOR,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={NavigationButton}>
          <Item
            title="check"
            iconName="check"
            onPress={async () => {
              await Keyboard.dismiss();
              navigation.navigate('SignUpProfileScreen', { textInput: text });
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [text, navigation, route.params.textLabel]);

  useEffect(() => {
    setTimeout(() => userNameInputRef.current?.focus(), 40);
  }, []);

  return (
    <View style={styles.center}>
      <View style={styles.wrapper}>
        <TextInput
          ref={userNameInputRef}
          placeholder={route.params.placeholder}
          placeholderTextColor={THEME.DARK_GRAY_COLOR}
          style={styles.textInput}
          onChangeText={value => setText(value)}
          value={text}
          multiline={true}
          returnKeyType={'none'}
          maxLength={128}
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
  wrapper: {
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
    color: 'black',
  },
  alertStyle: {
    backgroundColor: 'rgba(255, 0, 0, 1)',
    borderColor: 'red',
    borderWidth: 1,
  },
});
