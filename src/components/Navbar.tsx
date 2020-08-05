import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Menu } from 'semantic-ui-react'
import GoogleLoginButton from './GoogleLoginButton'

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
					<p>Contacts</p>
				</Menu.Item>
				<Menu.Item>
					<p>Activity</p>
				</Menu.Item>
				<Menu.Menu position="right">
					<Menu.Item>
						<Link to='/login'><GoogleLoginButton /></Link>
					</Menu.Item>
					<Menu.Item>
						<Link to='/signup'><Button primary>Sign Up</Button></Link>
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		)
	}
}

export default Navbar