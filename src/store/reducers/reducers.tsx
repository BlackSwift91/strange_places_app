import { SIGN_IN } from '../types';
import { ILoginState } from '../../interfaces/ILoginState';

const initialState: ILoginState = {
  isLoading: false,
  isSignout: true,
  userToken: null,
  error: null,
};

export const loginReducer = (state = initialState, action) => {
  console.log('Reducer Action', action.type);
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignout: false };
    default:
      state;
  }
  return state;
};
