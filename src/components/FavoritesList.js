import React from 'react'
import List from './List'
import { connect } from 'react-redux'
import { addToFavorites } from '../store'

/**
 * Component that creates the user's list of favorite podcasts.
 */
class FavoritesList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      favorites: []
    }
  }

  render() {
    return(
      <List list={this.state.favorites}/>
    )
  }
}

/**
 * Elements connecting the React component to the Redux component which holds it's 
 * state.
 */
const mapPropsToDispatch = (dispatch) => ({
  addToFavorites: (data) => dispatch(addToFavorites(data))
})

export default connect(null, mapPropsToDispatch)(FavoritesList)