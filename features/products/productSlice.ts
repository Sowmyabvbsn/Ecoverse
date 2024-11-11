import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IProduct {
  id?: string;
  title: string;
  description: string;
  images: string[];
  sellerId: string;
  price: number;
  rating?: number;
  category: string[];
  review?: IReview[];
  stocks?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IReview {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

interface FilterState {
  sustainability: string[];
  category: string[];
  seller: string[];
}

interface ProductState {
  products: IProduct[];
  sellerProducts: IProduct[];
  currentPage: number;
  searchTerm: string;
  filters: FilterState;
  itemsPerPage: number;
  maxPrice: number;
}

const initialState: ProductState = {
  products: [],
  sellerProducts: [],
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
    setProducts(state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
    },
    setSellerProducts(state, action: PayloadAction<IProduct[]>) {
      state.sellerProducts = action.payload;
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
  setSellerProducts,
  setCurrentPage,
  setFilters,
  updateFilter,
  setPriceRange,
  updateMaxPrice,
  setSearchTerm,
} = productSlice.actions;

export default productSlice.reducer;
