import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../apis/Axios";

const initialState = {
  productList: [],
  error: "",
};
export const fetchProducts = createAsyncThunk("product/fetchProducts", () => {
  return Axios.get("/products");
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
