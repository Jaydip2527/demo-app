import { combineReducers } from 'redux';
import reducer from './reducer';

const rootReducer = combineReducers({
  items: reducer,
  // add other reducers here
});

export default rootReducer;
