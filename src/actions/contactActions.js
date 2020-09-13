import axios from 'axios';

export const getContactsList = () => {
	return async (dispatch, getState) => {
		try {
			const response = await axios.get('https://tracking-system-api.herokuapp.com/api/v1/contacts');
			const contacts = response.data;

			dispatch({ type: 'FETCH_CONTACTS_LIST', payload: { contacts: contacts } });
		} catch (err) {
			console.error('err: ', err.message);
		}
	};
};
