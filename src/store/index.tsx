import { createStore, combineReducers } from 'redux';
import { authDataReducer } from './reducers/reducers';

const rootReducer = combineReducers({
  authDataReducer,
});

export const store = createStore(rootReducer);
