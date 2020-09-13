import React from 'react';
import './App.css';
import JobsContainer from './containers/JobsContainer'
import UserUpdate from './components/UserUpdate'
import { Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import DashboardContainer from './containers/DashboardContainer'

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
	}

	render() {
		const { currentUser } = this.state

		if (!currentUser) {
			return <div>Loading...</div>;
		}

		return (
			<div className="App" >
				<Navbar />
				<Switch>
					<Route path='/signup' component={UserUpdate} />
					<Route path='/dashboard' render={(props) => <DashboardContainer currentUser={currentUser} />} />
					<Route path='/' render={(props) => {
						return <JobsContainer currentUser={currentUser} />
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
