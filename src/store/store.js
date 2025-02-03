
// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';
import bannerReducer from './slices/bannerSlice';
import cartReducer from './slices/CartSlice';
const store = configureStore({
  reducer: {
    category: categoryReducer,
    products: productReducer, // This must match the slice name used in useSelector
    auth: authReducer,
    banner: bannerReducer,
     cart: cartReducer
  },
});

export default store;


