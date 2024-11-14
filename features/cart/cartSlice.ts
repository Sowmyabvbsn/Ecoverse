import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../products/productSlice";

interface ICART {
  id: string;
  userId: string;
  product: IProduct;
  productId: string;
  quantity?: number;
}

interface CartState {
  cart: ICART[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCarts(state, action: PayloadAction<CartState["cart"]>) {
      state.cart = action.payload;
    },
  },
});

export const { setCarts } = cartSlice.actions;

export default cartSlice.reducer;
