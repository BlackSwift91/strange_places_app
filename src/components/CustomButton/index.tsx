import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { THEME } from '../../theme';
import { IStyle, ICustomButton } from './interface';

export const CustomButton: React.FC<ICustomButton> = (props): JSX.Element => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={
        props.disabled
          ? {
              ...styles.buttonStyle,
              ...styles.disabledStyle,
            }
          : {
              ...styles.buttonStyle,
              ...props.buttonStyle,
            }
      }
      onPress={() => props.onPressHandler()}>
      <Text style={{ ...styles.buttonTextStyle, ...props.buttonTextStyle }}>
        {props.buttonText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create<IStyle>({
  buttonStyle: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: THEME.MAIN_COLOR,
    borderColor: THEME.MAIN_COLOR,
    borderWidth: 3,
  },
  buttonTextStyle: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: THEME.WHITE_COLOR,
  },
  disabledStyle: {
    backgroundColor: '#9e9e9e',
    borderColor: '#9e9e9e',
  },
});
