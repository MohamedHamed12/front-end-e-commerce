import { configureStore, createSlice } from "@reduxjs/toolkit";

// Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] }, // Empty cart initially
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;


export default cartSlice.reducer;

