1. install packages:

```
yarn add react-redux
yarn add react-router-dom
yarn add redux
yarn add redux-thunk
```

2. `add the following to src/index.js`

```
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);
```

3. `mkdir src/actions`

4. `touch src/actions/userActions.js`

```
import axios from 'axios';

export const FETCH_USERS_LIST = 'FETCH_USERS_LIST'

export const getUsersList = () => {
	return async (dispatch, getState) => {
		try {
			const response = await axios.get('http://localhost:3001/users')
			const users = response.data

			dispatch({ type: FETCH_USERS_LIST, payload: { users: users } })
		} catch (err) {
			console.error('err: ', err.message)
		}
	}
}
```

5. `mkdir src/reducers`
6. `touch src/reducers/userReducer.js`

```
import { FETCH_USERS_LIST } from '../actions/userActions';

const initialState = {
	users: [],
};

function userReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_USERS_LIST:
			return {
				...state,
				users: action.payload.users,
			};
		default:
			return state;
	}
}

export default userReducer;
```

7. `touch src/reducers/rootReducer.js`

```
import userReducer from './userReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	usersData: userReducer,
});

export default rootReducer;
```

8. use your actions and reducers from any component

    import the following:

```
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getUsersList } from './actions/userActions'
```

add the following to bottom of file:

```
const mapStateToProps = state => {
	return { users: state.usersData.users }
}

const mapDispatchToProps = dispatch => {
	return { triggerGetUsersList: bindActionCreators(getUsersList, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
```
