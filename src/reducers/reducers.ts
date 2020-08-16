import userReducer from './userReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
	usersData: userReducer,
});

export default reducers;
