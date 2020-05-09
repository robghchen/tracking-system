import React from 'react';
import logo from './logo.svg';
import './App.css';


// Lesson 1 - Javascript
// - boolean
// - string
// - number
// - array
// - object
// - function
// - helper methods

class App extends React.Component {
	amy = () => {
		const hasCodedBefore = false // boolean
		const occupation = 'sales' // string
		const monthsCoded = 0 // number
		const favoriteCharacters = ['Astrid', 'Hannabal Lector'] // array

		const isIncludesAstrid = favoriteCharacters.includes('Astrid') // true or false

		// favoriteCharacters.forEach(character => {
		// 	console.log(character)
		// })
		//console.log('amy', isIncludesAstrid)
		const info = {
			hasAmyCodedBefore: hasCodedBefore,
			amyOccupation: occupation,
		}
		console.log(info)
	}

	wesley = () => {
		const hasCodedBefore = true
		const occupation = 'unemployed'
		const monthsCoded = 30
		const favoriteCharacters = ['W', '7', 'Hello World']
		const isIncludesW = favoriteCharacters.includes('W')

		// favoriteCharacters.forEach(character => {
		// 	console.log(character)
		// })
		//console.log('wesley', isIncludesW)

		const info = {
			hasWesCodedBefore: hasCodedBefore,
			wesOccupation: occupation,
		}

		const infoHasWes = info.hasWesCodedBefore
		console.log({ infoHasWes })
	}

	rob = () => {
		const hasCodedBefore = true
		const occupation = 'software eng'
		const monthsCoded = 12
		const favoriteCharacters = ['spiderman', 'W']
		const isIncludesW = favoriteCharacters.includes('000')
		// favoriteCharacters.forEach(character => {
		// 	// do stuff here
		// 	console.log(character)
		// })
		const info = {
			hasRobCodedBefore: hasCodedBefore,
			robsOccupation: occupation,

		}

		console.log(info.hasRobCodedBefore)
	}

	render() {
		this.amy()
		this.wesley()
		this.rob()

		return (
			<div className="App" >
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Edit <code>src/App.tsx</code> and save to reload.
			</p>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
			</a>
				</header>
			</div >
		);
	}
}

export default App;
