import React from 'react';
import SinglePodcast from './SinglePodcast';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateFavorites, deleteFavorite, updateDragLeave, updateDragEnter, updateCurrentlyPlaying } from '../store';

/**
 * Component that creates the user's list of favorite podcasts. Allows podcasts 
 * to be dragged and dropped into the list.
 */
class FavoritesList extends React.Component {
	/**
   * Prevents the page from reloading when a podcast is dragged into the list.
  */
	onDragOver = (event) => {
		event.preventDefault();
	};

	/**
   * Prevents the page from reloading when a podcast is dropped into the list.
   * Gets the drag operation's dropped data of the specified type.
   * Parses the data transfered on drop, aka the podcast Object that was released.
   * Adds the podcast Object to the state list.
  */
	onDrop = (event) => {
		event.preventDefault();
		let data = event.dataTransfer.getData('text');
		data = JSON.parse(data);

		console.log('dropped in dropzone', data);

		/** 
     * Filters through the list to check for duplicate elements whose name is 
     * equivalent to the element we want to add.
    */
		let { favoriteList } = this.props;
		let duplicate = favoriteList.filter((elem) => elem.name === data.name);

		if (duplicate.length === 0) {
			/** 
       * Updates the list to contain the newly dragged in podcast and then updates the
       * state of the parent list.
      */
			this.props.updateFavorites(favoriteList.concat(data));
		}
	};

	onDragLeave = (event) => {
		if (event.target.id === 'favoritesList') {
			console.log(event.target, 'drag leave');

			this.props.updateDragLeave(true);

			// let area = event.target.getBoundingClientRect();
			// console.log(area);
		}
	};

	onDragEnter = (event) => {
		if (event.target.id === 'favoritesList') {
			console.log(event.target, 'drag enter');

			this.props.updateDragEnter(false);
		}
	};

	onDragEnd = (event) => {
		let dragLeave = this.props.removeFav;

		console.log('drag left?', dragLeave);
		console.log(event.target);

		if (dragLeave) {
			console.log('drag ended and drag left');

			let { favoriteList } = this.props;
			let newList = favoriteList.filter((elem) => elem.name !== event.target.id);
			console.log(favoriteList, newList);
			this.props.deleteFavorite(newList);
		}
	};

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
		let { loading, favoriteList } = this.props;
		if (loading) return <div>Loading...</div>;
		if (favoriteList === undefined) {
			favoriteList = [];
		}

		return (
			<Col
				id="favoritesList"
				className="list_column"
				onDrop={this.onDrop}
				onDragOver={this.onDragOver}
				onDragLeave={this.onDragLeave}
				onDragEnter={this.onDragEnter}
				onDragEnd={this.onDragEnd}
				lg="5"
				md="5"
				sm="5"
				xs="5"
			>
				<h2 className="list_header">Favorites</h2>
				<hr />
				{favoriteList.map((podcast) => {
					return (
						<SinglePodcast
							key={podcast.name}
							ref={(singlePodcast) => (this.singlePodcast = singlePodcast)}
							podcast={podcast}
							listName={`favoritesList`}
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
	favoriteList: state.favorites,
	loading: state.loading,
	removeFav: state.removeFav,
	currentlyPlaying: state.currentlyPlaying
});

/**
 * Elements connecting the React component to the Redux component which creates the 
 * get request and populates the component did mount stage of the lifecycle.
 */
const mapDispatchToProps = (dispatch) => ({
	updateFavorites: (data) => dispatch(updateFavorites(data)),
	deleteFavorite: (data) => dispatch(deleteFavorite(data)),
	updateDragLeave: (data) => dispatch(updateDragLeave(data)),
	updateDragEnter: (data) => dispatch(updateDragEnter(data)),
	updateCurrentlyPlaying: (data) => dispatch(updateCurrentlyPlaying(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesList);
