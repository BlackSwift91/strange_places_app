import { USER_NAME_INPUT_CHANGE, USER_PASSWORD_INPUT_CHANGE } from '../types';
import { LoginAction } from '../actions/actions'
import { ILoginState } from '../../interfaces/ILoginState';
import { IUserData } from '../../interfaces/IUserData';

const user: IUserData = {
  userName: '',
  userPassword: '',
  token: '',
  profilePicture: '',
};

const initialState: ILoginState = {
  userData: user,
  isLoading: false,
  isSignout: true,
  userToken: null,
  error: null,
};

export const loginReducer = (
  state = initialState,
  action: LoginAction,
): ILoginState => {
  switch (action.type) {
    case USER_NAME_INPUT_CHANGE:
      console.log('Change Input', action.payload);
      return {
        ...state,
        userData: {
          ...state.userData,
          userName: action.payload,
        },
      };
    case USER_PASSWORD_INPUT_CHANGE:
      console.log('Change Input', action.payload);
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
