import { createStore, combineReducers } from 'redux';
import { userDataReducer, authDataReducer, userLocationReducer } from './reducers/reducers';
import { IUserData, IUserLocation, IAuthData } from './reducers/reducers';

export interface IRootState {
  userDataReducer: IUserData;
  authDataReducer: IAuthData;
  userLocationReducer: IUserLocation;
}

const rootReducer = combineReducers({
  userDataReducer,
  authDataReducer,
  userLocationReducer,
});

export const store = createStore(rootReducer);
