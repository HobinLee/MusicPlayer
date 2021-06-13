import { combineReducers } from 'redux';
import music from './modules/music';
import env from './modules/env';

const rootReducer = combineReducers({
  music,
});

export default rootReducer;