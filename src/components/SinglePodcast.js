import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'

export default function SinglePodcast(props) {
  const podcast = props.podcast;

  return(
    <Card className='single_podcast_container' style={{marginTop: '3rem', marginBottom: '3rem'}}>
      <Card.Header as="h2" className='single_podcast_name'>{podcast.name}</Card.Header>
      <Card.Body style={{height: '20rem'}}>
        <div className='single_podcast_info_container' style={{height: '100%'}}>
          <Row style={{height: '100%'}}>
            <Col className='single_podcast_left_column' lg='3' md='3' sm='3' xs='4' style={{height: '100%', display : 'flex', alignItems : 'center', justifyContent : 'center'}}>
              <Card.Img src={podcast.image === '' ? '../images/placeholder.png' : podcast.image} alt={podcast.name}/>
            </Col>
            <Col className='single_podcast_right_column' lg='9' md='9' sm='9' xs='8' style={{height: '100%', display : 'flex', justifyContent : 'center', flexDirection: 'column'}}>
              <div className='single_podcast_player'>
                <audio src={podcast.audio} controls></audio>
              </div>
              <Card.Title className='single_podcast_episode_title'>Episode Title: {podcast.title}</Card.Title>
              <Card.Text className='single_podcast_description'>Podcast Description: {podcast.description}</Card.Text>
              <Card.Link className='single_podcast_url' href={podcast.source}>Click here to visit the Podcast Home</Card.Link>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  )
}
