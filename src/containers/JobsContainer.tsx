import React from 'react';
import JobCard from '../components/JobCard';
import JobRow from '../components/JobRow';
import { Card, Image, Modal, Button } from 'semantic-ui-react';
import { Job } from '../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTh } from '@fortawesome/free-solid-svg-icons';
import JobForm from '../components/JobForm';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

interface JobsContainerProps {
	jobs: any[];
}

interface JobsContainerState {
	isSortBySalary: boolean;
	isSortByRating: boolean;
	isSortByLocation: boolean;
	isSortByRecent: boolean;
	jobsClicked: any;
}

class JobsContainer extends React.Component<JobsContainerProps, JobsContainerState> {
	state = {
		isSortBySalary: false,
		isSortByRating: false,
		isSortByLocation: false,
		isSortByRecent: false,
		jobsClicked: [],
	};

	handleDelete = async (jobId) => {
		const { jobs } = this.props;
		const jobsDeleted = [...jobs].filter((job) => {
			console.log('jobId', jobId);
			if (job.id === jobId) {
				return false;
			}
			return true;
		});
		try {
			await axios.patch('http://localhost:3001/users/1', { jobs: [...jobsDeleted] });
		} catch (error) {
			console.log(error);
		}
	};

	starRating = (jobRating) => {
		let stars = '';
		for (let i = 0; i < jobRating; i++) {
			stars = stars + '⭐️';
		}

		return stars;
	};

	colorRating = (jobRating) => {
		if (jobRating === 1) {
			return 'red';
		}
		if (jobRating === 2) {
			return 'orange';
		}
		if (jobRating === 3) {
			return 'yellow';
		}
		if (jobRating === 4) {
			return 'blue';
		}
		if (jobRating === 5) {
			return 'green';
		}
	};

	toggleSort = (sortType) => {
		const { isSortBySalary, isSortByRating, isSortByLocation, isSortByRecent } = this.state;

		if (sortType === 'salary') {
			this.setState({ isSortBySalary: !isSortBySalary, isSortByRating: false, isSortByLocation: false, isSortByRecent: false });
		}

		if (sortType === 'rating') {
			this.setState({ isSortByRating: !isSortByRating, isSortBySalary: false, isSortByLocation: false, isSortByRecent: false });
		}

		if (sortType === 'location') {
			this.setState({ isSortByLocation: !isSortByLocation, isSortByRating: false, isSortBySalary: false, isSortByRecent: false });
		}

		if (sortType === 'recent') {
			this.setState({ isSortByRecent: !isSortByRecent, isSortByRating: false, isSortBySalary: false, isSortByLocation: false });
		}
	};

	handleClickJobRow = (job) => {
		const { jobsClicked } = this.state;

		const updatedJobsClicked = [...jobsClicked].filter((jobId) => {
			if (job.id === jobId) {
				return false;
			}
			return true;
		});
		this.setState({ jobsClicked: updatedJobsClicked });
	};

	handleClickJobCard = (job: Job) => {
		const { jobsClicked } = this.state;
		const updatedJobsClicked = [...jobsClicked, job.id];
		this.setState({ jobsClicked: updatedJobsClicked });
	};

	handleClickHamburger = () => {
		const { jobs } = this.props;

		const jobsIds = jobs.map((job) => {
			return job.id;
		});

		this.setState({ jobsClicked: jobsIds });
	};

	handleClickReverseHamburger = () => {
		const jobsIds = [];
		console.log('jobsIds:', jobsIds);

		this.setState({ jobsClicked: jobsIds });
	};

	toggleClick = (isHamburger) => {
		if (isHamburger === true) {
			const { jobs } = this.props;

			const jobsIds = jobs.map((job) => {
				return job.id;
			});
			console.log('jobsIds:', jobsIds);

			this.setState({ jobsClicked: jobsIds });
		} else {
			const jobsIds = [];
			console.log('jobsIds:', jobsIds);

			this.setState({ jobsClicked: jobsIds });
		}
	};

	render() {
		const { jobs } = this.props;
		const { isSortBySalary, isSortByLocation, isSortByRating, isSortByRecent } = this.state;
		const { jobsClicked } = this.state;

		let jobsToRender = [...jobs];

		let sortType = '';

		if (isSortBySalary) {
			sortType = 'salary';
		}

		if (isSortByRating) {
			sortType = 'rating';
		}

		if (isSortByLocation) {
			sortType = 'location';
		}

		if (isSortBySalary || isSortByRating) {
			jobsToRender = [...jobs].sort((jobA, jobB) => {
				return jobB[sortType] - jobA[sortType];
			});
		}
		if (isSortByLocation) {
			jobsToRender = [...jobs].sort((jobA, jobB) => {
				return jobA[sortType].localeCompare(jobB[sortType]);
			});
		}

		if (isSortByRecent) {
			jobsToRender = [...jobs].reverse();
		}

		return (
			<div>
				<Modal trigger={<Button>Add New Job</Button>}>
					<Modal.Content>
						<JobForm jobs={jobs} />
					</Modal.Content>
				</Modal>
				<button onClick={() => this.toggleClick(true)}>
					<FontAwesomeIcon icon={faBars} />
				</button>
				<button onClick={() => this.toggleClick(false)}>
					<FontAwesomeIcon icon={faTh} />
				</button>
				<div className={'job-container'}>
					<button onClick={() => this.toggleSort('salary')}>Salary</button>
					<button onClick={() => this.toggleSort('rating')}>Best Rated</button>
					<button onClick={() => this.toggleSort('location')}>Location</button>
					<button onClick={() => this.toggleSort('recent')}>Recent</button>
					<Card.Group>
						{jobsToRender.map((job) => {
							if (jobsClicked.includes(job.id) === true) {
								return <JobRow job={job} handleClickJobRow={this.handleClickJobRow} starRating={this.starRating} colorRating={this.colorRating} handleDelete={this.handleDelete} />;
							}
							return <JobCard job={job} handleClickJobCard={this.handleClickJobCard} starRating={this.starRating} colorRating={this.colorRating} handleDelete={this.handleDelete} />;
						})}
					</Card.Group>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { jobs: state.usersData.users[0].jobs };
};

export default connect(mapStateToProps, null)(JobsContainer);

