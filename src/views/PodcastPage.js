import React from 'react'
import PodcastsList from '../components/PodcastsList'
import FavoritesList from '../components/FavoritesList'
import { Row } from 'react-bootstrap'

/**
 * A view of the Podcast Page, which displays a list of all podcasts available and a 
 * favorites list that's populated by the user.
 */
export default class PodcastPage extends React.Component {

  render() {
    return (
      <div id='PodcastPage'>
        <div className='PodcastPage_header' style={{padding: '2rem 0', display: 'flex', alignItems : 'center', flexDirection: 'column'}}>
          <h1>Podcasts</h1>
          <p style={{padding: '1rem 0', textAlign: 'center'}}>Below is a collection of popular podcasts curated from SiriusXM. Drag and drop podcasts from the general podcasts list over into your favorites list to quickly listen to them on the go.</p>
        </div>
        <Row className="lists_container">
          <PodcastsList />
          <FavoritesList />
        </Row>
      </div>
    )
  }
}