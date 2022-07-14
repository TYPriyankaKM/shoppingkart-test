import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../apis/Axios";

const initialState = {
  productList: [],
};
export const fetchProducts = createAsyncThunk("product/fetchProducts", () => {
  return Axios.get("/api/allProduct");
});
const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      state.productList = action.payload.data;
    },
  },
});
export default productSlice.reducer;
