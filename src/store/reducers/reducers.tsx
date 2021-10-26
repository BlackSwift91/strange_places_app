import { SET_UNIQUE_USER_ID, SET_USER_AVATAR } from '../types';
import { LoginAction } from '../actions/actions';
// import { ILoginState } from '../../interfaces/ILoginState';
// import { IUserData } from '../../interfaces/IUserData';

interface ILoginState {
  isLoading: boolean;
  isSignout: boolean;
  userToken: null | string;
  error: null | string;
  userData: IUserData;
}

interface IUserData {
  _id: string;
  about_user: string;
  avatar_url: string;
  first_name: string;
  last_name: string;
  location: string;
  user_id: string;
  user_name: string;
  token: string;
}

const user: IUserData = {
  _id: '',
  about_user: '',
  avatar_url: '',
  first_name: '',
  last_name: '',
  location: '',
  user_id: '',
  user_name: '',
  token: '',
};

const initialState: ILoginState = {
  userData: user,
  isLoading: false,
  isSignout: true,
  userToken: null,
  error: null,
};

export const authDataReducer = (state = initialState, action: LoginAction): ILoginState => {
  switch (action.type) {
    case SET_UNIQUE_USER_ID:
      console.log('UID', action.payload);
      return {
        ...state,
        userData: {
          ...state.userData,
          user_id: action.payload,
        },
      };

    case SET_USER_AVATAR:
      console.log('SET_USER_AVATAR', action.payload);
      return {
        ...state,
        userData: {
          ...state.userData,
          avatar_url: action.payload,
        },
      };
    default:
      state;
  }
  return state;
};
