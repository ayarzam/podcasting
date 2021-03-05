import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FiPlayCircle } from 'react-icons/fi';
import { FiPauseCircle } from 'react-icons/fi';
import { placeholder } from '../images/placeholder.png'

/**
 * A functional component for the creation of a single podcast.
 */
export default class SinglePodcast extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playing: false,
			podcast: props.podcast,
			listName: props.listName,
			updateCurrentlyPlaying: props.update
		};

		this.onDragStart = this.onDragStart.bind(this);
		this.toggleAudio = this.toggleAudio.bind(this);
	}

	/**
   * Sets the drag operation's drag data to the specified data and type.
   * Stringifies the podcast Object and sets it as the data.
   */
	onDragStart = (event) => {
		event.dataTransfer.setData('text', JSON.stringify(this.state.podcast));
	};

	/**
   * Toggles the podcast, whose audio has been clicked, to play or pause,
   */
	toggleAudio = (event) => {
		console.log(event);
		const query = '#' + this.state.listName + " [id='" + this.state.podcast.name + "'] .podcast_audio";

		const podcastAudio = document.querySelector(query);
		console.log('podcastAudio', podcastAudio);

		if (this.state.playing) {
			this.pauseAudio(podcastAudio);
		} else {
			this.playAudio(podcastAudio);
		}

		this.state.updateCurrentlyPlaying(query);
	};

	/**
   * Pauses audio.
   */
	pauseAudio = (audio) => {
		audio.pause();
		this.setState({ playing: false });
	};

	/**
   * Plays audio.
   */
	playAudio = (audio) => {
		audio.play();
		this.setState({ playing: true });
	};

	render() {
		return (
			<Card
				id={this.state.podcast.name}
				className="single_podcast_container"
				draggable
				onDragStart={this.onDragStart}
			>
				<Card.Header as="h3" className="single_podcast_name">
					{this.state.podcast.name}
				</Card.Header>
				<Card.Body>
					<div className="single_podcast_info_container">
						<Row>
							<Col className="single_podcast_left_column" lg="3" md="3" sm="3" xs="4">
								<Card.Img
									src={
										this.state.podcast.image === '' ? (
											'./images/placeholder.png'
										) : (
											this.state.podcast.image
										)
									}
									alt={this.state.podcast.name}
								/>
								<div className="single_podcast_player">
									<button className="audio_Btn" onClick={this.toggleAudio}>
										{this.state.playing ? <FiPauseCircle /> : <FiPlayCircle />}
									</button>
									<audio className="podcast_audio" src={this.state.podcast.audio} />
								</div>
							</Col>
							<Col className="single_podcast_right_column" lg="9" md="9" sm="9" xs="8">
								<Card.Title className="single_podcast_episode_title">
									Episode Title: {this.state.podcast.title}
								</Card.Title>
								<Card.Text className="single_podcast_description">
									Podcast Description: {this.state.podcast.description}
								</Card.Text>
								<Card.Link className="single_podcast_url" href={this.state.podcast.source}>
									Click here to visit the Podcast Home
								</Card.Link>
							</Col>
						</Row>
					</div>
				</Card.Body>
			</Card>
		);
	}
}
