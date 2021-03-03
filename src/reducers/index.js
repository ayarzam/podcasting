import { GET_PODCASTS, GOT_PODCASTS, PLAY, PAUSE, CURRENTLY_PLAYING } from './actions';

const initialState = {
  podcasts: [],
  loading: false, 
  playing: false,
  paused: false,
  currently_playing: null
}

export const podcastReducer = (state = initialState, action) => {
 switch (action.type) {
  case GET_PODCASTS:
    return {...state, loading: true };
  case GOT_PODCASTS: 
    return{...state, loading: false, podcasts: action.payload};
  case PLAY:
    return{...state, playing: true };
  case PAUSE: 
    return {...state, paused: true };
  case CURRENTLY_PLAYING: 
    return {...state, currently_playing: action.payload}
  default:
    return state;
 } 
};