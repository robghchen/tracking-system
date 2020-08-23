0. create a new app for this tutorial

```
yarn create react-app nameOfApp
cd nameOfApp
```

0.1. `yarn add json-server` (this has nothing to do with redux, it's just to create a mock database so we can fake getting info from it)

0.2. `yarn add axios` (this is also unrelated to redux, it's just for making a fetch request and i like axios)

0.3. create db.json on the top level of app `touch db.json`

0.4. fill it up with some mock data:

```
{
	"users": [
		{"id": 1, "email": "someemail@email.com"}
	]
}
```

0.5. `npx json-server --watch db.json --port 3001` (this terminal is now taken, so open a new one)

1. install packages (redux begins here)

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

3. `mkdir src/actions`

4. `touch src/actions/userActions.js`

```
import axios from 'axios';


export const getUsersList = () => {
	return async (dispatch, getState) => {
		try {
			const response = await axios.get('http://localhost:3001/api/v1/users')
			const users = response.data

			dispatch({ type: 'FETCH_USERS_LIST', payload: { users: users } })
		} catch (err) {
			console.error('err: ', err.message)
		}
	}
}
```

5. `mkdir src/reducers`
6. `touch src/reducers/userReducer.js`

```
const initialState = {
	users: [],
};

function userReducer(state = initialState, action) {
	switch (action.type) {
		case 'FETCH_USERS_LIST': {
			const { users } = action.payload;
			return {
				...state,
				users: users,
			};
		}
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

9. you can now access this.props.triggerGetUsersList from anywhere in this component

10. you can also access this.props.users from anywhere after you call triggerGetUsersList

11. `yarn start`

12. install chrome extension "redux dev-tools" if you don't already have it. use the extension to see if the users array shows up in your global state (aka the store)
