import { TextStyle, ViewStyle } from 'react-native';

export interface IStyle {
  buttonStyle: ViewStyle;
  buttonTextStyle: TextStyle;
  disabledStyle: ViewStyle;
}
export interface ICustomButton {
  buttonText: string;
  onPressHandler: () => void;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  disabled?: boolean;
}
