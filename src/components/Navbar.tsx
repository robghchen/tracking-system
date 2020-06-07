import React from 'react'
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
	render() {
		return (
			<div>
				<Link to='/'>Dashboard</Link>
				<Link to='/jobs'>Jobs</Link>
			</div>
		)
	}
}

export default Navbar