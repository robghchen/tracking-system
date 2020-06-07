import { FETCH_USERS_LIST } from '../actions/userActions';

const initialState = {
	users: [],
};

function userReducer(state = initialState, action) {
	console.log('action:', action);
	switch (action.type) {
		case FETCH_USERS_LIST:
			return {
				...state,
				users: action.users,
			};
		default:
			return state;
	}
}

export default userReducer;
