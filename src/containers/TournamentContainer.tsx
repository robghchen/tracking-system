import React from 'react'
import axios from 'axios';
import TeamsContainer from './TeamsContainer'
import { Team } from '../constants/Interfaces'

interface TeamContainerProps {
	rounds: {
		[key: number]: Team[]
	},
}

interface TeamContainerState {
	rounds: {
		[x: number]: Team[]
	},
	currentRound: number,
}

const numVoters = 3
const pointsToWin = Math.floor((numVoters / 2) + 1)

class TeamContainer extends React.Component<TeamContainerProps, TeamContainerState> {
	state = {
		rounds: {
			1: this.props.rounds[1]
		},
		currentRound: 1,
	}

	componentDidMount() {
		const { rounds } = this.props
		const currentRound = Object.keys(rounds).length

		this.setState({ rounds, currentRound })
	}

	handleClickPoint = (teamID: number, subAdd: string): void => {
		const { rounds, currentRound } = this.state
		const currentRoundTeams: Team[] = rounds[currentRound]
		const teamsUpdatedPoints = [...currentRoundTeams].map(team => {
			let updatedPoint = team.points

			if (teamID === team.id && subAdd === 'plus') {
				updatedPoint = team.points += 1
			}

			if (teamID === team.id && subAdd === 'minus') {
				updatedPoint = team.points -= 1
			}

			if (team.id === teamID) {
				return {
					id: team.id,
					teamName: team.teamName,
					points: updatedPoint,
					isClicked: true
				}
			}

			return team
		})

		this.setState({ rounds: { ...rounds, [currentRound]: teamsUpdatedPoints } })
	}

	handleClickCard = (teamId: number, isClicked: boolean, roundNumber: number): void => {
		const { rounds } = this.state;
		const currentRoundTeams: Team[] = rounds[roundNumber]
		const updatedRound = [...currentRoundTeams].map(team => {
			if (team.id === teamId) {
				return { ...team, isClicked: !isClicked }
			}

			return team
		})

		this.setState({ rounds: { ...rounds, [roundNumber]: updatedRound } })
	}

	handleClickNextRound = (): void => {
		const { rounds } = this.state
		let { currentRound } = this.state
		const currentRoundTeams: Team[] = rounds[currentRound]
		const nextRound: number = currentRound + 1

		const winners: Team[] = [...currentRoundTeams].filter(team => {
			if (team.points >= pointsToWin) {
				return true
			}
			return false
		})

		if (winners.length < 1) {
			return
		}

		const resetWinners: Team[] = winners.map(team => {
			return {
				id: team.id,
				teamName: team.teamName,
				points: 0,
				isClicked: false
			}
		})

		const updatedRounds = { ...rounds, [nextRound]: resetWinners }

		this.setState({ rounds: updatedRounds, currentRound: currentRound + 1 })

		axios.post('http://localhost:3001/rounds', { ...updatedRounds })
	}

	renderTeamRows = (): {} => {
		const { rounds } = this.state

		return Object.keys(rounds).map((roundNumber) => {
			return <TeamsContainer rounds={rounds} roundNumber={parseInt(roundNumber)} handleClickPoint={this.handleClickPoint} handleClickCard={this.handleClickCard} />
		})
	}


	render() {
		return (
			<div>
				<br />
				<h3>Points to Win: {pointsToWin}</h3>
				<div className="team-container">
					{this.renderTeamRows()}
				</div>
				<br />
				<button className="gradient-button" onClick={this.handleClickNextRound} > Next Round!</button>
			</div>
		)
	}
}
export default TeamContainer

