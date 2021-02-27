import React from 'react'
import axios from 'axios'
import SinglePodcast from './SinglePodcast'
import Player from './Player'

export default class AllPodcasts extends React.Component{
  constructor(){
    super()
    this.state = {
      allPodcasts: []
    }
  }

  async componentDidMount(){
    const url = `${process.env.REACT_APP_API}`
    const response = await axios.get(url)
    const podcastData = response.data.podcasts;
    this.setState({
           allPodcasts: podcastData
     })
  }


  render(){
    
    return(
      <div>
        <div>
          <SinglePodcast podcasts={this.state.allPodcasts}/>
          {/* <Player podcasts={this.state.Podcasts}/> */}
        </div>
      </div>
    )
  }
}