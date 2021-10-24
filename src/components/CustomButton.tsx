import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { THEME } from '../theme';

type IStyle = {
  buttonStyle: ViewStyle;
  buttonTextStyle: TextStyle;
  disabledStyle: ViewStyle;
};

interface ICustomButton {
  buttonText: string;
  onPressHandler: () => void;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  disabled?: boolean;
}

type IbuttonProps = ICustomButton;

export const CustomButton: React.FC<IbuttonProps> = (props): JSX.Element => {
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
    backgroundColor: THEME.mainColor,
    borderColor: THEME.mainColor,
    borderWidth: 3,
  },
  buttonTextStyle: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: THEME.whiteColor,
  },
  disabledStyle: {
    backgroundColor: '#9e9e9e',
    borderColor: '#9e9e9e',
  },
});
