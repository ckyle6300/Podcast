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

console.log('why am I here?');

export default storageSlice;
export const localRdx = storageSlice.actions;
