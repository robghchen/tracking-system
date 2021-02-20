import React from 'react'
import { Team } from '../constants/Interfaces'

interface TeamCardProps {
	team: Team
	isWinner: boolean
	index: number
	roundNumber: number
	handleClickPoint: (teamId: number, subAdd: string) => void
	handleClickCard: (teamId: number, isClicked: boolean, roundNumber: number) => void
}

class TeamCard extends React.Component<TeamCardProps, null> {
	render() {
		const { team, isWinner, index, roundNumber, handleClickPoint, handleClickCard } = this.props

		let teamColor: string = 'red'
		let cardClicked: string = 'card-not-clicked'

		if (index % 2 === 0) {
			teamColor = 'blue'
		}

		if (team.points > 0 || team.isClicked) {
			cardClicked = 'card-clicked'
		}

		if (isWinner) {
			return (
				<div className={`team-card ${teamColor} ${cardClicked}`} key={team.id}>
					<h2><span role="img" aria-label="crown">👑</span> WINNER <span role="img" aria-label="crown">👑</span></h2>
					<h1>{team.teamName}</h1>
				</div>
			)
		}

		return (
			<div className={`team-card ${teamColor} ${cardClicked}`} key={team.id} onClick={() => handleClickCard(team.id, team.isClicked, roundNumber)}>
				<p>{team.teamName}</p>
				<p>Points: {team.points}</p>
				<span className="button" onClick={() => handleClickPoint(team.id, 'minus')}> - </span> <span className="button" onClick={() => handleClickPoint(team.id, 'plus')}> + </span>
			</div>
		)
	}
}

export default TeamCard


