import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  numReviews: number;
  certifications: string[];
  seller?: string;
}

interface FilterState {
  sustainability: string[];
  category: string[];
  seller: string[];
}

interface ProductState {
  products: IProduct[];
  currentPage: number;
  searchTerm: string;
  filters: FilterState;
  itemsPerPage: number;
  maxPrice: number;
}

const initialState: ProductState = {
  products: [],
  currentPage: 1,
  searchTerm: "",
  filters: {
    sustainability: [],
    category: [],
    seller: [],
  },
  maxPrice: 0,
  itemsPerPage: 20,
};

export type FilterType = keyof Omit<FilterState, "priceRange">;

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<ProductState["products"]>) {
      state.products = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<ProductState["currentPage"]>) {
      state.currentPage = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<ProductState["searchTerm"]>) {
      state.searchTerm = action.payload;
    },
    setFilters(state, action: PayloadAction<ProductState["filters"]>) {
      state.filters = action.payload;
    },
    updateFilter(
      state,
      action: PayloadAction<{ filterType: FilterType; value: string }>
    ) {
      const { filterType, value } = action.payload;
      if (!state.filters[filterType].includes(value)) {
        state.filters[filterType].push(value);
      } else {
        state.filters[filterType] = state.filters[filterType].filter(
          (e) => e !== value
        );
      }
    },
    setPriceRange(state, action: PayloadAction<ProductState["maxPrice"]>) {
      state.maxPrice = action.payload;
    },
    updateMaxPrice(state, action: PayloadAction<ProductState["maxPrice"]>) {
      state.maxPrice = action.payload;
    },
  },
});

export const {
  setProducts,
  setCurrentPage,
  setFilters,
  updateFilter,
  setPriceRange,
  updateMaxPrice,
  setSearchTerm,
} = productSlice.actions;

export default productSlice.reducer;
