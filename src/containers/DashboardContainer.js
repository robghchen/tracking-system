import React from 'react';
import JobsDnd from './JobsDnd';

class DashboardContainer extends React.Component {
	render() {
		const { jobs } = this.props; //receive
		return (
			<div>
				<h3>TITLE</h3>
				<p>description</p>
				<JobsDnd jobs={jobs} />; {/*passing */}
			</div>
		);
	}
}

export default DashboardContainer;
