import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    inpSearch: '',
    podResults: [],
  },
  reducers: {
    updateSearch(state, action) {
      state.inpSearch = action.payload.value;
    },
    updatePodcasts(state, action) {
      state.podResults = action.payload.pods;
    },
  },
});

export default searchSlice;
export const searchActions = searchSlice.actions;
