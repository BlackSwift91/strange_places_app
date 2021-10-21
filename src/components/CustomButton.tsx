import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { StackNavigatorParamsList } from '../screens/StartScreen';

import { THEME } from '../theme';

type IStyle = {
  buttonStyle: ViewStyle;
  buttonTextStyle: TextStyle;
};
type neg = false;

interface ICustomButton {
  buttonText: string;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
}

interface INavButtonProps extends ICustomButton {
  navButtonType: boolean;
  onPressHandler: (value: keyof StackNavigatorParamsList) => void;
  onPressButtonValue: keyof StackNavigatorParamsList;
}

export interface IAuthButtonProps extends ICustomButton {
  onPressHandler: () => void;
  authButtonType: boolean;
}

type IbuttonProps = ICustomButton | IAuthButtonProps | INavButtonProps;

export const CustomButton: React.FC<IbuttonProps> = (props): JSX.Element => {
  if ('authButtonType' in props && props.authButtonType === true) {
    return (
      <TouchableOpacity
        style={{ ...styles.buttonStyle, ...props.buttonStyle }}
        onPress={() => props.onPressHandler()}>
        <Text style={{ ...styles.buttonTextStyle, ...props.buttonTextStyle }}>
          {props.buttonText}
        </Text>
      </TouchableOpacity>
    );
  } else if ('navButtonType' in props && props.navButtonType === true) {
    return (
      <TouchableOpacity
        style={{ ...styles.buttonStyle, ...props.buttonStyle }}
        onPress={() => props.onPressHandler(props.onPressButtonValue)}>
        <Text style={{ ...styles.buttonTextStyle, ...props.buttonTextStyle }}>
          {props.buttonText}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={{ ...styles.buttonStyle, ...props.buttonStyle }}>
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
});
