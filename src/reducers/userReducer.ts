const initialState = {
	users: [],
};

function userReducer(state = initialState, action) {
	console.log('in userReducer');
	switch (action.type) {
		case 'FETCH_USERS_LIST':
			return {
				...state,
				users: action.payload.users,
			};
		case 'DELETE_USERS':
			return {
				...state,
				users: action.payload.users,
			};
		default:
			return state;
	}
}

export default userReducer;
