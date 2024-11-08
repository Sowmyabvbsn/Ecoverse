import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { IUser, setLoginUser } from "@/features/user/userSlice";
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

  const updateUser = useCallback(
    async (user: IUser, id: string) => {
      console.log(id);

      dispatch(setShowLoading(true));
      try {
        const response = await fetch(`/api/user?id=${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          throw new Error(`Failed to update user: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("User updated successfully:", data);
      } catch (error) {
        console.error("Failed to update user:", error);
      } finally {
        dispatch(setShowLoading(false));
      }
    },
    [dispatch]
  );

  return { getLoginUser, updateUser };
};

export default useUser;
