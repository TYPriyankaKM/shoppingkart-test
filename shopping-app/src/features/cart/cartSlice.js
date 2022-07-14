import { createSlice } from "@reduxjs/toolkit";
import Axios from "../../apis/Axios";

const initialState = {
  cartItems: [],
  cartTotal: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
       state.cartItems.push(action.payload);
      // try {
      //   Axios.post(`/`)
      // }
    },
    getCartTotal: state => {
      state.cartTotal = state.cartItems.reduce(
        (acc, item) => acc + item.price,
        0
      );
    },
    removeFromCart: (state, action) => {
      state.cartItems.splice(action.payload, 1);
    },
    removeWholeProduct: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.productsid!==action.payload);
    }
  },
});
export default cartSlice.reducer;
export const { addToCart, getCartTotal, removeFromCart,removeWholeProduct} =
  cartSlice.actions;
