import React from 'react'
import JobCard from '../components/JobCard'
import JobRow from '../components/JobRow'
import { Card, Image, Modal, Button } from 'semantic-ui-react'
import { Job } from '../utils/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faTh } from '@fortawesome/free-solid-svg-icons'
import JobForm from '../components/JobForm'
import axios from 'axios'

interface JobsContainerProps {
	jobs: any[]
}

interface JobsContainerState {
	//Filtered States:
	isSortBySalary: boolean
	isSortByRating: boolean
	isSortByLocation: boolean
	isSortByRecent: boolean
	//jobCard Clicked status
	jobsClicked: any

}

class JobsContainer extends React.Component<JobsContainerProps, JobsContainerState> {
	state = {
		isSortBySalary: false,
		isSortByRating: false,
		isSortByLocation: false,
		isSortByRecent: false,
		jobsClicked: [],
	}

	handleDelete = async (jobId) => {
		const { jobs } = this.props
		const jobsDeleted = [...jobs].filter(job => {
			if (job.id === jobId) {
				return false
			}
			return true
		})
		try {
			await axios.patch('http://localhost:3001/users/1', { jobs: [...jobsDeleted] })
		} catch (error) {
			console.log(error)
		}

	}
	//clone the array and then match the passed in jobID with the jobid's in the array
	//if passedInJobid===arrayjobID, axios.update
	//onClick()=>handleDelete 

	//create button for deleting job
	//associate each delete button of job card to jobid 
	//create a fx that incorporates axios.update to filter out the jobid 
	//

	starRating = (jobRating) => {
		let stars = ''
		for (let i = 0; i < jobRating; i++) {
			stars = stars + '⭐️'
		}

		return stars
	}

	colorRating = (jobRating) => {
		if (jobRating === 1) {
			return 'red'
		}
		if (jobRating === 2) {
			return 'orange'
		}
		if (jobRating === 3) {
			return 'yellow'
		}
		if (jobRating === 4) {
			return 'blue'
		}
		if (jobRating === 5) {
			return 'green'
		}

	}

	toggleSort = (sortType) => {
		const { isSortBySalary, isSortByRating, isSortByLocation, isSortByRecent } = this.state

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
		this.setState({ jobsClicked: updatedJobsClicked })
	}

	handleClickJobCard = (job: Job) => {
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

		this.setState({ jobsClicked: jobsIds })
	}

	handleClickReverseHamburger = () => {
		const jobsIds = []

		this.setState({ jobsClicked: jobsIds })
	}


	toggleClick = (isHamburger) => {
		if (isHamburger === true) {
			const { jobs } = this.props

			const jobsIds = jobs.map(job => {
				return job.id
			})

			this.setState({ jobsClicked: jobsIds })
		} else {
			const jobsIds = []

			this.setState({ jobsClicked: jobsIds })
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
				<span className={'add-job-button'}>
					<Modal trigger={<Button>Add New Job</Button>}><Modal.Content><JobForm jobs={jobs} /></Modal.Content></Modal>
				</span>
				<div className={'job-container'}>
					{/* we have to use onClick to tag our buttons with the functions that we created */}
					<Button.Group className={'sort-button-group'}>
						<Button onClick={() => this.toggleSort('salary')}>Salary</Button>
						<Button onClick={() => this.toggleSort('rating')}>Best Rated</Button>
						<Button onClick={() => this.toggleSort('location')}>Location</Button>
						<Button onClick={() => this.toggleSort('recent')}>Recent</Button>
						<Button onClick={() => this.toggleClick(true)}><FontAwesomeIcon icon={faBars} /></Button>
						<Button onClick={() => this.toggleClick(false)}><FontAwesomeIcon icon={faTh} /></Button>
					</Button.Group>

					<Card.Group>
						{jobsToRender.map(job => {
							// earlier we were keeping track of what jobs were clicked by updating our state with the id of the jobs that were clicked
							// if the job in this loop exists in our jobsClicked array, then we want to show the JobRow instead of the JobCard
							if (jobsClicked.includes(job.id) === true) {
								return <JobRow key={job.id} job={job} handleClickJobRow={this.handleClickJobRow} starRating={this.starRating} colorRating={this.colorRating} handleDelete={this.handleDelete} />
							}
							return <JobCard key={job.id} job={job} handleClickJobCard={this.handleClickJobCard} starRating={this.starRating} colorRating={this.colorRating} handleDelete={this.handleDelete} />
						})}
					</Card.Group>
				</div>
			</div >

		)
	}
}

export default JobsContainer
