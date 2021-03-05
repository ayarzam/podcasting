import { GET_PODCASTS, GOT_PODCASTS, FAVORITES, UPDATE_FAVORITES, PLAY, PAUSE, CURRENTLY_PLAYING } from './actions';

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
  case UPDATE_FAVORITES: 
    return {...state, favorites: action.payload}
  // case GET_FAVORITES:
  //   return {...state, loading: true}
  // case GOT_FAVORITES: 
  //   return {...state, loading: false, favorites: action.payload};
  case PLAY:
    return{...state, playing: true };
  case PAUSE: 
    return {...state, paused: true };
  case CURRENTLY_PLAYING: 
    return {...state, currently_playing: action.payload};
  // case DRAG: 
  //   return{...state, podcasts: state.podcasts.filter(podcast => podcast.name !== action.payload)};
  // case DROP:
  //   return {...state, podcast: [...state.podcasts, action.payload]}
  default:
    return state;
 } 
};