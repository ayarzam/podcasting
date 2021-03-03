import React from 'react'
import {connect} from 'react-redux'
import { fetchPodcasts } from '../store'
import SinglePodcast from './SinglePodcast'
import FavoritesList from './FavoritesList'
import { Row, Col } from 'react-bootstrap'


class Podcasts extends React.Component{
  // constructor(){
  //   super()
  //   this.state = {
  //     podcasts: [],
  //     favorites: []
  //   }
  // }

  // async componentDidMount(){
  //   const url = `${process.env.REACT_APP_API}`
  //   const response = await axios.get(url)
  //   const podcastData = response.data.podcasts;
  //   this.setState({
  //          podcasts: podcastData
  //    })
  // }
  componentDidMount(){
    this.props.fetchPodcasts()
  }


  render(){
    let {loading, allPodcasts} = this.props;
    console.log(this.props)
    if(loading) return <div>Loading...</div>
    if (allPodcasts === undefined){
      allPodcasts = []
    }
    console.log(allPodcasts.index)
    return(
      <div className='podcasts_container'>
        <Row>
          <Col className='all_podcasts_container' lg='8' md='8' sm='8' xs='8'>
            {allPodcasts.podcasts.map((podcast) => {
              return(
                <SinglePodcast key={podcast.name} podcast={podcast} />
              )
            })}
          </Col>
          <Col className='favorites_container' lg='4' md='4' sm='4' xs='4'>
            {/* <FavoritesList favorites={this.state.favorites}/> */}
          </Col>
        </Row>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  loading: state.loading,
  allPodcasts: state.podcasts
})

const mapDispatchToProps = (dispatch) => ({
  fetchPodcasts: () => dispatch(fetchPodcasts())
})
export default connect(mapStateToProps, mapDispatchToProps)(Podcasts)