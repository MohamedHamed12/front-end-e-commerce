
// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import productReducer from './slices/productSlice';

const store = configureStore({
  reducer: {
    category: categoryReducer,
    products: productReducer, // This must match the slice name used in useSelector
  },
});

export default store;
