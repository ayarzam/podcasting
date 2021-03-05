import { GET_PODCASTS, GOT_PODCASTS, FAVORITES, UPDATE_FAVORITES, PLAY, PAUSE, CURRENTLY_PLAYING } from './actions'

export const getPodcasts = (data) => ({
  type: GET_PODCASTS
});

export const gotPodcasts  = (data) => ({
  type: GOT_PODCASTS,
  payload: data
});

export const Favorites = (data) => ({
  type: FAVORITES,
  payload: data
});

export const updateFavoriteList = (data) => ({
  type: UPDATE_FAVORITES,
  payload: data
});

// export const getFavorites = (data) => ({
//   type: GET_FAVORITES
// });

// export const gotFavorites  = (data) => ({
//   type: GOT_FAVORITES,
//   payload: data
// });

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

// export const dragged = (draggedPodcast) => ({
//   type: DRAG,
//   payload: draggedPodcast
// })

// export const dropped = (droppedPodcast) => ({
//   type: DROP,
//   payload: droppedPodcast
// })

