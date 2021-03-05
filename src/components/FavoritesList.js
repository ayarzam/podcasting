import React from 'react'
import SinglePodcast from './SinglePodcast';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import { updateFavorites, deleteFavorite, updateDragLeave, updateDragEnter } from '../store'

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

    console.log('dropped in dropzone', data)
    
    /** 
     * Filters through the list to check for duplicate elements whose name is 
     * equivalent to the element we want to add.
    */
    let { favoriteList } = this.props;
    let duplicate = favoriteList.filter(elem => elem.name === data.name);
    
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
      console.log(event.target, 'drag leave')

      this.props.updateDragLeave(true);

      // let area = event.target.getBoundingClientRect();
      // console.log(area);
    }
  };

  onDragEnter = (event) => {
    if (event.target.id === 'favoritesList') {
      console.log(event.target, 'drag enter')

      this.props.updateDragEnter(false);
    }
  };

  onDragEnd = (event) => {
    let dragLeave = this.props.removeFav;

    console.log('drag left?', dragLeave)
    console.log(event.target)

    if (dragLeave) {
      console.log('drag ended and drag left')

      let { favoriteList } = this.props;
      let newList = favoriteList.filter(elem => elem.name !== event.target.id);
      console.log(favoriteList, newList)
      this.props.deleteFavorite(newList);
    }
  }

  render() {
    let { loading, favoriteList } = this.props
    if (loading) return <div>Loading...</div>
    if (favoriteList === undefined) {
      favoriteList = []
    }

    return(
      <Col id='favoritesList' className="list_column" onDrop={this.onDrop} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter} onDragEnd={this.onDragEnd} lg="6" md="6" sm="6" xs="6" style={{ padding: '0 1.5rem', border: '1px solid black', borderRadius: '6px' }}>
        {(favoriteList.map((podcast) => {
          return (
            <SinglePodcast key={podcast.name} podcast={podcast} />
          )
          }))
        }
      </Col>
    )
  }
}

/**
 * Elements connecting the React component to the Redux component which holds it's 
 * state.
 */
const mapStateToProps = (state) => ({
  favoriteList: state.favorites, 
  loading: state.loading, 
  removeFav: state.removeFav
})

/**
 * Elements connecting the React component to the Redux component which creates the 
 * get request and populates the component did mount stage of the lifecycle.
 */
const mapDispatchToProps = (dispatch) => ({
  updateFavorites: (data) => dispatch(updateFavorites(data)),
  deleteFavorite: (data) => dispatch(deleteFavorite(data)), 
  updateDragLeave: (data) => dispatch(updateDragLeave(data)),
  updateDragEnter: (data) => dispatch(updateDragEnter(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesList)