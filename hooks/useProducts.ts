import { IProduct, setProducts } from "@/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "./useReduxHooks";

const useProduct = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);

  const createProduct = async (data: IProduct) => {
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const newProduct: IProduct = await response.json();

      dispatch(setProducts([...products, newProduct]));
    } catch (error) {}
  };

  return { createProduct };
};

export default useProduct;
