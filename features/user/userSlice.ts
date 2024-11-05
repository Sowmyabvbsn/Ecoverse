import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: Date;
  password: string;
  role: Role;
  ecoLoyaltyPoints?: number;
  carbonOffsetContribution?: number;
  isEcoCertifiedSeller?: Boolean;
  address?: Address;
  Product?: Product[];
  createdAt: Date;
  updatedAt: Date;
  Review?: IReview[];
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  userId: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  images: string[];
  sellerId: string;
  category: string[];
  price: number;
  stocks: number;
  review: IReview[];
  createdAt: Date;
  updatedAt: Date;
}

interface IReview {
  id: string;
  userId: string;
  productId: string;

  rating: number;
  comment: string;
  createdAt: Date;
}

export enum Role {
  BUYER = "BUYER",
  SELLER = "SELLER",
  ADMIN = "ADMIN",
}

interface UserState {
  loggedInUser: IUser | null;
  sellerUsers?: IUser[];
}

const initialState: UserState = {
  loggedInUser: null,
  sellerUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginUser(state, action: PayloadAction<IUser | null>) {
      state.loggedInUser = action.payload;
    },
    setSellerUsers(state, action: PayloadAction<IUser[]>) {
      state.sellerUsers = action.payload;
    },
  },
});

export const { setLoginUser, setSellerUsers } = userSlice.actions;

export default userSlice.reducer;
