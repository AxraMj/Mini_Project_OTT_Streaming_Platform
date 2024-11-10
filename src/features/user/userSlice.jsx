import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  photo: "",
  isSubscribed: false, // Add subscription status here
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

    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

// Exporting actions
export const { setUserSubscriptionStatus, setUserEmail, setUserLoginDetails, setSignOutState } = userSlice.actions;

// Selectors to access user data and subscription status
export const selectUserSubscriptionStatus = (state) => state.user.isSubscribed;
export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserPhoto = (state) => state.user.photo;

export default userSlice.reducer;
