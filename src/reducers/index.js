import {
	GET_PODCASTS,
	GOT_PODCASTS,
	FAVORITES,
	ADD_FAVORITE,
	REMOVE_FAVORITE,
	DRAG_LEAVE,
	PLAY,
	PAUSE,
	CURRENTLY_PLAYING,
	DRAG_ENTER,
	UPDATE_CURRENTLY_PLAYING
} from './actions';

/**
 * Reducer stores all the states used by the react componenets.
 */

const initialState = {
	podcasts: [],
	loading: true,
	playing: false,
	paused: false,
	currentlyPlaying: null,
	favorites: [],
	removeFav: false
};

export const podcastReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_PODCASTS:
			return { ...state, loading: true };
		case GOT_PODCASTS:
			return { ...state, loading: false, podcasts: action.payload.podcasts };
		case FAVORITES:
			return { ...state, loading: true, favorites: action.payload };
		case ADD_FAVORITE:
			return { ...state, favorites: action.payload };
		case REMOVE_FAVORITE:
			return { ...state, favorites: action.payload };
		case DRAG_LEAVE:
			return { ...state, removeFav: action.payload };
		case DRAG_ENTER:
			return { ...state, removeFav: action.payload };
		case PLAY:
			return { ...state, playing: action.payload };
		case PAUSE:
			return { ...state, paused: action.payload };
		case CURRENTLY_PLAYING:
			return { ...state, currentlyPlaying: action.payload };
		case UPDATE_CURRENTLY_PLAYING:
			return { ...state, currentlyPlaying: action.payload };
		default:
			return state;
	}
};
