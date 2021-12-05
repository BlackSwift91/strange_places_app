import { createStore, combineReducers } from 'redux';
import {
  userDataReducer,
  authDataReducer,
  userLocationReducer,
  userSettingsReducer,
} from './reducers/reducers';
import { IUserData, IUserLocation, IAuthData, ISettings } from './reducers/reducers';

export interface IRootState {
  userDataReducer: IUserData;
  authDataReducer: IAuthData;
  userLocationReducer: IUserLocation;
  userSettingsReducer: ISettings;
}

const rootReducer = combineReducers({
  userDataReducer,
  authDataReducer,
  userLocationReducer,
  userSettingsReducer,
});

export const store = createStore(rootReducer);
