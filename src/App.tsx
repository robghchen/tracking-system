import React from 'react';
import './App.css';


// Lesson 2 - React
// - JSON server
// - async / await
// - state
// - props
// - component life cycle
// - react router
// - start building the frontend

class App extends React.Component {
	showJobsForUsers = (users) => {
		return users.map(user => {
			return user.jobs.map(job => {
				return <div>
					<p>{user.email}</p>
					<p>{job.title}</p>
					<p>{job.salary}</p>
					<p>{job.location}</p>
					<p>{job.description}</p>
				</div>
			})
		})
	}

	render() {
		const users = [
			{
				email: "wesley@gmail.com",
				jobs: [
					{
						title: "software engineer",
						salary: 150000,
						location: "new york",
						description: "a bunch of stuff",
					},
					{
						title: "software engineer",
						salary: 150000,
						location: "new york",
						description: "a bunch of stuff",
					},
					{
						title: "software engineer",
						salary: 150000,
						location: "new york",
						description: "a bunch of stuff",
					},
				]
			},
			{
				email: "amy@gmail.com",
				jobs: [
					{
						title: "software engineer",
						salary: 150000,
						location: "new york",
						description: "a bunch of stuff",
					},
					{
						title: "software engineer",
						salary: 150000,
						location: "new york",
						description: "a bunch of stuff",
					},
					{
						title: "software engineer",
						salary: 150000,
						location: "new york",
						description: "a bunch of stuff",
					}
				]
			},
			{
				email: "kj@gmail.com",
				jobs: [
					{
						title: "software engineer",
						salary: 150000,
						location: "new york",
						description: "a bunch of stuff",
					},
					{
						title: "software engineer",
						salary: 150000,
						location: "new york",
						description: "a bunch of stuff",
					},
					{
						title: "software engineer",
						salary: 150000,
						location: "new york",
						description: "a bunch of stuff",
					}
				]
			},
			{
				email: "rob@gmail.com",
				jobs: [
					{
						title: "software engineer",
						salary: 150000,
						location: "new york",
						description: "a bunch of stuff",
					},
					{
						title: "software engineer",
						salary: 150000,
						location: "new york",
						description: "a bunch of stuff",
					},
					{
						title: "software engineer",
						salary: 150000,
						location: "new york",
						description: "a bunch of stuff",
					}
				]
			},
		]

		return (
			<div className="App" >
				<header className="App-header">
					{this.showJobsForUsers(users)}
				</header>
			</div >
		);
	}
}

export default App;
