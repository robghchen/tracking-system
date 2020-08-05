import React from 'react';
import { GoogleLogin } from 'react-google-login';

class GoogleLoginButton extends React.Component {
	state = {
		isAuthenticated: false,
		user: null,
		token: ''
	};

	logout = () => {
		this.setState({ isAuthenticated: false, user: null, token: '' })
	};

	googleResponse = (res) => {
		this.setState({
			isAuthenticated: true,
			user: res.profileObj,
			token: res.accessToken
		})
	};

	onFailure = (error) => {
		console.error('error: ', error);
	}

	render() {
		const { isAuthenticated, user, token } = this.state;

		let content = !!isAuthenticated ?
			(
				<div>
					<div>
						{user.email}
					</div>
					<div>
						<button onClick={this.logout} className="button">
							Log out
                        </button>
					</div>
				</div>
			) :
			(
				<div>
					<GoogleLogin
						clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
						buttonText="Login"
						onSuccess={this.googleResponse}
						onFailure={this.googleResponse}
					/>
				</div>
			);

		return (
			<div className="google-login">
				{content}
			</div>
		);
	}
}

export default GoogleLoginButton;