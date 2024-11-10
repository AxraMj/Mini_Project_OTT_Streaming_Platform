import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  photo: "",
  isSubscribed: false, // Add the subscription status here
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoginDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
    },

    setSignOutState: (state) => {
      state.name = null;
      state.email = null;
      state.photo = null;
      state.isSubscribed = false; // Reset subscription status on sign out
    },

    setUserSubscriptionStatus: (state, action) => {
      state.isSubscribed = action.payload; // Set subscription status
    },
  },
});

export const { setUserLoginDetails, setSignOutState, setUserSubscriptionStatus } = userSlice.actions;

// Selectors to access user data and subscription status
export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserPhoto = (state) => state.user.photo;
export const selectUserSubscriptionStatus = (state) => state.user.isSubscribed; // Selector for subscription status

export default userSlice.reducer;
