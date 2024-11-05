import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isMenuOpen: boolean;
  isProductModal: boolean;
  showLoading: boolean;
}

const initialState: UIState = {
  isMenuOpen: false,
  isProductModal: false,
  showLoading: false,
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
    setShowLoading(state, actions: PayloadAction<UIState["showLoading"]>) {
      state.showLoading = actions.payload;
    },
  },
});

export const {
  toggleMenu,
  closeMenu,
  openMenu,
  toggleProductModal,
  setShowLoading,
} = uiSlice.actions;
export default uiSlice.reducer;
