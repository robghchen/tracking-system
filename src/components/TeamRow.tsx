import React from 'react'
import TeamCard from "./TeamCard";

interface TeamRowProps {
	rounds: any
	roundNumber: any
	handleClickPoint: any
}

class TeamRow extends React.Component<TeamRowProps, null> {
	render() {
		const { rounds, roundNumber, handleClickPoint } = this.props
		const thisRoundTeams = rounds[roundNumber]
		const isWinner = thisRoundTeams.length === 1

		return <div className="team-row" key={`round ${roundNumber}`} >
			{[...thisRoundTeams].map((team, index) => {
				return <TeamCard team={team} isWinner={isWinner} index={index} handleClickPoint={handleClickPoint} />

			})}
		</div>
	}
}

export default TeamRow


