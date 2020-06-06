import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { Job } from '../utils/helpers'

interface JobRowProps {
	job: Job
	handleClickJobRow: (job) => void
	starRating: (jobRating) => string
	colorRating: (jobRating) => any
	handleDelete: (job) => any
}

class JobRow extends React.Component<JobRowProps, null> {
	render() {
		//we'll need this to render the clicked button from job card here
		const { job, handleClickJobRow, starRating, colorRating, handleDelete } = this.props

		return <Card color={colorRating(job.rating)} fluid onClick={() => handleClickJobRow(job)} >
			<Card.Content>
				<button onClick={() => handleDelete(job.id)}>DELETE</button>
				<Card.Header>
					{job.companyName}
					<span role='img' aria-label='star'>  {starRating(job.rating)}  </span>
				</Card.Header>
				<Card.Meta>Status: {job.status} </Card.Meta>
				<Card.Description> Salary: ${job.salary}
					<br /> Size: {job.companySize}
					<br /> Industry: {job.industry}
					<br /> Description: {job.description}</Card.Description>
			</Card.Content>
		</Card>
	}
}

export default JobRow
