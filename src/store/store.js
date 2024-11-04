
// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';
const store = configureStore({
  reducer: {
    category: categoryReducer,
    products: productReducer, // This must match the slice name used in useSelector
    auth: authReducer,
  },
});

export default store;


