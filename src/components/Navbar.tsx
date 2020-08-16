import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteUsersList } from '../actions/userActions'

interface NavbarProps {
	triggerDeleteUsersList: () => void
}
class Navbar extends React.Component<NavbarProps, null> {

	render() {
		console.log('NAVBAR', this.props)
		return (
			<div>
				<button onClick={this.props.triggerDeleteUsersList}>DELETE USERS ARRAY</button>
				<Link to='/'>Dashboard</Link>
				<Link to='/jobs'>Jobs</Link>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		users: state.usersData.users
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		triggerDeleteUsersList: () => dispatch(deleteUsersList())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)