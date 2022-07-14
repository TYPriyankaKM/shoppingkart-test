import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishList: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      state.wishList.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.wishList = state.wishList.filter(item => item.productsid!==action.payload);
    },
  },
});
export default wishlistSlice.reducer;
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
