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

class App extends React.Component {
	getRedCharacters = (info) => {
		const redCharacters = []

		info.favoriteCharacters.forEach(char => {
			if (char.color === 'red') {
				redCharacters.push(char.name)
			}
		})

		return redCharacters
	}

	allNotCool = (info) => {
		const updatedCharacters = info.favoriteCharacters.map(char => {
			let updatedChar = char

			updatedChar.isCool = false;

			return updatedChar
		})

		return updatedCharacters
	}

	isABruce = (character) => {
		return character.realName.includes('Bruce')
	}

	findCharacter = (info, trueOrFalse) => {
		const character = info.favoriteCharacters.find(char => char.isVillain === trueOrFalse)

		return character
	}

	isCharacterHere = (info, name) => {
		return info.favoriteCharacters.some(char => char.name === name)
	}

	getVillains = (info) => {
		return info.favoriteCharacters.filter(char => char.isVillain)
	}

	render() {
		const info = {
			hasCodedBefore: true,
			occupation: 'software engineer',
			favoriteCharacters: [
				{
					name: 'spiderman',
					color: 'red',
					isVillain: false,
					realName: 'Peter Parker',
					isCool: false
				},
				{
					name: 'batman',
					color: 'grey',
					isVillain: false,
					realName: 'Bruce Wayne',
					isCool: false
				},
				{
					name: 'joker',
					color: 'purple',
					isVillain: true,
					realName: 'Jack Napier',
					isCool: true
				},
				{
					name: 'thePenguin',
					color: 'white',
					isVillain: true,
					realName: 'idk',
					isCool: true
				},
				{
					name: 'hulk',
					color: 'green',
					isVillain: false,
					realName: 'Bruce Banner',
					isCool: true
				},
				{
					name: 'drStrange',
					color: 'red',
					isVallain: false,
					realName: 'Benedict Cumberbatch',
					isCool: true
				}
			],
		}

		const redCharacters = this.getRedCharacters(info)
		console.log('redCharacters:', redCharacters)

		const notCool = this.allNotCool(info)
		console.log('notCool:', notCool)

		const isFirstCharacterBruce = this.isABruce(info.favoriteCharacters[0])
		console.log('isFirstCharacterBruce:', isFirstCharacterBruce)

		const isSecondCharacterBruce = this.isABruce(info.favoriteCharacters[1])
		console.log('isSecondCharacterBruce:', isSecondCharacterBruce)

		const findFirstVillain = this.findCharacter(info, true)
		console.log('findVillain:', findFirstVillain)

		const findFirstNonVillain = this.findCharacter(info, false)
		console.log('findFirstNonVillain:', findFirstNonVillain)

		const isCharacterHere = this.isCharacterHere(info, 'drStrange')
		console.log('isCharacterHere:', isCharacterHere)

		const getVillains = this.getVillains(info)
		console.log('getVillains:', getVillains)

		return (
			<div className="App" >
				<header className="App-header">
					{}
				</header>
			</div >
		);
	}
}

export default App;
