import {
  IProduct,
  setProducts,
  setSellerProducts,
} from "@/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { useCallback, useMemo } from "react";
import { setShowLoading } from "@/features/ui/uiSlice";

const useProduct = () => {
  const dispatch = useAppDispatch();
  const sellerProducts = useAppSelector(
    (state) => state.products.sellerProducts
  );
  const products = useAppSelector((state) => state.products.products);

  const memoizedSellerProducts = useMemo(
    () => sellerProducts,
    [sellerProducts]
  );

  const memoizedProducts = useMemo(() => products, [products]);

  const createProduct = async (data: IProduct) => {
    try {
      dispatch(setShowLoading(true));
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const newProduct: IProduct = await response.json();

      dispatch(setSellerProducts([...memoizedSellerProducts, newProduct]));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setShowLoading(false));
    }
  };

  const getSellerProducts = useCallback(
    async (sellerId: string) => {
      if (memoizedSellerProducts && memoizedSellerProducts.length > 0) return;
      try {
        dispatch(setShowLoading(true));
        const response = await fetch(
          `/api/products?sellerId=${sellerId}`
        );

        const products = await response.json();
        dispatch(setSellerProducts(products.data));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setShowLoading(false));
      }
    },
    [dispatch, memoizedSellerProducts]
  );

  const getProducts = useCallback(async () => {
    if (memoizedProducts && memoizedProducts.length > 0) return;
    try {
      dispatch(setShowLoading(true));
      const response = await fetch(`/api/products`);

      const products = await response.json();
      dispatch(setProducts(products.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setShowLoading(false));
    }
  }, [dispatch, memoizedProducts]);

  const getProductByID = useCallback(
    async (id: string) => {
      const productExists = memoizedProducts.find(
        (product) => product.id === id
      );
      if (productExists) {
        return productExists;
      }

      try {
        dispatch(setShowLoading(true));
        const response = await fetch(
          `/api/products/${id}`
        );
        const product = await response.json();

        if (product.data) {
          // dispatch(setProducts([...memoizedProducts, product.data]));
          return product.data;
        }
      } catch (error) {
        console.error("Error fetching single product:", error);
      } finally {
        dispatch(setShowLoading(false));
      }
    },
    [dispatch, memoizedProducts]
  );

  return { createProduct, getSellerProducts, getProducts, getProductByID };
};

export default useProduct;
