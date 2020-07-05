import React from 'react';
import { Button } from 'semantic-ui-react';
class Homepage extends React.Component {
	render() {
		return (
			<div className="homepage">
				<h1>
					Job hunting just got <br />
					easier with <span>Ingenium</span>
				</h1>
				<h3>
					Beating ATS with a systematic approach. <br />
					Get started today!
				</h3>
				<span>
					<Button primary>Get Started</Button>
					<Button>Sign in</Button>
				</span>
			</div>
		);
	}
}

export default Homepage;
