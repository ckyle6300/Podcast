import { configureStore } from '@reduxjs/toolkit';
import podcastSlice from './podcastInfoSlice';
import searchSlice from './searchSlice';

const store = configureStore({
  reducer: { podcastInfo: podcastSlice.reducer, search: searchSlice.reducer },
});

export default store;
