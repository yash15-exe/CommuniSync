import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  joinedCommunities: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    joinCommunity: (state, action) => {
      state.joinedCommunities = action.payload;
    },
  },
});

export const { login, logout, joinCommunity } = authSlice.actions;
export default authSlice.reducer;
