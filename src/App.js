import React from 'react';
import './App.css';
import JobsContainer from './containers/JobsContainer';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardContainer from './containers/DashboardContainer';
import { connect } from 'react-redux';
import { getUsersList } from './actions/userActions';
import { bindActionCreators } from 'redux';

class App extends React.Component {
	componentDidMount() {
		const { triggerGetUsersList } = this.props;
		console.log('APP CALLING triggerGetUsersList function');
		triggerGetUsersList();
	}

	render() {
		const { users } = this.props;

		if (users.length === 0) {
			return null;
		}

		return (
			<div className="App">
				<Navbar />
				<Switch>
					<Route path="/jobs" component={JobsContainer} />
					<Route path="/" component={DashboardContainer} />
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { usersData } = state;
	return { users: usersData.users };
};

// const mapStateToProps = ({usersData}) => ({
// 	users: usersData.users
// })

const mapDispatchToProps = (dispatch) => {
	return { triggerGetUsersList: bindActionCreators(getUsersList, dispatch) };
};

// const mapDispatchToProps = dispatch => ({
// 	triggerGetUsersList: () => getUsersList()
// })

export default connect(mapStateToProps, mapDispatchToProps)(App);
