import { createSlice } from '@reduxjs/toolkit';
import { addMovieToFirestoreWatchlist, removeMovieFromFirestoreWatchlist, getFirestoreWatchlist } from '../../firebase'; // Updated path

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    movies: [],
    userId: null,  // Add userId to handle user-specific data
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setWatchlist: (state, action) => {
      state.movies = action.payload;
    },
    addMovieToWatchlist: (state, action) => {
      if (!state.movies.find(movie => movie.id === action.payload.id)) {
        state.movies.push(action.payload);
        if (state.userId) {
          addMovieToFirestoreWatchlist(state.userId, action.payload);
        }
      }
    },
    removeMovieFromWatchlist: (state, action) => {
      const updatedWatchlist = state.movies.filter(movie => movie.id !== action.payload.id);
      state.movies = updatedWatchlist;
      if (state.userId) {
        removeMovieFromFirestoreWatchlist(state.userId, action.payload.id);
      }
    },
  },
});

export const { setUserId, setWatchlist, addMovieToWatchlist, removeMovieFromWatchlist } = watchlistSlice.actions;
export const selectWatchlist = state => state.watchlist.movies;
export const selectUserId = state => state.watchlist.userId;
export default watchlistSlice.reducer;
