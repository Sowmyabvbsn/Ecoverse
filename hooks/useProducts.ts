import {
  IProduct,
  setProducts,
  setSellerProducts,
} from "@/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { useCallback } from "react";
import { setShowLoading } from "@/features/ui/uiSlice";

const useProduct = () => {
  const dispatch = useAppDispatch();
  const sellerProducts = useAppSelector(
    (state) => state.products.sellerProducts
  );
  const products = useAppSelector((state) => state.products.products);

  const createProduct = async (data: IProduct) => {
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const newProduct: IProduct = await response.json();

      dispatch(setSellerProducts([...sellerProducts, newProduct]));
    } catch (error) {
      console.log(error);
    }
  };

  const getSellerProducts = useCallback(
    async (sellerId: string) => {
      if (sellerProducts && sellerProducts.length > 0) return;
      try {
        dispatch(setShowLoading(true));
        const response = await fetch(
          `http://localhost:3000/api/products?sellerId=${sellerId}`
        );

        const products = await response.json();
        dispatch(setSellerProducts(products.data));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setShowLoading(false));
      }
    },
    [dispatch]
  );

  const getProducts = useCallback(async () => {
    if (products && products.length > 0) return;
    try {
      dispatch(setShowLoading(true));
      const response = await fetch(`http://localhost:3000/api/products`);

      const products = await response.json();
      dispatch(setProducts(products.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setShowLoading(false));
    }
  }, [dispatch]);

  return { createProduct, getSellerProducts, getProducts };
};

export default useProduct;
