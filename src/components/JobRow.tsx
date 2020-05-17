import React from 'react'

interface JobRowProps {
	job: any

}

class JobRow extends React.Component<JobRowProps, null> {
	render() {
		//we'll need this to render the clicked button from job card here
		const { job } = this.props

		return <div className="job-card">
			{/* // would become the clicked job card's variables from data */}
			<h3>{job.companyName}</h3>
			<p>Glassdoor: {job.rating}<span role="img" aria-label="star">⭐️</span></p>
			<p>${job.salary}</p>
			<p>Company Size: {job.companySize}<span role="img" aria-label="people">👨‍👩‍👧‍👦</span></p>
			<p>Industry: {job.industry}</p>
			<p>Status: {job.status}</p>
			<br />
			<p>Description: {job.description}</p>

		</div>
	}
}

export default JobRow
