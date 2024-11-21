import { combineReducers } from 'redux';
import reducer from './reducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  items: reducer,
  users: userReducer,
  // add other reducers here
});

export default rootReducer;
