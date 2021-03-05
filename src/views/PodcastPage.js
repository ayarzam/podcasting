import React from 'react';
import PodcastsList from '../components/PodcastsList';
import FavoritesList from '../components/FavoritesList';
import { Row } from 'react-bootstrap';

/**
 * A view of the Podcast Page, which displays a list of all podcasts available and a 
 * favorites list that's populated by the user.
 */
export default class PodcastPage extends React.Component {
	render() {
		return (
			<div id="PodcastPage">
				<div className="PodcastPage_header">
					<h1>Podcasts</h1>
					<p>
						Below is a collection of popular podcasts curated from SiriusXM. If you want to favorite any of
						the podcasts in the list labeled 'SiriusXM Podcasts,' simply drag and drop them into the list
						labeled 'Favorites'. Don't worry we'll also remember your favorited podcasts the next time you
						visit this webpage.
					</p>
				</div>
				<Row className="lists_container">
					<PodcastsList />
					<FavoritesList />
				</Row>
			</div>
		);
	}
}
