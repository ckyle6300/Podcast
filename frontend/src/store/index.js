import { configureStore } from '@reduxjs/toolkit';
import podcastSlice from './podcastInfoSlice';
import searchSlice from './searchSlice';
import storageSlice from './local-storage';

const store = configureStore({
  reducer: {
    podcastInfo: podcastSlice.reducer,
    search: searchSlice.reducer,
    localStore: storageSlice.reducer,
  },
});

export default store;
