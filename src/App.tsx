import React from 'react';
import './App.css';
import axios from 'axios';
import JobsContainer from './containers/JobsContainer'
import UserUpdate from './components/UserUpdate'
import { Form, Button } from 'semantic-ui-react'
import { Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

// Lesson 2 - React
// o JSON server mock databse // the command to run the mock database is in commands.txt file inside of the notes folder
// o state
// o props
// o component life cycle
// o start building the frontend

// Assignment
// 1. When clicking a row, toggle that row back into a card
// 2. Do the flexboxfroggy.com tutorial, then get the sort buttons to show above the job cards
// 3. When clicking the hamburger icon, toggle all cards to become rows
// 4. When clicking the 4 squares icon, toggle all rows to become cards
// 5. Filter jobs rendered by Job Title

// Lesson 2.1 - More React 
// 	- tournament challenge	
// 	- semantic UI


class App extends React.Component {
	state = {
		users: [],
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

	async componentDidMount() {
		try {
			// a good place to make network requests to get information
			// console.log('componentDidMount')
			const response = await axios.get('http://localhost:3001/users') // axios to get backend local host 3001/users

			this.setState({ users: response.data }) // update the state in this file
		} catch (error) {
			console.log(error)
		}
	}

	async getUsers() {
		try {
			// a good place to make network requests to get information
			// console.log('componentDidMount')
			const response = await axios.get('http://localhost:3001/users') // axios to get backend local host 3001/users

			this.setState({ users: response.data }) // update the state in this file
		} catch (error) {
			console.log(error)
		}
	}

	handleDelete = async event => {
		const { userId } = this.state
		try {
			await axios.delete(`http://localhost:3001/users/${userId}`)
		} catch (error) {
			console.log(error)
		}
	}


	// two other common component life cycle methods:

	// componentDidUpdate(prevProps, prevState) { 
	// // if our props or state changes, then this function will get called. we'll use this when the need for it comes up, for now just know that it exists
	// 	console.log("componentDidUpdate")
	// 	console.log('prevState:', prevState)
	// 	console.log('currentState:', this.state)
	// }

	// componentWillUnmount() { 
	// // reset to default state when we're done with this component (as in the user goes to a different page)
	// 	console.log('componentWillUnmount')
	// 	this.setState({
	// 		users: []
	// 	})
	// }
	handleChange = (event, value) => {
		console.log('value:', value.name)
		console.log('value:', value)

		this.setState({
			[value.name]: value.value
		})
	}
	render() {
		// anytime we update state with setState(), that will trigger a rerender
		// console.log('render')
		const { users } = this.state // destructure users from our state which came from our network request to our backend database
		const { userId } = this.state

		if (users.length === 0) { // remember to handle edge case where data is not available yet to prevent app from crashing
			return null;
		}

		const wesley = users[0] // for now, we can hard code the first user, but when we have a real database we'll have to find the user with their login credentials, probably by the user's email
		return (
			<div className="App" >
				<Navbar />
				<Switch>
					<Route path='/signup' component={UserUpdate} />
					<Route path='/' render={(props) => <JobsContainer jobs={wesley.jobs} getUsers={this.getUsers} />} />
					
				
				</Switch>

				<Form onSubmit={this.handleDelete}>
					<Form.Field>
						<label>ID to Delete</label>
						<Form.Input onChange={this.handleChange} name='userId' value={userId} placeholder='id' />
					</Form.Field>

				</Form>


			</div>

		)

	}
}

export default App;
