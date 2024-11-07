import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { setLoginUser } from "@/features/user/userSlice";
import { setShowLoading } from "@/features/ui/uiSlice";

const useUser = () => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector((state) => state.users.loggedInUser);

  const getLoginUser = useCallback(
    async (email: string) => {
      if (loggedInUser !== null) return;
      dispatch(setShowLoading(true));
      try {
        const response = await fetch(`/api/user?email=${email}`);
        const data = await response.json();

        if (response.ok) {
          dispatch(setLoginUser(data));
        } else {
          console.log("No role found:", data.error);
        }
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      } finally {
        dispatch(setShowLoading(false));
      }
    },
    [dispatch]
  );

  return { getLoginUser };
};

export default useUser;
