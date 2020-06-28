import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Menu } from 'semantic-ui-react'

class Navbar extends React.Component {
	render() {
		return (
			<Menu>
				<Menu.Item>
					<Link to='/dashboard'>Dashboard</Link>
				</Menu.Item>
				<Menu.Item>
					<Link to='/'>Jobs</Link>
				</Menu.Item>
				<Menu.Item>
					<Link to='/signup'><Button primary>Sign Up</Button></Link>
				</Menu.Item>
			</Menu>
		)
	}
}

export default Navbar