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
    },
    onError: () => {
      toast.error("Error occurred while logging out.");
    },
  });
};
