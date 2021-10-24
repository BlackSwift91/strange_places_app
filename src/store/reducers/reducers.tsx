import { USER_NAME_INPUT_CHANGE, USER_PASSWORD_INPUT_CHANGE } from '../types';
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

export const authDataReducer = (
  state = initialState,
  action: LoginAction,
): ILoginState => {
  switch (action.type) {
    case USER_NAME_INPUT_CHANGE:
      // console.log('Change Input', action.payload);
      return {
        ...state,
        userData: {
          ...state.userData,
          user_name: action.payload,
        },
      };
    case USER_PASSWORD_INPUT_CHANGE:
      // console.log('Change Input', action.payload);
      return {
        ...state,
        userData: {
          ...state.userData,
          userPassword: action.payload,
        },
      };
    default:
      state;
  }
  return state;
};
