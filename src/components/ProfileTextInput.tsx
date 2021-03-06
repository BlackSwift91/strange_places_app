import React from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';

import { THEME } from '../theme';

interface IProfileTextInputStyle {
  wrapper: ViewStyle;
  label: ViewStyle;
  textInput: TextStyle;
  alertStyle?: ViewStyle;
}

interface IProfileTextInputProps {
  textLabel: string;
  value?: string;
  placeholder: string;
  onChangeTextHandler: (value: string) => void;
  onFocusHandler?: () => void;
}

export const ProfileTextInput: React.FC<IProfileTextInputProps> = props => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{props.textLabel}</Text>
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={THEME.DARK_GRAY_COLOR}
        style={styles.textInput}
        onChangeText={value => props.onChangeTextHandler(value)}
        value={props.value}
      />
    </View>
  );
};

const styles = StyleSheet.create<IProfileTextInputStyle>({
  wrapper: {
    borderRadius: 0,
    borderColor: THEME.DARK_GRAY_COLOR,
    borderBottomWidth: 1,
    backgroundColor: THEME.TRANSPARENT,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 0,
  },
  label: {
    alignSelf: 'flex-start',
    paddingLeft: 0,
    color: THEME.BLACK_COLOR,
  },
  textInput: {
    width: '100%',
    alignSelf: 'flex-start',
    flexGrow: 1,
    flexShrink: 1,
    fontSize: 16,
    color: THEME.DARK_GRAY_COLOR,
  },
  alertStyle: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderColor: 'red',
    borderWidth: 1,
  },
});
