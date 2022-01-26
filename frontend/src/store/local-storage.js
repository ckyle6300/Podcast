import { createSlice } from '@reduxjs/toolkit';

const storageSlice = createSlice({
  name: 'storage',
  initialState: {
    podcastsRdx: {},
  },
  reducers: {
    updatePodcastList(state, action) {
      state.podcastsRdx = action.payload.value;
    },
  },
});

export default storageSlice;
export const localRdx = storageSlice.actions;
