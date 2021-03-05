import { createStore, applyMiddleware } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import { podcastReducer } from './reducers/index';
import { getPodcasts, gotPodcasts, addFavorite, removeFavorite, dragLeave, dragEnter } from './reducers/actionCreators';

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

export const updateDragLeave = (data) => {
  return async (dispatch) => {
		try {
      dispatch(dragLeave(data));
    }
    catch (error) {
      console.log('There was a problem in the updateDragLeave thunk', error);
			console.error(error);
    }
  }
}

export const updateDragEnter = (data) => {
  return async (dispatch) => {
		try {
      dispatch(dragEnter(data));
    }
    catch (error) {
      console.log('There was a problem in the updateDragEnter thunk', error);
			console.error(error);
    }
  }
}

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

const saveToLocalStorage = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('states', serializedState);
	} catch (error) {
		console.error(error);
		console.log('There was a problem int he saveState function/redux');
	}
};

const peristedState = loadFromLocalStorage();

const store = createStore(podcastReducer, peristedState, applyMiddleware(thunkMiddleware, loggingMiddleware));

store.subscribe(() => {
	saveToLocalStorage(store.getState());
});

export default store;
