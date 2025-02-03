
// src/store/slices/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category) => {
    const url = category 
      // ? `https://fakestoreapi.com/products/category/${category}`
      // : 'https://fakestoreapi.com/products';
      ? `http://127.0.0.1:8000/api/products/category=${category}`
      : 'http://127.0.0.1:8000/api/products';
    const response = await axios.get(url);
    return response.data['data'];
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductsByCategory.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
