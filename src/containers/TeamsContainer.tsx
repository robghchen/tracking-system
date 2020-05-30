import React from 'react'
import TeamCard from "../components/TeamCard";
import { Team } from '../constants/Interfaces'

interface TeamsContainerProps {
	rounds: {
		[key: number]: Team[]
	}
	roundNumber: number
	handleClickPoint: (teamId: number, subAdd: string) => void
	handleClickCard: (teamId: number, isClicked: boolean, roundNumber: number) => void
}

class TeamsContainer extends React.Component<TeamsContainerProps, null> {
	renderTeamCards = (): {} => {
		const { rounds, roundNumber, handleClickPoint, handleClickCard } = this.props
		const thisRoundTeams: Team[] = rounds[roundNumber]
		const isWinner: boolean = thisRoundTeams.length === 1

		return [...thisRoundTeams].map((team, index) => {
			return <TeamCard team={team} isWinner={isWinner} index={index} roundNumber={roundNumber} handleClickPoint={handleClickPoint} handleClickCard={handleClickCard} />

		})
	}

	render() {
		const { roundNumber } = this.props

		return (
			<div className="teams-container" key={`round ${roundNumber}`} >
				{this.renderTeamCards()}
			</div>
		)
	}
}

export default TeamsContainer


