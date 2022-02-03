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

export const playPodcast = (podcast, episode, count) => {
  return async (dispatch) => {
    const data = await fetch('http://localhost:5100/podcast/chapters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chapterUrl: episode.chaptersUrl }),
    });

    const chp = await data.json();

    if (count === 0) {
      dispatch(
        playEpisode.newPodcast({
          pod: podcast,
          epi: episode,
          chapters: chp,
        })
      );
    } else {
      dispatch(
        playEpisode.updatePodcast({
          pod: podcast,
          epi: episode,
          chapters: chp,
        })
      );
    }
  };
};

export const playEpisode = podcastSlice.actions;
export default podcastSlice;
