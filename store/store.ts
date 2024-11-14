import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/ui/uiSlice";
import productReducer from "../features/products/productSlice";
import userReducer from "../features/user/userSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    products: productReducer,
    users: userReducer,
    carts: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
