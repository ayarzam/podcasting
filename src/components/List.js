import React from 'react';
import { Col } from 'react-bootstrap';
import SinglePodcast from './SinglePodcast';

/**
 * A component that manages a list of podcasts and allows podcasts to be dragged and 
 * dropped into it.
 */
export default class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: this.props.list
		};
	}

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

		this.setState({list: this.state.list.concat(data)})
	};

	render() {
		return (
			<Col className="list_column" onDrop={this.onDrop} onDragOver={this.onDragOver} lg="6" md="6" sm="6" xs="6" style={{ padding: '0 1.5rem', border: '1px solid black', borderRadius: '6px' }}>
        {(this.state.list.map((podcast) => {
          return (
            <SinglePodcast key={podcast.name} podcast={podcast} />
          )
          }))
        }
			</Col>
		);
	}
}
