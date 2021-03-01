import React from 'react'

export default function SinglePodcast(props) {
  const podcast = props.podcast;

  return(
    <div className='single_podcast_container'>
      <div className='single_podcast_info_container'>
        <img src = {podcast.image} alt={podcast.name}/>
        <h2 className='single_podcast_name'>Podcast Name: {podcast.name}</h2>
        <p className='single_podcast_episode_title'>Episode Title: {podcast.title}</p>
        <p className='single_podcast_description'>Podcast Description: {podcast.description}</p>
        <a className='single_podcast_url' href={podcast.source}>Click here to visit the Podcast Home</a>
      </div>
      <div className='single_podcast_player'>
        <audio src={podcast.audio} controls></audio>
      </div>
    </div>
  )
}
