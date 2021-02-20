import React from 'react';
import axios from 'axios';
import './App.css';
import TournamentContainer from './containers/TournamentContainer'
import { Team } from './constants/Interfaces'

// Lesson 2.1 - More React 
// 	- tournament challenge
interface AppState {
	rounds: {
		[key: number]: Team[]
	}
}

class App extends React.Component<{}, AppState> {
	state = {
		rounds: {},
	}

	async componentDidMount() {
		try {
			// a good place to make network requests to get information
			const response = await axios.get('http://localhost:3001/rounds') // axios to get backend local host 3001/users

			this.setState({ rounds: response.data }) // update the state in this file
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		const { rounds } = this.state // destructure users from our state which came from our network request to our backend database

		if (Object.keys(rounds).length === 0) { // remember to handle edge case where data is not available yet to prevent app from crashing
			return null;
		}

		return (
			<div className="App" >
				{<TournamentContainer rounds={rounds} />}
				{/* pass teams as a prop to other file */}
			</div >
		)
	}
}

export default App;
