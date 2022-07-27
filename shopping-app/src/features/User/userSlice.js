import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createCurrentUser: (state, action) => {
      let { refreshToken, currentUser } = action.payload;
      localStorage.setItem("user", JSON.stringify(currentUser));
      state.currentUser = { ...currentUser };
      state.token = refreshToken;
    },
    logoutCurrentUser: (state, action) => {
      localStorage.removeItem("user");
      state.currentUser = {};
      state.token = null;
    },
  },
});

export default userSlice.reducer;
export let { createCurrentUser,logoutCurrentUser } = userSlice.actions;
