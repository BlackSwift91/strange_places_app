import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type AuthStackNavigatorParamsList = {
  StartScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  SignUpProfileScreen: {
    textInput?: string;
    user_name?: string;
    user_id?: string;
    city?: string;
    country?: string;
  };
  TextInputModalScreen: { textValue: string; textLabel: string; placeholder: string };
  SetUserLocationModalScreen: { city: string; country: string };
  AddNewPlaceScreen: undefined;
  HomeScreen: { postAdded: boolean };
};

export interface StartScreenProps {
  navigation: StackNavigationProp<AuthStackNavigatorParamsList, 'StartScreen'>;
}

export interface ISignInScreenProps {
  navigation: StackNavigationProp<AuthStackNavigatorParamsList, 'SignInScreen'>;
}
export interface SignUpScreenProps {
  navigation: StackNavigationProp<AuthStackNavigatorParamsList, 'SignUpScreen'>;
  route: RouteProp<AuthStackNavigatorParamsList, 'SignUpScreen'>;
}

export interface ISignUpProfileScreen {
  navigation: StackNavigationProp<AuthStackNavigatorParamsList, 'SignUpProfileScreen'>;
  route: RouteProp<AuthStackNavigatorParamsList, 'SignUpProfileScreen'>;
}

export interface ITextInputModalScreen {
  navigation: StackNavigationProp<AuthStackNavigatorParamsList, 'TextInputModalScreen'>;
  route: RouteProp<AuthStackNavigatorParamsList, 'TextInputModalScreen'>;
}

export interface ISetUserLocationModalScreen {
  navigation: StackNavigationProp<AuthStackNavigatorParamsList, 'SetUserLocationModalScreen'>;
  route: RouteProp<AuthStackNavigatorParamsList, 'SetUserLocationModalScreen'>;
}

export interface IAddNewPlaceScreen {
  navigation: StackNavigationProp<AuthStackNavigatorParamsList, 'AddNewPlaceScreen'>;
}
export interface IHomeScreen {
  navigation: StackNavigationProp<AuthStackNavigatorParamsList, 'HomeScreen'>;
  route: RouteProp<AuthStackNavigatorParamsList, 'SetUserLocationModalScreen'>;
}
