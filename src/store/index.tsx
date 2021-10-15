import { createStore, combineReducers } from 'redux';
import { loginReducer } from './reducers/reducers';

const rootReducer = combineReducers({
  loginReducer,
});

export const store = createStore(rootReducer);
