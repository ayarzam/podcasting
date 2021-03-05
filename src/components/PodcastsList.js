import React from 'react'
import SinglePodcast from './SinglePodcast';
import { Col } from 'react-bootstrap';
import {connect} from 'react-redux'
import { fetchPodcasts } from '../store'

/**
 * Component that creates and displays a list of all podcasts available.
 */
class PodcastsList extends React.Component{
  componentDidMount(){
    this.props.fetchPodcasts()
  }

  render(){
    let {loading, podcastList} = this.props;
    if (loading) return <div>Loading...</div>
    if (podcastList === undefined){
      podcastList = []
    }

    return(
      <Col id='podcastsList' className="list_column" lg="6" md="6" sm="6" xs="6" style={{ padding: '0 1.5rem', border: '1px solid black', borderRadius: '6px' }}>
        {(podcastList.map((podcast) => {
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
  loading: state.loading,
  podcastList: state.podcasts,
})

/**
 * Elements connecting the React component to the Redux component which creates the 
 * get request and populates the component did mount stage of the lifecycle.
 */
const mapDispatchToProps = (dispatch) => ({
  fetchPodcasts: () => dispatch(fetchPodcasts())
})
export default connect(mapStateToProps, mapDispatchToProps)(PodcastsList)