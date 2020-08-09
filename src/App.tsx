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

// Lesson 3 - Redux
// 	- setup
// 	- action
// 	- reducer
// 	- mapStateToProps
// 	- mapDispatchToProps

// 	Homework
// 	Redux https://www.freecodecamp.org/learn/front-end-libraries/redux/
// 	React and Redux https://www.freecodecamp.org/learn/front-end-libraries/react-and-redux/


class App extends React.Component {
	state = {
		currentUser: null,
		userId: ''
	}

	async componentDidMount() {
		try {
			const response = await axios.get('http://localhost:3001/users')

			this.setState({ currentUser: response.data[0] })
		} catch (error) {
			console.log(error)
		}
	}

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

export default App;
