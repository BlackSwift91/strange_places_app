import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
// import { NavigatorScreenParams } from '@react-navigation/native';
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
  UserProfile: { params: { _id: string } };
};

type TabNavigatorParamsList = {
  HomeScreenNavigator: undefined;
  AddNewPlaceScreen: undefined;
  ProfileNavigator: undefined;
  // ProfileNavigator: { screen: string; params: { post: IPostData } };
};

type ProfileNavigatorParamsList = {
  UserProfile: { params: { _id: string } } | undefined;
  Settings: undefined;
  PlaceDetail: { params: { post: IPostData } };
  AboutUserModalScreen: { textValue: string; textLabel: string; placeholder: string };
  ChangeLocationModalScreen: { city: string; country: string };
  ChangeProfile: {
    textInput?: string;
    user_name?: string;
    user_id?: string;
    city?: string;
    country?: string;
  };
};

type ProfileParamsList = {
  AboutScreen: { word: string; definition: string };
};

// type RootNavigatorParamsList = {
//   AboutScreen: NavigatorScreenParams<ProfileParamsList>;
// };

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

export interface IUserProfile {
  navigation: StackNavigationProp<ProfileNavigatorParamsList, 'UserProfile'>;
  route: RouteProp<ProfileNavigatorParamsList, 'UserProfile'>;
}
export interface IPlaceScreen {
  navigation: StackNavigationProp<HomeNavigatorParamsList, 'PlaceDetail'>;
  route: RouteProp<HomeNavigatorParamsList, 'PlaceDetail'>;
}

export interface IChangeLocationModal {
  navigation: StackNavigationProp<ProfileNavigatorParamsList, 'ChangeLocationModalScreen'>;
  route: RouteProp<ProfileNavigatorParamsList, 'ChangeLocationModalScreen'>;
}

export interface IChangeAboutUserInfoModal {
  navigation: StackNavigationProp<ProfileNavigatorParamsList, 'AboutUserModalScreen'>;
  route: RouteProp<ProfileNavigatorParamsList, 'AboutUserModalScreen'>;
}

export interface IChangeProfileScreen {
  navigation: StackNavigationProp<ProfileNavigatorParamsList, 'ChangeProfile'>;
  route: RouteProp<ProfileNavigatorParamsList, 'ChangeProfile'>;
}

// export interface IHomeScreen {
//   navigation: CompositeNavigationProp<
//     BottomTabNavigationProp<TabNavigatorParamsList, 'HomeScreen'>,
//     StackNavigationProp<RootNavigatorParamsList>
//   >;
//   route: RouteProp<TabNavigatorParamsList, 'HomeScreen'>;
// }
