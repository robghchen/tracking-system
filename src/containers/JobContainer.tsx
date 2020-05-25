import React from 'react'
import JobCard from '../components/JobCard'
import JobRow from '../components/JobRow'

interface JobContainerProps {
	jobs: any[]

}

interface JobContainerState {
	//Filtered States:
	isSortBySalary: boolean
	isSortByRating: boolean
	isSortByLocation: boolean
	isSortByRecent: boolean
	//jobCard Clicked status
	jobsClicked: any

}

class JobContainer extends React.Component<JobContainerProps, JobContainerState> {
	state = {
		isSortBySalary: false,
		isSortByRating: false,
		isSortByLocation: false,
		isSortByRecent: false,
		jobsClicked: [],
	}

	toggleSort = (sortType) => {
		const { isSortBySalary, isSortByRating, isSortByLocation, isSortByRecent } = this.state

		// handle which sort was clicked, we want to be sure to disable the other sort options so that our app doesn't get confused
		if (sortType === 'salary') {
			this.setState({ isSortBySalary: !isSortBySalary, isSortByRating: false, isSortByLocation: false, isSortByRecent: false })
		}

		if (sortType === 'rating') {
			this.setState({ isSortByRating: !isSortByRating, isSortBySalary: false, isSortByLocation: false, isSortByRecent: false })
		}

		if (sortType === 'location') {
			this.setState({ isSortByLocation: !isSortByLocation, isSortByRating: false, isSortBySalary: false, isSortByRecent: false })
		}

		if (sortType === 'recent') {
			this.setState({ isSortByRecent: !isSortByRecent, isSortByRating: false, isSortBySalary: false, isSortByLocation: false })
		}
	}

	handleClickJobRow = (job) => {
		const { jobsClicked } = this.state;

		const updatedJobsClicked = [...jobsClicked].filter(jobId => { // [1, 2]
			if (job.id === jobId) {
				return false
			}
			return true
		})
		this.setState({jobsClicked: updatedJobsClicked})
	}

	handleClickJobCard = (job) => {
		// adding the id of the job that was clicked to our state so that we know what to render
		const { jobsClicked } = this.state
		const updatedJobsClicked = [...jobsClicked, job.id]
		this.setState({ jobsClicked: updatedJobsClicked })
	}

	handleClickHamburger = () => {
		const { jobs } = this.props

		const jobsIds = jobs.map(job => {
			return job.id
		})
		console.log('jobsIds:', jobsIds)

		this.setState({jobsClicked: jobsIds})
	}
	
	handleClickReverseHamburger = () => {
		const jobsIds = []
		console.log('jobsIds:', jobsIds)

		this.setState({jobsClicked: jobsIds})
	}

	toggleClick = (isHamburger) => {
		if (isHamburger === true) {
			const { jobs } = this.props

			const jobsIds = jobs.map(job => {
				return job.id
			})
			console.log('jobsIds:', jobsIds)
	
			this.setState({jobsClicked: jobsIds})
		} else {
			const jobsIds = []
		console.log('jobsIds:', jobsIds)

		this.setState({jobsClicked: jobsIds})
		}
	}

	// General Guidelines for clean code
	// one source truth
	// DRY (don't repeat yourself)
	// separation of concerns

	render() {
		const { jobs } = this.props
		const { isSortBySalary, isSortByLocation, isSortByRating, isSortByRecent } = this.state;
		const { jobsClicked } = this.state;

		let jobsToRender = [...jobs] // this is called a spread operator, it clones the jobs array into a new array

		let sortType = ''

		if (isSortBySalary) {
			sortType = 'salary'
		}

		if (isSortByRating) {
			sortType = 'rating'
		}

		if (isSortByLocation) {
			sortType = 'location'
		}

		if (isSortBySalary || isSortByRating) {
			jobsToRender = [...jobs].sort((jobA, jobB) => {
				return jobB[sortType] - jobA[sortType] // this sort will work for numbers and array of strings
			})

		}
		if (isSortByLocation) {
			jobsToRender = [...jobs].sort((jobA, jobB) => {
				return jobA[sortType].localeCompare(jobB[sortType]) // we have to do this special sort when sorting strings that are inside of an object
			})
		}

		if (isSortByRecent) {
			jobsToRender = [...jobs].reverse() // our database is already returning the jobs from oldest to newest, so by doing .reverse() we would return jobs from newest to oldest
		}

		return (
			<div> 
				<button onClick={() => this.toggleClick(true)}>hamburger icon</button>
				<button onClick={() => this.toggleClick(false)}>reverseHam</button>
				<div className={'job-container'}>
					{/* we have to use onClick to tag our buttons with the functions that we created */}
					<button onClick={() => this.toggleSort('salary')}>Salary</button>
					<button onClick={() => this.toggleSort('rating')}>Best Rated</button>
					<button onClick={() => this.toggleSort('location')}>Location</button>
					<button onClick={() => this.toggleSort('recent')}>Recent</button>
					{jobsToRender.map(job => {
						// earlier we were keeping track of what jobs were clicked by updating our state with the id of the jobs that were clicked
						// if the job in this loop exists in our jobsClicked array, then we want to show the JobRow instead of the JobCard
						if (jobsClicked.includes(job.id) === true) {
							return <JobRow job={job} handleClickJobRow={this.handleClickJobRow} />
						}
						return <JobCard job={job} handleClickJobCard={this.handleClickJobCard} />
					})}

				</div>
			</div>
			
		)
	}
}

export default JobContainer
