import React from 'react'
import TeamsContainer from './TeamsContainer'
import { Team, Round } from '../constants/Interfaces'

interface TeamContainerProps {
	teams: Team[]
}

interface TeamContainerState {
	rounds: Round,
	currentRound: number,
}

const numVoters = 4
const pointsToWin = Math.floor((numVoters / 2) + 1)

class TeamContainer extends React.Component<TeamContainerProps, TeamContainerState> {
	state = {
		rounds: { 1: this.props.teams },
		currentRound: 1,
	}

	handleClickPoint = (teamID: number, subAdd: string): void => {
		const { rounds, currentRound } = this.state

		const currentRoundTeams = rounds[currentRound]

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
					points: updatedPoint
				}
			}

			return team
		})

		this.setState({ rounds: { ...rounds, [currentRound]: teamsUpdatedPoints } })
	}

	handleClickNextRound = (): void => {
		const { rounds } = this.state
		let { currentRound } = this.state
		const currentRoundTeams = rounds[currentRound]
		const nextRound = currentRound + 1

		const winners = [...currentRoundTeams].filter(team => {
			if (team.points >= pointsToWin) {
				return true
			}
			return false
		})

		if (winners.length < 1) {
			return
		}

		const resetWinners = winners.map(team => {
			return {
				id: team.id,
				teamName: team.teamName,
				points: 0
			}
		})

		this.setState({ rounds: { ...rounds, [nextRound]: resetWinners }, currentRound: currentRound + 1 })
	}

	renderTeamRows = (): {} => {
		const { rounds } = this.state

		return Object.keys(rounds).map((roundNumber) => {
			return <TeamsContainer rounds={rounds} roundNumber={parseInt(roundNumber)} handleClickPoint={this.handleClickPoint} />
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

