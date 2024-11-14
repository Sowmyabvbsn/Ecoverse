import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { setShowLoading } from "@/features/ui/uiSlice";
import { setCarts } from "@/features/cart/cartSlice";

const useCart = () => {
  const dispatch = useAppDispatch();
  const carts = useAppSelector((state) => state.carts.cart);

  const memoizedCart = useMemo(() => carts, [carts]);

  const getCarts = useCallback(
    async (id: string) => {
      if (memoizedCart && memoizedCart.length > 0) return;
      try {
        dispatch(setShowLoading(true));

        const response = await fetch(`http://localhost:3000/api/cart?id=${id}`);
        const data = await response.json();
        dispatch(setCarts(data.data));
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setShowLoading(false));
      }
    },
    [dispatch, memoizedCart]
  );

  return { getCarts };
};

export default useCart;
