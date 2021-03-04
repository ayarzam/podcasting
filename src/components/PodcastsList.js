import React from 'react'
import {connect} from 'react-redux'
import { fetchPodcasts } from '../store'
import List from './List'

/**
 * Component that creates and displays a list of all podcasts available.
 */
class PodcastsList extends React.Component{
  componentDidMount(){
    this.props.fetchPodcasts()
  }

  render(){
    let {loading, allPodcasts} = this.props;
    if(loading) return <div>Loading...</div>
    if (allPodcasts === undefined){
      allPodcasts = []
    }
    return(
      <List list={allPodcasts.podcasts}/>
    )
  }
}

/**
 * Elements connecting the React component to the Redux component which holds it's 
 * state.
 */
const mapStateToProps = (state) => ({
  loading: state.loading,
  allPodcasts: state.podcasts,
})

/**
 * Elements connecting the React component to the Redux component which creates the 
 * get request and populates the component did mount stage of the lifecycle.
 */
const mapDispatchToProps = (dispatch) => ({
  fetchPodcasts: () => dispatch(fetchPodcasts())
})
export default connect(mapStateToProps, mapDispatchToProps)(PodcastsList)