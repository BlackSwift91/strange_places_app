import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { IPostData } from '../interfaces/IPostData';

type NavigatorParamsList = {
  StartScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  TextInputModalScreen: { textValue: string; textLabel: string; placeholder: string };
  SetUserLocationModalScreen: { city: string; country: string };
  SignUpProfileScreen: {
    textInput?: string;
    user_name?: string;
    user_id?: string;
    city?: string;
    country?: string;
  };
};

type HomeNavigatorParamsList = {
  HomeScreen: undefined;
  PlaceDetail: { params: { post: IPostData } };
  SignUpScreen: undefined;
  TextInputModalScreen: { textValue: string; textLabel: string; placeholder: string };
};

type TabNavigatorParamsList = {
  HomeScreenNavigator: undefined;
  AddNewPlaceScreen: undefined;
  ProfileNavigator: undefined;
  // ProfileNavigator: { screen: string; params: { post: IPostData } };
};

type ProfileParamsList = {
  AboutScreen: { word: string; definition: string };
};

type RootNavigatorParamsList = {
  AboutScreen: NavigatorScreenParams<ProfileParamsList>;
};

export interface StartScreenProps {
  navigation: StackNavigationProp<NavigatorParamsList, 'StartScreen'>;
}

export interface ISignInScreenProps {
  navigation: StackNavigationProp<NavigatorParamsList, 'SignInScreen'>;
}
export interface SignUpScreenProps {
  navigation: StackNavigationProp<NavigatorParamsList, 'SignUpScreen'>;
  route: RouteProp<NavigatorParamsList, 'SignUpScreen'>;
}

export interface ISignUpProfileScreen {
  navigation: StackNavigationProp<NavigatorParamsList, 'SignUpProfileScreen'>;
  route: RouteProp<NavigatorParamsList, 'SignUpProfileScreen'>;
}

export interface ITextInputModalScreen {
  navigation: StackNavigationProp<NavigatorParamsList, 'TextInputModalScreen'>;
  route: RouteProp<NavigatorParamsList, 'TextInputModalScreen'>;
}

export interface ISetUserLocationModalScreen {
  navigation: StackNavigationProp<NavigatorParamsList, 'SetUserLocationModalScreen'>;
  route: RouteProp<NavigatorParamsList, 'SetUserLocationModalScreen'>;
}

export interface IAddNewPlaceScreen {
  navigation: BottomTabNavigationProp<TabNavigatorParamsList, 'AddNewPlaceScreen'>;
}

export interface IHomeScreen {
  navigation: StackNavigationProp<HomeNavigatorParamsList, 'HomeScreen'>;
  route: RouteProp<HomeNavigatorParamsList, 'HomeScreen'>;
}

// export interface IHomeScreen {
//   navigation: CompositeNavigationProp<
//     BottomTabNavigationProp<TabNavigatorParamsList, 'HomeScreen'>,
//     StackNavigationProp<RootNavigatorParamsList>
//   >;
//   route: RouteProp<TabNavigatorParamsList, 'HomeScreen'>;
// }
