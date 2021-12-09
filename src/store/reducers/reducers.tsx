import { NativeModules } from 'react-native';

import {
  SET_UNIQUE_USER_ID,
  SET_ALL_USER_DATA,
  IS_NEW_USER,
  SET_USER_LOCATION,
  SET_IS_USER_POSITION_LOCATED,
  SET_MAP_DELTA,
  SET_LANGUAGE,
  SET_NOTIFICATIONS,
} from '../types';
import { UserActions, LoginActions, LocationActions, SettingsActions } from '../actions/actions';

export interface IUserData {
  _id: string;
  about_user: string;
  avatar_url: string;
  first_name: string;
  last_name: string;
  location: {
    city: string;
    country: string;
  };
  user_id: string;
  user_name: string;
}

export interface IUserLocation {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  isUserPositionLocated: boolean;
}

export interface IAuthData {
  isNewUser: boolean;
}

export interface ISettings {
  language: string;
  notifications: boolean;
}

const initialUserState: IUserData = {
  _id: '',
  about_user: '',
  avatar_url: '',
  first_name: '',
  last_name: '',
  location: {
    city: '',
    country: '',
  },
  user_id: '',
  user_name: '',
};

const initialUserLocation: IUserLocation = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
  isUserPositionLocated: false,
};

const initialAuthState: IAuthData = {
  isNewUser: false,
};

const initialSettings: ISettings = {
  language: NativeModules.I18nManager.localeIdentifier,
  notifications: true,
};

export const userSettingsReducer = (state = initialSettings, action: SettingsActions) => {
  console.log(action.type);
  switch (action.type) {
    case SET_LANGUAGE:
      console.log('LANGUAGEREDUCER', action.payload);
      return { ...state, language: action.payload };
    case SET_NOTIFICATIONS:
      console.log('NOTIFICATIONREDUCER', action.payload);
      return { ...state, notifications: action.payload };
    default:
      state;
  }
  return state;
};

export const userDataReducer = (state = initialUserState, action: UserActions): IUserData => {
  // console.log('reducer');
  // console.log(action.type);
  switch (action.type) {
    case SET_UNIQUE_USER_ID:
      console.log('UID', action.payload);
      return { ...state, user_id: action.payload };
    case SET_ALL_USER_DATA:
      // console.log('SALUD', action.payload);
      return {
        ...state,
        _id: action.payload._id,
        about_user: action.payload.about_user,
        avatar_url: action.payload.avatar_url,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        user_id: action.payload.user_id,
        user_name: action.payload.user_name,
        location: {
          city: action.payload.location.city,
          country: action.payload.location.country,
        },
      };
    default:
      state;
  }
  return state;
};

export const authDataReducer = (state = initialAuthState, action: LoginActions) => {
  // console.log(action.type);
  switch (action.type) {
    case IS_NEW_USER:
      console.log('INU', action.payload);
      return { ...state, isNewUser: action.payload };
    default:
      state;
  }
  return state;
};

export const userLocationReducer = (state = initialUserLocation, action: LocationActions) => {
  console.log(action.type);
  switch (action.type) {
    case SET_USER_LOCATION:
      console.log('LR', action.payload);
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    case SET_MAP_DELTA:
      console.log('MD', action.payload);
      return {
        ...state,
        latitudeDelta: action.payload.latitudeDelta,
        longitudeDelta: action.payload.longitudeDelta,
      };
    case SET_IS_USER_POSITION_LOCATED:
      console.log('UPL1', action.payload);
      return {
        ...state,
        isUserPositionLocated: action.payload.isUserPositionLocated,
      };
    default:
      state;
  }
  return state;
};
