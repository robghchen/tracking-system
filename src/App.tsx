import React from 'react';
import './App.css';
import axios from 'axios';
import JobsContainer from './containers/JobsContainer'
import UserUpdate from './components/UserUpdate'
import { Form, Button } from 'semantic-ui-react'
import { Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import DashboardContainer from './containers/DashboardContainer'
import Homepage from './containers/Homepage'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getUsersList } from './actions/userActions'
import { getCompanyList } from './actions/companyActions'

// Lesson 3 - Redux
// 	- setup
// 	- action
// 	- reducer
// 	- mapStateToProps
// 	- mapDispatchToProps

// 	Homework
// 	Redux https://www.freecodecamp.org/learn/front-end-libraries/redux/
// 	React and Redux https://www.freecodecamp.org/learn/front-end-libraries/react-and-redux/

interface AppProps {
	triggerGetCompanyList: () => void,
	triggerGetUsersList: () => void
	users: any[]
}

interface AppState {
	currentUser: any,
	userId: number
}

class App extends React.Component<AppProps, AppState> {
	state = {
		currentUser: null,
		userId: null,
	}

	async componentDidMount() {
		const { triggerGetUsersList } = this.props
		const users = await triggerGetUsersList()
		this.setState({ currentUser: users[0] })
	} t

	render() {
		const { currentUser } = this.state

		if (!currentUser) {
			return <div>No database found, try running command: npx json-server --watch db.json --port 3001</div>;
		}

		return (
			<div className="App" >
				<Navbar />
				<Switch>
					<Route path='/signup' component={UserUpdate} />
					<Route path='/dashboard' render={(props) => <DashboardContainer jobs={currentUser.jobs} />} />
					<Route path='/' render={(props) => {
						return <JobsContainer jobs={currentUser.jobs} />
					}} />
				</Switch>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return { users: state.usersData.users }
}

const mapDispatchToProps = dispatch => {
	return {
		triggerGetUsersList: () => dispatch(getUsersList()), // without using bindActionCreators
		triggerGetCompanyList: bindActionCreators(getCompanyList, dispatch) // using bindActionCreators
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
