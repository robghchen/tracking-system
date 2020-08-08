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

	googleResponse = (resp) => {
		const tokenBlob = new Blob([JSON.stringify({ access_token: resp.accessToken }, null, 2)], { type: 'application/json' });
		const options: any = {
			method: 'POST',
			body: tokenBlob,
			mode: 'cors',
			cache: 'default'
		};
		fetch('http://localhost:3001/api/v1/auth/google', options).then(r => {
			const token = r.headers.get('x-auth-token');
			r.json().then(user => {
				if (token) {
					this.setState({ isAuthenticated: true, user, token })
				}
			});
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