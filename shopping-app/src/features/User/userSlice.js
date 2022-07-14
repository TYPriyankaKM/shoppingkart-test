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
      let { refreshToken,currentUser } = action.payload;
      state.currentUser = { ...currentUser };
      state.token = refreshToken;
    },
  }
});

export default userSlice.reducer;
export let { createCurrentUser } = userSlice.actions;
