import { createStore, applyMiddleware } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import { podcastReducer } from './reducers/index';
import {
	getPodcasts,
	gotPodcasts,
	addFavorite,
	removeFavorite,
	dragLeave,
	dragEnter,
	currentlyPlaying
} from './reducers/actionCreators';

/**
 * Redux thunk that makes an api call to populate the PodcastList React componenet.
 */
export const fetchPodcasts = () => {
	return async (dispatch) => {
		try {
			dispatch(getPodcasts);
			const url = `${process.env.REACT_APP_API}`;
			const { data } = await axios.get(url);
			dispatch(gotPodcasts(data));
		} catch (error) {
			console.log('There was a problem in fetchPodcasts thunk', error);
			console.error(error);
		}
	};
};

/**
 * Creates an update for the FavoritesList.
 */
export const updateFavorites = (data) => {
	return async (dispatch) => {
		try {
			dispatch(addFavorite(data));
		} catch (error) {
			console.log('There was a problem in addFavorite thunk', error);
			console.error(error);
		}
	};
};

/**
 * Removes an element from the FavoritesList.
 */
export const deleteFavorite = (data) => {
	return async (dispatch) => {
		try {
			dispatch(removeFavorite(data));
		} catch (error) {
			console.log('There was a problem in the deleteFavorite thunk', error);
			console.error(error);
		}
	};
};

/**
 * Detects if an element has been dragged out of the FavoriteList.
 */
export const updateDragLeave = (data) => {
	return async (dispatch) => {
		try {
			dispatch(dragLeave(data));
		} catch (error) {
			console.log('There was a problem in the updateDragLeave thunk', error);
			console.error(error);
		}
	};
};

/**
 * Detects if an element has been dragged in the FavoriteList.
 */
export const updateDragEnter = (data) => {
	return async (dispatch) => {
		try {
			dispatch(dragEnter(data));
		} catch (error) {
			console.log('There was a problem in the updateDragEnter thunk', error);
			console.error(error);
		}
	};
};

/**
 * Updates the state of currentlyPlaying so it reflects the currently played podcast.
 */
export const updateCurrentlyPlaying = (data) => {
	return async (dispatch) => {
		try {
			dispatch(currentlyPlaying(data));
		} catch (error) {
			console.log('There was a problem in the fetchCurrentlyPlaying thunk', error);
			console.error(error);
		}
	};
};

/**
 * Loads the state From Local Storage.
 */
const loadFromLocalStorage = () => {
	try {
		const serializedState = localStorage.getItem('states');
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (error) {
		console.error(error);
		console.log('There was a problem in the loadState function/redux');
		return undefined;
	}
};

/**
 * Loads the state to Local Storage.
 */
const saveToLocalStorage = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('states', serializedState);
	} catch (error) {
		console.error(error);
		console.log('There was a problem int he saveState function/redux');
	}
};

/**
 * Creates the redux store and also subscribes the store to local storage in order to 
 * persist the state on page reload.
 */
const peristedState = loadFromLocalStorage();

const store = createStore(podcastReducer, peristedState, applyMiddleware(thunkMiddleware, loggingMiddleware));

store.subscribe(() => {
	saveToLocalStorage(store.getState());
});

export default store;
