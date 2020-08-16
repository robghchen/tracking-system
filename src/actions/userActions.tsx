import axios from 'axios';


export const getUsersList = () => {
	console.log('function being called IN userActions')
	return async (dispatch, getState) => {
		try {
			const response = await axios.get('http://localhost:3001/users')
			const users = response.data
			console.log('users coming from db:', users)

			dispatch({ type: 'FETCH_USERS_LIST', payload: { users } })
		} catch (err) {
			console.error('err: ', err)
		}
	}
}

// update the global store so that the users array is empty
export const deleteUsersList = () => {
	return async (dispatch, getState) => {
		dispatch({
			type: 'DELETE_USERS',
			payload: {
				users: []
			}
		})

	}
}