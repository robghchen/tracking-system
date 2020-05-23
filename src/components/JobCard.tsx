import React from 'react'

interface JobCardProps {
	job: any
	handleClick: any
}

class JobCard extends React.Component<JobCardProps, null> {
	render() {
		const { job, handleClick } = this.props


		return <div className="job-card" onClick={() => handleClick(job)}>
			<h3>{job.companyName}</h3>
			<p>Glassdoor: {job.rating}<span role="img" aria-label='star'>⭐️</span></p>
			<p>${job.salary}</p>
			<br />
			<p>Status: {job.status}</p>
		</div>
	}
}

export default JobCard


