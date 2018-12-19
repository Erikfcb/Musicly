import { combineReducers } from 'redux';
import authReducer from './authReducers';
import gamesReducer from './gamesReducer';
import 'react-typist/dist/Typist.css'

export default combineReducers({
  auth: authReducer,
  games: gamesReducer
});