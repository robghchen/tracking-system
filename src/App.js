import React from 'react';
import './App.css';
import JobsContainer from './containers/JobsContainer';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardContainer from './containers/DashboardContainer';
import { connect } from 'react-redux'
import { getUsersList } from './actions/userActions'
import { bindActionCreators } from 'redux';

interface AppProps {
	triggerGetUsersList: any,
	users: any
}

class App extends React.Component<AppProps, null> {
	componentDidMount() {
		const { triggerGetUsersList } = this.props;

		triggerGetUsersList()
	}


	render() {
		const { users } = this.props

		if (users.length === 0) {
			return null;
		}

		return (
			<div className="App" >
				<Navbar />
				<Switch>
					<Route path='/jobs' component={JobsContainer} />
					<Route path='/' component={DashboardContainer} />
				</Switch>
			</div >
		);
	}
}

const mapStateToProps = state => {
	return { users: state.usersData.users }
}

const mapDispatchToProps = dispatch => {
	return { triggerGetUsersList: bindActionCreators(getUsersList, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
