import axios from 'axios';

export const FETCH_USERS_LIST = 'FETCH_USERS_LIST'

export const getUsersList = () => {
	return async (dispatch, getState) => {
		try {
			const response = await axios.get('http://localhost:3001/users')
			const users = response.data
			console.log('users:', users)

			dispatch({ type: FETCH_USERS_LIST, users })
		} catch (err) {
			console.error('err: ', err)
		}
	}
}