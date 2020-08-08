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

// TODO get currentUser into redux with Google Login
class App extends React.Component {
	state = {
		currentUser: null,
		seeForm: false,
		userId: ''
	}

	toggleForm = () => {
		const { seeForm } = this.state
		this.setState({ seeForm: !seeForm })
	}

	renderSignUpForm = () => {
		const { seeForm } = this.state
		if (seeForm === true) {
			return <UserUpdate />
		}
	}
	handleChange = (event, value) => {
		this.setState({
			[value.name]: value.value
		})
	}

	render() {
		// anytime we update state with setState(), that will trigger a rerender
		// console.log('render')
		const { currentUser } = this.state // destructure users from our state which came from our network request to our backend database

		return (
			<div className="App" >
				<Navbar />
				<Switch>
					<Route path='/signup' component={UserUpdate} />
					<Route path='/dashboard' render={(props) => <DashboardContainer jobs={currentUser?.jobs} />} />
					<Route path='/' render={(props) => {
						if (currentUser) {
							return <JobsContainer jobs={currentUser.jobs} />
						}
						else {
							return <Homepage />
						}
					}} />
				</Switch>
			</div>

		)

	}
}

export default App;
