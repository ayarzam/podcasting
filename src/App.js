import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PodcastPage from './views/PodcastPage';

const App = () => {
	return (
		<Router basename={process.env.PUBLIC_URL}>
			<Switch>
				<Route exact path="/" component={PodcastPage} />
			</Switch>
		</Router>
	);
};

export default App;
