import { createSlice, configureStore } from '@reduxjs/toolkit';

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
      console.log(action);
      state.podcast = action.payload.pod;
      state.episode = action.payload.epi;
      state.chapters = action.payload.chapters;
      state.count = 5;
    },
    updatePodcast(state, action) {
      state.podcast = action.payload.pod;
      state.episode = action.payload.epi;
      state.chp = action.payload.chapters;
      state.count = 10;
    },
  },
});

const store = configureStore({
  reducer: { podcastInfo: podcastSlice.reducer },
});

export const playEpisode = podcastSlice.actions;
export default store;
