import React from 'react'
import TeamCard from "../components/TeamCard";
import { Team } from '../constants/Interfaces'

interface TeamsContainerProps {
	rounds: {
		[x: number]: Team[]
	}
	roundNumber: number
	handleClickPoint: (teamId, subAdd) => void
}

class TeamsContainer extends React.Component<TeamsContainerProps, null> {
	renderTeamCards = (): {} => {
		const { rounds, roundNumber, handleClickPoint } = this.props
		const thisRoundTeams: Team[] = rounds[roundNumber]
		const isWinner: boolean = thisRoundTeams.length === 1

		return [...thisRoundTeams].map((team, index) => {
			return <TeamCard team={team} isWinner={isWinner} index={index} handleClickPoint={handleClickPoint} />

		})
	}

	render() {
		const { roundNumber } = this.props

		return <div className="teams-container" key={`round ${roundNumber}`} >
			{this.renderTeamCards()}
		</div>
	}
}

export default TeamsContainer


