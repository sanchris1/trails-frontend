import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../logoutUser";
import { tokenStore } from "@/lib/tokenStore";
import toast from "react-hot-toast";

export const useLogoutUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      tokenStore.clear();
      queryClient.setQueryData(["session"], null);
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["session"] }),
        queryClient.invalidateQueries({ queryKey: ["notifications"] }),
        queryClient.invalidateQueries({ queryKey: ["user-notification"] }),
        queryClient.invalidateQueries({
          queryKey: ["user-favorite-merchandise"],
        }),
        queryClient.invalidateQueries({ queryKey: ["user-favorites"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-stats"] }),
        queryClient.invalidateQueries({ queryKey: ["bookings"] }),
      ]);
    },
    onError: () => {
      toast.error("Error occurred while logging out.");
    },
  });
};
