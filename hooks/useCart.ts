import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { setShowLoading } from "@/features/ui/uiSlice";
import { ICART, setCarts } from "@/features/cart/cartSlice";
import { useCallback, useRef } from "react";

const useCart = () => {
  const dispatch = useAppDispatch();
  const carts = useAppSelector((state) => state.carts.cart);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const isUpdating = useRef<boolean>(false);

  const getCarts = useCallback(
    async (userId: string) => {
      if (carts.length > 0) return; // No need to fetch if carts are already loaded
      try {
        dispatch(setShowLoading(true));

        const response = await fetch(
          `/api/cart?id=${userId}`
        );
        const data = await response.json();
        dispatch(setCarts(data.data));
      } catch (error) {
        console.error("Error fetching carts:", error);
      } finally {
        dispatch(setShowLoading(false));
      }
    },
    [dispatch, carts.length]
  );

  //   TODO: Add to cart

  const addToCart = async (
    userId: string,
    productId: string,
    quantity?: number
  ) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({
          userId,
          productId,
          quantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      const existingCartItem = carts.find(
        (item) => item.product.id === productId
      );

      if (existingCartItem) {
        const updatedCartItem = await response.json();
        // Update local state with the new cart item
        const updatedCarts = carts.map((item) =>
          item.id === updatedCartItem.id
            ? { ...item, quantity: updatedCartItem.quantity }
            : item
        );
        dispatch(setCarts(updatedCarts));
        await getCarts(userId);
      } else {
        const newCartItem = await response.json();
        // Add new cart item to the state
        dispatch(setCarts([...carts, newCartItem]));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateQuantity = async (
    cartId: string,
    quantity: number,
    action: "INCREASE" | "DECREASE"
  ) => {
    // Prevent multiple rapid requests while one is being processed
    if (isUpdating.current) return;

    // Set the updating state to true
    isUpdating.current = true;

    // Cancel any previous debounce timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    try {
      // Set a debounce timeout to trigger the API request after 300ms of inactivity
      debounceTimeout.current = setTimeout(async () => {
        const response = await fetch(`/api/cart`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: cartId,
            quantity,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update cart quantity");
        }
      }, 300);

      // Update the cart locally
      const updatedCart = carts
        .map((item) => {
          if (item.id !== cartId) return item;

          const currentQuantity = item.quantity ?? 1;
          const newQuantity =
            action === "INCREASE" ? currentQuantity + 1 : currentQuantity - 1;

          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        })
        .filter((item): item is ICART => item !== null);

      dispatch(setCarts(updatedCart));
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      isUpdating.current = false; // Reset updating state after the API call
    }
  };

  const deleteCart = async (cartId: string) => {
    try {
      const updatedCarts = carts.filter((item) => item.id !== cartId);
      dispatch(setCarts(updatedCarts));

      const response = await fetch(`/api/cart`, {
        method: "DELETE",
        body: JSON.stringify({
          id: cartId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete cart item");
      }
    } catch (error) {
      dispatch(setCarts(carts));
      console.error("Error deleting cart item:", error);
    }
  };

  return { getCarts, updateQuantity, deleteCart, addToCart };
};

export default useCart;
