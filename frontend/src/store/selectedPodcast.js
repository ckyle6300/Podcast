import { createSlice } from '@reduxjs/toolkit';

const selectedSlice = createSlice({
  name: 'selected',
  initialState: {
    podcast: [],
    episodes: [],
  },
  reducers: {
    updatePodcast(state, action) {
      state.podcast = action.payload.podcast;
      state.episodes = action.payload.episodes;
    },
  },
});

export const sendPodcastData = (podcastId) => {
  return async (dispatch) => {
    const req = await fetch(`http://localhost:5100/podcast/${podcastId}`);
    const info = await req.json();

    dispatch(
      selectedPodcast.updatePodcast({
        podcast: info.podcast.feed,
        episodes: info.episodes.items,
      })
    );
  };
};

export default selectedSlice;
export const selectedPodcast = selectedSlice.actions;
