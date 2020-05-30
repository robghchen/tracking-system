import React from 'react'

interface TeamCardProps {
	team: any
	isWinner: boolean
	index: number
	handleClickPoint: any
}

interface TeamCardState {
	isClicked: boolean
}

class TeamCard extends React.Component<TeamCardProps, TeamCardState> {
	state = {
		isClicked: false
	}

	handleClickCard = () => {
		const { isClicked } = this.state

		this.setState({ isClicked: !isClicked })
	}

	render() {
		const { team, isWinner, index, handleClickPoint } = this.props
		const { isClicked } = this.state

		let teamColor = 'red'
		let cardClicked = 'card-not-clicked'

		if (index % 2 === 0) {
			teamColor = 'blue'
		}

		if (team.points > 0 || isClicked) {
			cardClicked = 'card-clicked'
		}

		if (isWinner) {
			return (
				<div className={`team-card ${teamColor} ${cardClicked}`} key={team.id}>
					<h2>WINNER <span role="img" aria-label="crown">👑</span></h2>
					<h1>{team.teamName}</h1>
				</div>
			)
		}

		return (
			<div className={`team-card ${teamColor} ${cardClicked}`} key={team.id} onClick={this.handleClickCard}>
				<p>{team.teamName}</p>
				<p>Points: {team.points}</p>
				<span className="button" onClick={() => handleClickPoint(team.id, 'minus')}> - </span> <span className="button" onClick={() => handleClickPoint(team.id, 'plus')}> + </span>
			</div>
		)
	}
}

export default TeamCard


