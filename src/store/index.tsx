import { createStore, combineReducers } from 'redux';
import {
  userDataReducer,
  authDataReducer,
  userLocationReducer,
  userLanguageReducer,
} from './reducers/reducers';
import { IUserData, IUserLocation, IAuthData, ILanguage } from './reducers/reducers';

export interface IRootState {
  userDataReducer: IUserData;
  authDataReducer: IAuthData;
  userLocationReducer: IUserLocation;
  userLanguageReducer: ILanguage;
}

const rootReducer = combineReducers({
  userDataReducer,
  authDataReducer,
  userLocationReducer,
  userLanguageReducer,
});

export const store = createStore(rootReducer);
