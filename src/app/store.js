import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import movieReducer from "../features/movie/movieSlice";
import watchlistReducer from "../features/watchlist/watchlistSlice"; // Correct import

const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
    watchlist: watchlistReducer,
  },
});

export default store;