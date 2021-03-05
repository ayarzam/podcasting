import { GET_PODCASTS, GOT_PODCASTS, FAVORITES, ADD_FAVORITE, REMOVE_FAVORITE, DRAG_LEAVE, DRAG_ENTER, PLAY, PAUSE, CURRENTLY_PLAYING } from './actions'

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

export const addFavorite = (data) => ({
  type: ADD_FAVORITE,
  payload: data
});

export const removeFavorite = (data) => ({
  type: REMOVE_FAVORITE,
  payload: data
})

export const dragLeave = (data) => ({
  type: DRAG_LEAVE, 
  payload: data
})

export const dragEnter = (data) => ({
  type: DRAG_ENTER,
  payload: data
})

// export const getFavorites = (data) => ({
//   type: GET_FAVORITES
// });

// export const gotFavorites  = (data) => ({
//   type: GOT_FAVORITES,
//   payload: data
// });

export const playing = (data) => ({
  type: PLAY,
  payload: data
});

export const paused = (data) =>({
  type: PAUSE, 
  payload: data
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

