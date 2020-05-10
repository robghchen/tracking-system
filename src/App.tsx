import React from 'react';
import logo from './logo.svg';
import './App.css';


// Lesson 1 - Javascript
// o boolean
// o string
// o number
// o array
// o object
// o function
// o helper methods

// Practice
// create a new array called favoriteMovies with 5 movie objects with the keys of title and ranking
// add the new favoriteMovies array to our info object
// use the info object to render the titles of your favorite movies (all 5 of them) to chrome browser
// with the info object's favoriteMovies array, use .forEach and if to only render the titles with a ranking greater 3. only your top two favorite movies should show up in chrome.
// now use .map instead of .forEach to render your top two favorite movies but change the top ranking movie title to all caps

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

		return hasCodedBefore
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

		return hasCodedBefore

	}

	rob = (hero) => {
		const hasCodedBefore = true
		const occupation = 'software eng'
		const monthsCoded = 12
		// const favoriteCharacters = ['spiderman', 'W']
		// const aaaaaaa = 'a'
		// const isIncludesW = favoriteCharacters.includes('000')
		// favoriteCharacters.forEach(character => {
		// 	// do stuff here
		// 	console.log(character)
		// })
		const info = {
			hasRobCodedBefore: hasCodedBefore,
			robsOccupation: occupation,
			favoriteCharacters: [
				{
					name: 'spiderman',
					color: 'red',
					isCool: false
				},
				{
					name: 'batman',
					color: 'grey',
					isCool: false
				},
				{
					name: 'thePenguin',
					isVillain: true,
					isCool: true
				},
				{
					name: 'hulk',
					isVillain: false,
					realName: 'Bruce Banner',
					isCool: true
				},
				{
					name: 'drStrange',
					isVallain: false,
					isCool: true
				}
			],
		}

		const isHeroFound = info.favoriteCharacters.some(character => character.name === hero)

		if (isHeroFound) {
			return hero
		} else {
			return 'Hero not found'
		}
	}

	render() {
		const hero = 'spiderlady'
		const villain = 'venom'

		const robFavChars = this.rob(hero) // spiderman
		console.log('robFavChars:', robFavChars)
		const robsLeastFavChar = this.rob(villain) // vemon

		return (
			<div className="App" >
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						{}
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
