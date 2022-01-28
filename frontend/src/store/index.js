import { configureStore } from '@reduxjs/toolkit';
import podcastSlice from './podcastInfoSlice';

import storageSlice from './local-storage';

const store = configureStore({
  reducer: {
    podcastInfo: podcastSlice.reducer,
    localStore: storageSlice.reducer,
  },
});

export default store;
