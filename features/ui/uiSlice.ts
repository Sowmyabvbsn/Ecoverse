import { createSlice } from "@reduxjs/toolkit";

interface uiState {
  isMenuOpen: boolean;
  isProductModal: boolean;
}

const initialState: uiState = {
  isMenuOpen: false,
  isProductModal: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    openMenu: (state) => {
      state.isMenuOpen = true;
    },
    toggleProductModal: (state) => {
      state.isProductModal = !state.isProductModal;
    },
  },
});

export const { toggleMenu, closeMenu, openMenu, toggleProductModal } =
  uiSlice.actions;
export default uiSlice.reducer;
