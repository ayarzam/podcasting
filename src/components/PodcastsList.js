import React from 'react';
import SinglePodcast from './SinglePodcast';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchPodcasts, updateCurrentlyPlaying } from '../store';

/**
 * Component that creates and displays a list of all podcasts available.
 */
class PodcastsList extends React.Component {
	componentDidMount() {
		this.props.fetchPodcasts();
	}

	/**
   * When a podcast's audio-player button is clicked, we check the state of 
   * 'currentlyPlaying.' If 'currentlyPlaying' is undefined we set it to be the 
   * podcast that we clicked to play. If 'currentlyPlaying' is not the same as the 
   * podcast we just clicked to play, we pause the previous podcast that was playing 
   * and update the state of 'currentPlaying'.
   */
	onPodcastClicked = (podcast) => {
		let { currentlyPlaying } = this.props;
		console.log('currentlyPlaying', currentlyPlaying);

		if (!currentlyPlaying) {
			// enter if-statement when nothing is currently playing
			this.props.updateCurrentlyPlaying(podcast);
		} else if (currentlyPlaying !== podcast) {
			// enter else-if statement when 'currentlyPlaying' is different than the last clicked podcast; pause the previously 'currentlyPlaying' audio

			const podcastAudio = document.querySelector(currentlyPlaying);
			console.log(podcastAudio);
			this.singlePodcast.pauseAudio(podcastAudio);
			this.props.updateCurrentlyPlaying(podcast);
		}
		// else if (currentlyPlaying === podcast) {
		//   // enter else-statement when 'currentlyPlaying' is the same as the last clicked podcast; last clicked podcast was paused
		//   this.props.updateCurrentlyPlaying(podcast);
		// }
	};

	render() {
		let { loading, podcastList } = this.props;
		if (loading) return <div>Loading...</div>;
		if (podcastList === undefined) {
			podcastList = [];
		}

		return (
			<Col key={podcastList.length} id="podcastsList" className="list_column" lg="5" md="5" sm="5" xs="5">
				<h2 className="list_header">SiriusXM Podcasts</h2>
				<hr />
				{podcastList.map((podcast) => {
					return (
						<SinglePodcast
							key={podcast.name}
							ref={(singlePodcast) => (this.singlePodcast = singlePodcast)}
							podcast={podcast}
							listName={`podcastsList`}
							update={this.onPodcastClicked}
						/>
					);
				})}
			</Col>
		);
	}
}

/**
 * Elements connecting the React component to the Redux component which holds it's 
 * state.
 */
const mapStateToProps = (state) => ({
	loading: state.loading,
	podcastList: state.podcasts,
	currentlyPlaying: state.currentlyPlaying
});

/**
 * Elements connecting the React component to the Redux component which creates the 
 * get request and populates the component did mount stage of the lifecycle.
 */
const mapDispatchToProps = (dispatch) => ({
	fetchPodcasts: () => dispatch(fetchPodcasts()),
	updateCurrentlyPlaying: (data) => dispatch(updateCurrentlyPlaying(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(PodcastsList);
