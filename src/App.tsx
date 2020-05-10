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
// o helper methods (it's just another function)

// Exercise 1 - Practice using console.log and debugger religously!
// The solutions are provided at the bottom of the file if you really need it, it's commented out
// a. inside render function, create a new array called recentMovies with 5 movie objects each with the keys 'title' and 'ranking', give them values of your choice

// b. create a new object called aboutMe with the key and value of recentMovies array

// c. create a helper method above render() called showAllMovies(), pass in the aboutMe object to render the titles of your recent movies (all 5 of them) to chrome browser with .map
// Note: your movie titles are probably going to be jumbled together, try wrapping a <p> tag around it like so:
// return <p>{movie.title}</p>

// d. Comment out showAllMovies() where we call the function. Create another helper method called showTopTwoMovies(). This time pass in the aboutMe object's recentMovies array instead of the whole aboutMe object. Use a combination of .filter and .map to only render the titles with a ranking lower than 3.

// e. In your showTopTwoMovies() function, inside of the .map, I want you to add an if condition to change the top ranking movie title to all caps. but how you ask? time to practice googling!

// Vocabulary: 'refactor' is a word that is commonly used in programming, it means to adjust code
// f. Stretch goal!! Refactor your showAllMovies() helper function so that you can use it inside of showTopTwoMovies() instead of doing .map
// We will start Lesson 2 with the solution to this

// Exercise 2 - Get comfortable with if conditions using && and ||
// a. Make a new array called petsIWant with 10 objects with the key value pair of 'animal: string', 'isFluffy: boolean', 'isFly: boolean', 'isExtinct: boolean'

// b. Add petsIWant array to aboutMe object

// c. Create a helper method that renders only the pets that are fluffy or can fly

// New info: exclamation mark ! means NOT
// if (!isFluffy) {
// this means if false then do something
// }

// d. Create a helper method that renders only the pets that are not fluffy and cannot fly or is extinct
// Note: use parenthesis to indicate order of operations, exactly like math (5 + 1) / 2

// e. Create a helper method that renders animals with a length greater than 5 or cannot fly or is fluffy

// Exercise 3 - Put it all together
// a. Add keys 'wouldWatchAgain: boolean', 'wouldRecommendToGrandma: boolean', and 'animalsInMovie: array[string]' to each recent movie
// make it up for the animalsInMovie array

// b. Render only the movies that you would watch again or has animals that can fly

// c. Render only the movies that you would recommend to grandma and has animals that are fluffy or ranks in the top two

// d. Render only the pets that are in a movie

// e. Render the pets that are extinct and pets that are in movies that you would not watch again


class App extends React.Component {
	render() {
		return (
			<div className="App" >
				<header className="App-header">
					{'Call your helper methods inside the brackets here'}
				</header>
			</div >
		);
	}
}

// Try your best! Solutions are below

// class App extends React.Component {
// 	showAllMovies = (aboutMe) => {
// 		return aboutMe.recentMovies.map(movie => {
// 			return <p>{movie.title}</p>
// 		})
// 	}

// 	showTopTwoMovies = (recentMovies) => {
// 		const topTwoMovies = recentMovies.filter(movie => movie.ranking < 3)

// 		return topTwoMovies.map(movie => {
// 			if (movie.ranking === 1) {
// 				return <p>{movie.title.toUpperCase()}</p>
// 			}

// 			if (movie.ranking === 2) {
// 				return <p>{movie.title}</p>
// 			}
// 		})
// 	}

// 	render() {
// 		const recentMovies = [
// 			{ title: 'The Greatest Showman', ranking: 1 },
// 			{ title: 'Train To Busan', ranking: 2 },
// 			{ title: 'Knives Out', ranking: 3 },
// 			{ title: 'A Star is Born', ranking: 4 },
// 			{ title: 'Mission Impossible Fallout', ranking: 5 },
// 		]
// 		const aboutMe = {
// 			recentMovies
// 		}

// 		return (
// 			<div className="App" >
// 				<header className="App-header">
// 					{/* {this.showAllMovies(aboutMe)} */}
// 					{this.showTopTwoMovies(aboutMe.recentMovies)}
// 				</header>
// 			</div >
// 		);
// 	}
// }

export default App;
