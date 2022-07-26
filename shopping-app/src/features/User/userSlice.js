import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../apis/Axios"
const initialState = {
  currentUser: {},
  token: null,
};

// editProfile
export const editProfile =createAsyncThunk("user/editProfile",async(userData)=>{
  let {id, payload} = userData
  await Axios.put(`customers/${id}`, payload)
  return {...userData}
   
})


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
    getCurrentUser:(state,action)=>{
      state.currentUser=state.currentUser
    }
  },
  extraReducers:{
    [editProfile.fulfilled]:(state, action)=>{ 
            
      // let index = state.currentUser.findIndex((v) => v.userId == action.payload.id);
      state.currentUser= {...action.payload.payload}
      
  },
  [editProfile.rejected]: (state, action) => {
      state.error = action.error.message;
  },
  }

});








export default userSlice.reducer;
export let { createCurrentUser,logoutCurrentUser, getCurrentUser} = userSlice.actions;
