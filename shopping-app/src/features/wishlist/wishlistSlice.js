// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   wishList: [],
// };

// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState,
//   reducers: {
//     addToWishlist: (state, action) => {
//       state.wishList.push(action.payload);
//     },
//     removeFromWishlist: (state, action) => {
//       state.wishList = state.wishList.filter(item => item.productsid!==action.payload);
//     },
//   },
// });
// export default wishlistSlice.reducer;
// export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;



import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import Axios from "../../apis/Axios"

const initialState={
    wishList:[],
    error :""
}

export const addToWishlist =createAsyncThunk("wishlist/addToWishlist",async(payload)=>{
  await Axios.post(`/customers/${payload.userId}/wishlist`, payload.payload);
  return payload.payload
})


export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  payload => {
    return Axios.delete(`/customers/${payload.userId}/wishlist/${payload.cartId}`);
  }
);

export const getAllWishList = createAsyncThunk(
  "wishlist/getAllWishList",
  payload => {
    return Axios.get(`/customers/${payload.userId}/wishlist`);
  }
);

const wishlistSlice =createSlice({
    name:"wishlist",
    initialState,
    extraReducers:{
        [addToWishlist.fulfilled]:(state, action)=>{
            state.wishList= action.payload.data;
        },
        [addToWishlist.rejected]: (state, action) => {
            state.error = action.error.message;
          },
        [removeFromWishlist.fulfilled]:(state, action)=>{
            console.log(action.payload.data.message)
        },
        [removeFromWishlist.rejected]: (state, action) => {
            console.log(action.payload.data.message)
          },
          [getAllWishList.fulfilled]:(state, action)=>{
            state.wishList= action.payload.data;
        },
        [getAllWishList.rejected]: (state, action) => {
            state.error = action.error.message;
          },
    }
})

export default wishlistSlice.reducer