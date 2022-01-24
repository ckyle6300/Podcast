import { createSlice } from '@reduxjs/toolkit';

const podcastSlice = createSlice({
  name: 'podcast',
  initialState: {
    podcast: undefined,
    episode: undefined,
    chapters: undefined,
    count: 0,
  },
  reducers: {
    newPodcast(state, action) {
      state.podcast = action.payload.pod;
      state.episode = action.payload.epi;
      state.chapters = action.payload.chapters;
      state.count = 5;
    },
    updatePodcast(state, action) {
      state.podcast = action.payload.pod;
      state.episode = action.payload.epi;
      state.chapters = action.payload.chapters;
      state.count = 10;
    },
  },
});

export default podcastSlice;
export const playEpisode = podcastSlice.actions;
