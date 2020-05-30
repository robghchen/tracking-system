import React from 'react';
import './App.css';
import axios from 'axios';
import TournamentContainer from './containers/TournamentContainer'
import { Team } from './constants/Interfaces'

// Lesson 2.1 - More React 
// 	- tournament challenge
interface AppState {
	teams: Team[]
}

class App extends React.Component<{}, AppState> {
	state = {
		teams: [],
	}

	async componentDidMount() {
		try {
			// a good place to make network requests to get information
			const response = await axios.get('http://localhost:3001/teams') // axios to get backend local host 3001/users

			this.setState({ teams: response.data }) // update the state in this file
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		const { teams } = this.state // destructure users from our state which came from our network request to our backend database

		if (teams.length === 0) { // remember to handle edge case where data is not available yet to prevent app from crashing
			return null;
		}

		return (
			<div className="App" >
				{<TournamentContainer teams={teams} />}
				{/* pass teams as a prop to other file */}
			</div >
		)
	}
}

export default App;
