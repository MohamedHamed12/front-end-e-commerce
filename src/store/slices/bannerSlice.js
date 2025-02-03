import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBanners = createAsyncThunk('banner/getBanners', async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/banner');
  const banners = response.data['data'];
  console.log(banners);  // This will log the banners array
  console.log(response); // This will log the full response object
  return banners;
});

const bannerSlice = createSlice({
  name: 'banner',
  initialState: { list: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBanners.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default bannerSlice.reducer;
