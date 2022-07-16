import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../apis/Axios";

const initialState = {
  cartItems: [],
  error: "",
  cartTotal: "",
};

export const addToCart = createAsyncThunk("cart/addToCart", payload => {
  return Axios.post(`/customers/${payload.userId}/carts`, payload.payload);
});

export const getCart = createAsyncThunk("cart/getCart", userId => {
  return fetch(
    `http://localhost:8080/shopping-kart-ty-api-0.0.1-SNAPSHOT/customers/${userId}/carts`
  ).then(res => res.json());
});
export const deleteFromCart = createAsyncThunk(
  "cart/deleteFromCart",
  payload => {
    return Axios.delete(`/customers/${payload.userId}/carts/${payload.cartId}`);
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCartTotal: (state, action) => {
      state.cartTotal = state.cartItems.reduce(
        (acc, item) => acc + item.cost,
        0
      );
    },
  },
  extraReducers: builder => {
    // builder.addCase(addToCart.fulfilled, (state, action) => {
    //   state.cartItems = action.payload.data;
    // });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cartItems = action.payload.data;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.error = action.payload.data;
    });
  },
});

export default cartSlice.reducer;
export const { getCartTotal } = cartSlice.actions;
