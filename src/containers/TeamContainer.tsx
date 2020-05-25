import React from 'react'
//import JobCard from '../components/JobCard'
//import JobRow from '../components/JobRow'

interface TeamContainerProps {
	roundOne: any
}

interface TeamContainerState {
	roundOne: any,
	roundTwo: any,
	roundThree: any,
	currentRound: number, 
	winner: any,
	[x: string]: any
}

class TeamContainer extends React.Component<TeamContainerProps, TeamContainerState> {
	state = {
		  roundOne: [],
		  roundTwo: [],
		  roundThree: [],
		  winner: [],
		  currentRound: 1
	}

	componentDidMount () {
		this.setState({ roundOne: this.props.roundOne })
	}

	// General Guidelines for clean code
	// one source truth
	// DRY (don't repeat yourself)
	// separation of concerns

	handleClickPoint = (teamID, subAdd) => {
		const { roundOne, roundTwo, roundThree } = this.state
		let {currentRound} = this.state
		let roundDesignation = []
		let roundKey = ''

		if(currentRound === 1){
			roundKey = 'roundOne'
			roundDesignation = roundOne
		}
		if(currentRound === 2){
			roundKey = 'roundTwo'
			roundDesignation = roundTwo
		}
		if(currentRound === 3){
			roundKey= 'roundThree'
			roundDesignation = roundThree
		}
		

		const updatedteamsClicked = [...roundDesignation].map(team => {
			let updatedPoint = team.points

			if (teamID === team.id && subAdd === 'plusPoint') {
				updatedPoint = team.points += 1
			}

			if (teamID === team.id && subAdd === 'minusPoint') {
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
			this.setState({[roundKey]: updatedteamsClicked})
	}

	handleClickNextRd = () =>{
		const { roundOne, roundTwo, roundThree } = this.state
		let { currentRound } = this.state
		let roundKey = ''
		let roundDesignation = []
		
		if(currentRound === 1){
			roundKey = 'roundTwo'
			roundDesignation = roundOne
		}

		if(currentRound === 2){
			roundKey = 'roundThree'
			roundDesignation = roundTwo
		}

		if(currentRound === 3){
			roundKey = 'winner'
			roundDesignation = roundThree
		}
	
		const winnerSec = [...roundDesignation].filter(team=>{
			if(team.points >= 6) {
				return true
			} 
			return false
		})

		const updatedWinners = winnerSec.map(team=>{
			return {
				id: team.id,
				teamName: team.teamName,
				points: 0					
			}
		})		
		
		this.setState({[roundKey]: updatedWinners, currentRound: currentRound+=1})
		
	// we still need to create pairings to go against each other (versus)
	// what if all roundOne are >= 6 points?
	}

	renderAnyRd = (teamsFromAnyRound) =>{
		return teamsFromAnyRound.map(team=>{
			return <div className="team-card" key={team.id}>
				<p>team: {team.teamName}</p>
				<p>points: {team.points}</p>
				<span onClick={() => this.handleClickPoint(team.id, 'minusPoint')} > - </span>
				<span onClick={() => this.handleClickPoint(team.id, 'plusPoint')} > + </span>
				</div>
			})
	}

	// so far:
	// get roundOne from database into App.tsx
	// pass roundOne down from App.tsx to TeamContainer.tsx
	// render each team showing teamName and points
	// able to add a point to the team that was clicked

	
	
	render() {
		// bring in 6 roundOne from database (randomization of 1v1 pairings) //checked would need RNG that takes away from number pool
		// ++points function to change database to add points 
		// if conditional comparison between roundOne that are paired to points to determine winner (best out of 10 rounds)
		// create new Array or alter db.json to to store rounds with the team with the higher point - push the winner to this array?
		//function to "send down" winning team
		//if team points are tied, reset to 0 points
		// const { roundOne } = this.props;
		// const { isSortByteamName, teamsClicked, points } = this.state;

		
		// let teamsToRender = [...roundOne] 
		
		const { roundOne, roundTwo, roundThree, winner, currentRound } = this.state

		return <div className="team-container">
			<div className="team-row">
				{this.renderAnyRd(roundOne)}
			</div>

			<div className="team-row">
				{this.renderAnyRd(roundTwo)}
			</div>

			<div className="team-row">
				{this.renderAnyRd(roundThree)}
			</div> 
			<div className="team-row">
				{this.renderAnyRd(winner)}
			</div>
			<div onClick={() => this.handleClickNextRd()} > Next Round! </div>
			</div>
		
		
		
	
	}
}
export default TeamContainer





// {/* <button onClick={() => this.toggleClick(true)}>hamburger icon</button>
// 				<button onClick={() => this.toggleClick(false)}>reverseHam</button>
// 				<div className={'job-container'}>
// 					{/* we have to use onClick to tag our buttons with the functions that we created */}
// 					<button onClick={() => this.toggleSort('salary')}>Salary</button>
// 					<button onClick={() => this.toggleSort('rating')}>Best Rated</button>
// 					<button onClick={() => this.toggleSort('location')}>Location</button>
// 					<button onClick={() => this.toggleSort('recent')}>Recent</button>
// 					{jobsToRender.map(job => {
// 						// earlier we were keeping track of what jobs were clicked by updating our state with the id of the jobs that were clicked
// 						// if the job in this loop exists in our jobsClicked array, then we want to show the JobRow instead of the JobCard
// 						if (jobsClicked.includes(job.id) === true) {
// 							return <JobRow job={job} handleClickJobRow={this.handleClickJobRow} />
// 						}
// 						return <JobCard job={job} handleClickJobCard={this.handleClickJobCard} />
// 					})}

// 				</div> */}

