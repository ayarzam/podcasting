import {GET_PODCASTS, GOT_PODCASTS, PLAY, PAUSE, CURRENTLY_PLAYING} from './actions'

export const getPodcasts = (data) => ({
  type: GET_PODCASTS
});

export const gotPodcasts  = (data) => ({
  type: GOT_PODCASTS,
  payload: data
});

export const playing = () => ({
  type: PLAY
});

export const paused = () =>({
  type: PAUSE
});

export const currently_playing = (data) => ({
  type: CURRENTLY_PLAYING,
  payload: data
});

