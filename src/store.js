import { createStore, applyMiddleware } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import {podcastReducer} from './reducers/index';
import {getPodcasts, gotPodcasts} from "./reducers/actionCreators";

export const fetchPodcasts = () => {
  return async(dispatch) => {
    try{
      dispatch(getPodcasts)
      const url = `${process.env.REACT_APP_API}`;
      const {data} = await axios.get(url);
      dispatch(gotPodcasts(data));
    } catch (error){
      console.log('There was a problem in fetchPodcasts thunk');
      console.error(error);
    }
  }
}
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
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

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error) {
      console.error(error)
      console.log('There was a problem int he saveState function/redux')
  }
};


const peristedState = loadState();

const store = createStore(podcastReducer, peristedState, applyMiddleware(thunkMiddleware, loggingMiddleware));

store.subscribe(() => {
  saveState(store.getState());
});


export default store;