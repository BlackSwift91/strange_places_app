import { createStore, combineReducers } from 'redux';
import { userDataReducer, authDataReducer } from './reducers/reducers';

const rootReducer = combineReducers({
  userDataReducer,
  authDataReducer,
});

export const store = createStore(rootReducer);
