
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCategories = createAsyncThunk('category/getCategories', async () => {
  const response = await axios.get('https://fakestoreapi.com/products/categories');
  return response.data;
});

const categorySlice = createSlice({
  name: 'category',
  initialState: { list: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default categorySlice.reducer;
