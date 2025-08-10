// src/utils/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    addItems: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        item => item.card.info.id === newItem.card.info.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    },

    removeItems: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find(
        item => item.card.info.id === itemId
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(
            item => item.card.info.id !== itemId
          );
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { addItems, removeItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
