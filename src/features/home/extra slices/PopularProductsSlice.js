import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProductsByFilters } from "../../product/ProductApi";

const initialState = {
  products: [],
  state: "idle",
};
export const fetchPopularProductsAsync = createAsyncThunk(
  "popularProducts/fetchPopular",
  async (filter) => {
    const response = await fetchAllProductsByFilters(filter);
    return response.data;
  }
);

export const popularProductsSlice = createSlice({
  name: "popularProducts",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularProductsAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPopularProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      });
  },
});

export default popularProductsSlice.reducer;
export const selectPopularProducts = (state) => state.popularProducts.products;
