import { createSlice } from '@reduxjs/toolkit';
import LocStorage from '../utils/storage-model';

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

export const addToFavorites = (list, favorite, podcast) => {
  return (dispatch) => {
    if (!favorite) {
      list[podcast.id] = podcast;
    } else {
      delete list[podcast.id];
    }

    LocStorage.add('PodcastList', list);

    dispatch(localRdx.updatePodcastList({ value: list }));
  };
};

export default storageSlice;
export const localRdx = storageSlice.actions;
