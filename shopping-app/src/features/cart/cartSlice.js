import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../apis/Axios";

const initialState = {
  cartItems: [],
  error: "",
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  (userId, payload) => {
    return Axios.post(`/customers/${userId}/carts`, payload);
  }
);

export const getCart = createAsyncThunk("cart/getCart", userId => {
  return Axios.get(`/customers/${userId}/carts`);
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: builder => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cartItems = action.payload.data;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cartItems = action.payload.data;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.error = action.payload.data;
    });
  },
});

export default cartSlice.reducer;
