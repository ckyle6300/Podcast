import { createSlice } from '@reduxjs/toolkit';

const selectedSlice = createSlice({
  name: 'selected',
  initialState: {
    podcast: [],
    episodes: [],
    recentEpisodes: [],
    lastUpdated: undefined,
  },
  reducers: {
    updatePodcast(state, action) {
      state.podcast = action.payload.podcast;
      state.episodes = action.payload.episodes;
    },
    updateRecentPodcasts(state, action) {
      state.recentEpisodes = action.payload.recent;
      state.lastUpdated = Date.now();
    },
  },
});

export const sendPodcastData = (podcastId) => {
  return async (dispatch) => {
    const req = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/podcast/${podcastId}`
    );
    const info = await req.json();

    dispatch(
      selectedPodcast.updatePodcast({
        podcast: info.podcast.feed,
        episodes: info.episodes.items,
      })
    );
  };
};

export const updateRecent = (podcastIds) => {
  return async (dispatch) => {
    const data = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/podcast/recent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ podcastIds: podcastIds }),
      }
    );

    const epi = await data.json();

    dispatch(selectedPodcast.updateRecentPodcasts({ recent: epi.items }));
  };
};

export default selectedSlice;
export const selectedPodcast = selectedSlice.actions;
