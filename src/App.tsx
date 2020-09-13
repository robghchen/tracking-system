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

		if (!currentUser) { // Fake the login
			this.setState({
				currentUser: {
					"id": 1,
					"email": "wesley@gmail.com",
					"jobs": [
						{
							"id": 1,
							"title": "frontend engineer",
							"salary": 150000,
							"rating": 4,
							"location": "new york",
							"description": "a bunch of stuff",
							"companyName": "Google",
							"companySize": 46980,
							"industry": "Tech",
							"status": "in person interview"
						},
						{
							"id": 2,
							"title": "backend engineer",
							"salary": 180000,
							"rating": 3,
							"location": "california",
							"description": "a bunch of stuff",
							"companyName": "Ray Bans",
							"companySize": 15585,
							"industry": "Glasses",
							"status": "phone interview"
						},
						{
							"id": 3,
							"title": "Engineer",
							"salary": 120000,
							"rating": 1,
							"location": "New York",
							"description": "car stuff",
							"companyName": "Nissan",
							"companySize": 2000,
							"industry": "vehicle",
							"status": "offer"
						},
						{
							"id": 4,
							"title": "frontend engineer",
							"salary": 150000,
							"rating": 5,
							"location": "new york",
							"description": "a bunch of stuff",
							"companyName": "Microsoft",
							"companySize": 46980,
							"industry": "Tech",
							"status": "in person interview"
						},
						{
							"id": 5,
							"title": "backend engineer",
							"salary": 180000,
							"rating": 3,
							"location": "california",
							"description": "a bunch of stuff",
							"companyName": "AirBnB",
							"companySize": 15585,
							"industry": "Glasses",
							"status": "technical interview"
						},
						{
							"id": 6,
							"title": "Engineer",
							"salary": 120000,
							"rating": 2,
							"location": "New York",
							"description": "car stuff",
							"companyName": "BMW",
							"companySize": 2000,
							"industry": "vehicle",
							"status": "technical interview"
						},
						{
							"id": 7,
							"title": "frontend engineer",
							"salary": 150000,
							"rating": 5,
							"location": "new york",
							"description": "a bunch of stuff",
							"companyName": "Netflix",
							"companySize": 46980,
							"industry": "Tech",
							"status": "in person interview"
						},
						{
							"id": 8,
							"title": "backend engineer",
							"salary": 180000,
							"rating": 1,
							"location": "california",
							"description": "a bunch of stuff",
							"companyName": "Ray Bans",
							"companySize": 15585,
							"industry": "Hulu",
							"status": "phone interview"
						},
						{
							"id": 9,
							"title": "Engineer",
							"salary": 120000,
							"rating": 4,
							"location": "New York",
							"description": "car stuff",
							"companyName": "Glassdoor",
							"companySize": 2000,
							"industry": "vehicle",
							"status": "phone interview"
						},
						{
							"id": 10,
							"title": "Engineer",
							"salary": 120000,
							"rating": 4,
							"location": "New York",
							"description": "car stuff",
							"companyName": "Mercedes",
							"companySize": 2000,
							"industry": "vehicle",
							"status": "technical interview"
						},
						{
							"id": 11,
							"title": "Engineer",
							"salary": 120000,
							"rating": 5,
							"location": "New York",
							"description": "car stuff",
							"companyName": "Tesla",
							"companySize": 2000,
							"industry": "vehicle",
							"status": "offer"
						}
					]
				}
			})
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
