import { createStore, applyMiddleware } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import {podcastReducer} from './reducers/index';
import {getPodcasts, gotPodcasts, updateFavoriteList } from "./reducers/actionCreators";

export const fetchPodcasts = () => {
  return async(dispatch) => {
    try{
      dispatch(getPodcasts)
      const url = `${process.env.REACT_APP_API}`;
      const {data} = await axios.get(url);
      dispatch(gotPodcasts(data));
    } catch (error){
      console.log('There was a problem in fetchPodcasts thunk', error);
      console.error(error);
    }
  }
}

export const addFavorite = (data) => {
  return async(dispatch) => {
    try {
      dispatch(updateFavoriteList(data))
    } catch (error){
      console.log('There was a problem in addFavorite thunk', error);
      console.error(error);
    }
  }
}

// export const fetchFavorites = () => {
//   return async(dispatch) => {
//     try{
//       dispatch(getFavorites)
//       const serializedState = localStorage.getItem('favoritePodcasts');
//       if(serializedState === null) {
//         return undefined;
//       }
//       dispatch(gotFavorites(JSON.parse(serializedState)));
//     } catch (error){
//       console.log('There was a problem in fetchFavorites thunk', error);
//       console.error(error);
//     }
//   }
// }

// export const movedPodcast = (name) => {
//   return async (dispatch) => {
//     try {
//       const url = `${process.env.REACT_APP_API}`
//       const {data} =await axios.delete(`url${name}`)
//       dispatch(dragged(name))
      
//     } catch (error) {
//       console.log('problem in the movedPodcast thunk', error)
//       console.error(error)
//     }
//   }
// }
// export const addToFavorites = (newPodcastData) => {
//   return async(dispatch) => {
//     try {
//       const url = `${process.env.REACT_APP_API}`
//       const response = await axios.post(url, newPodcastData)
//       const podcastData = response.data
//       const newAction = dropped(podcastData)
//       dispatch(newAction)
//     } catch (error) {
//       console.log('Problem in the addToFavorites thunk', error)
//       console.error(error)
//     }
//   }
// }

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('states');
    if(serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error(error)
    console.log('There was a problem in the loadState function/redux')
    return undefined;
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('states', serializedState);
  } catch (error) {
      console.error(error)
      console.log('There was a problem int he saveState function/redux')
  }
};

const peristedState = loadFromLocalStorage();

const store = createStore(podcastReducer, peristedState, applyMiddleware(thunkMiddleware, loggingMiddleware));

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});


export default store;