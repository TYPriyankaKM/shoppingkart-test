import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../apis/Axios";

const initialState = {
  productList: [],
  error: "",
};
export const fetchProducts = createAsyncThunk("product/fetchProducts", () => {
  return fetch(
    "http://localhost:8080/shopping-kart-ty-api-0.0.1-SNAPSHOT/products"
  ).then(res => res.json());
});
const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      state.productList = action.payload.data;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.error = action.error.message;
    },
  },
});
export default productSlice.reducer;
