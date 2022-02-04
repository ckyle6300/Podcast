import { configureStore } from '@reduxjs/toolkit';
import podcastSlice from './podcastInfoSlice';
import selectedSlice from './selectedPodcast';
import storageSlice from './local-storage';

const store = configureStore({
  reducer: {
    podcastInfo: podcastSlice.reducer,
    localStore: storageSlice.reducer,
    selected: selectedSlice.reducer,
  },
});

export default store;
