import React from 'react'

interface JobCardProps {
	job: any
	handleClickJobCard: any
}

class JobCard extends React.Component<JobCardProps, null> {
	render() {
		const { job, handleClickJobCard } = this.props


		return <div className="job-card" onClick={() => handleClickJobCard(job)}>
			<h3>{job.companyName}</h3>
			<p>Glassdoor: {job.rating}<span role="img" aria-label='star'>⭐️</span></p>
			<p>${job.salary}</p>
			<br />
			<p>Status: {job.status}</p>
		</div>
	}
}

export default JobCard


