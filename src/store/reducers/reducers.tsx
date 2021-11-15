import { SET_UNIQUE_USER_ID, SET_ALL_USER_DATA, IS_NEW_USER, SET_USER_LOCATION } from '../types';
import { UserActions, LoginActions, LocationActions } from '../actions/actions';
// import { ILoginState } from '../../interfaces/ILoginState';
// import { IUserData } from '../../interfaces/IUserData';

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
}

export interface IAuthData {
  isNewUser: boolean;
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
};

const initialAuthState: IAuthData = {
  isNewUser: false,
};

export const userDataReducer = (state = initialUserState, action: UserActions): IUserData => {
  console.log('reducer');
  console.log(action.type);
  switch (action.type) {
    case SET_UNIQUE_USER_ID:
      console.log('UID', action.payload);
      return { ...state, user_id: action.payload };
    case SET_ALL_USER_DATA:
      console.log('SALUD', action.payload);
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
  console.log(action.type);
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
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    default:
      state;
  }
  return state;
};
