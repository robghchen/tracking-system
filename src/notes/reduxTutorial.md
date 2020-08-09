0. create a new app for this tutorial

```
yarn create react-app nameOfApp
cd nameOfApp
```

1. install packages:

```
yarn add react-redux
yarn add react-router-dom
yarn add redux
yarn add redux-thunk
```

2. `add the following to src/index.js (keep the stuff that was already there)`

```
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
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

3. `yarn add json-server` (this has nothing to do with redux, it's just to create a mock database so we can fake getting info from it)

4. `yarn add axios` (this is also unrelated to redux, it's just for making a fetch request and i like axios)

5. create db.json on the top level of app `touch db.json`

6. fill it up with some mock data:

```
{
	"users": [
		{"id": 1, "email": "someemail@email.com"}
	]
}
```

7. `npx json-server --watch db.json --port 3001` (this terminal is now taken, so open a new one)

8. `mkdir src/actions`

9. `touch src/actions/userActions.js`

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

10. `mkdir src/reducers`
11. `touch src/reducers/userReducer.js`

```
import { FETCH_USERS_LIST } from '../actions/userActions';

const initialState = {
	users: [],
};

function userReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_USERS_LIST:
			const { users } = action.payload;
			return {
				...state,
				users: users,
			};
		default:
			return state;
	}
}

export default userReducer;
```

12. `touch src/reducers/rootReducer.js`

```
import userReducer from './userReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	usersData: userReducer,
});

export default rootReducer;
```

13. use your actions and reducers from any component

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

14. you can now access this.props.triggerGetUsersList from anywhere in this component
