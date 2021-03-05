import { GET_PODCASTS, GOT_PODCASTS, FAVORITES, ADD_FAVORITE, REMOVE_FAVORITE, PLAY, PAUSE, CURRENTLY_PLAYING } from './actions';

const initialState = {
  podcasts: [],
  loading: true, 
  playing: false,
  paused: false,
  currently_playing: null,
  favorites: []
}

export const podcastReducer = (state = initialState, action) => {
 switch (action.type) {
  case GET_PODCASTS:
    return {...state, loading: true };
  case GOT_PODCASTS: 
    return{...state, loading: false, podcasts: action.payload.podcasts};
  case FAVORITES:
    return {...state, loading: true, favorites: action.payload}
  case ADD_FAVORITE: 
    return {...state, favorites: action.payload}
  case REMOVE_FAVORITE:
    return{...state, favorite: state.favorite.filter(podcast => podcast.name !== action.payload)};
  case PLAY:
    return{...state, playing: true };
  case PAUSE: 
    return {...state, paused: true };
  case CURRENTLY_PLAYING: 
    return {...state, currently_playing: action.payload};
  default:
    return state;
 } 
};