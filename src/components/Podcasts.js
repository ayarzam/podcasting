import React from 'react'
import axios from 'axios'
import SinglePodcast from './SinglePodcast'
import FavoritesList from './FavoritesList'


export default class Podcasts extends React.Component{
  constructor(){
    super()
    this.state = {
      podcasts: [],
      favorites: []
    }
  }

  async componentDidMount(){
    const url = `${process.env.REACT_APP_API}`
    const response = await axios.get(url)
    const podcastData = response.data.podcasts;
    this.setState({
           podcasts: podcastData
     })
  }


  render(){
    console.log(this.state)
    return(
      <div className='podcasts_container'>
        <div className='favorites_container'>
          <FavoritesList favorites={this.state.favorites}/>
        </div>
        <div className='all_podcasts_container'>
          {this.state.podcasts.map((podcast) => {
            return(
              <SinglePodcast key={podcast.name} podcast={podcast} />
            )
          })}
        </div>
      </div>
    )
  }
}