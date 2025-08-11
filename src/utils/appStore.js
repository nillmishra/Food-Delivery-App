import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // Fix spelling: 'cartReducer', not 'cardReducer'

const appStore = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export default appStore;