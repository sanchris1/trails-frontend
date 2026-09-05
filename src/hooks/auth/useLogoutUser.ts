import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../logoutUser";
import { tokenStore } from "@/lib/tokenStore";
import toast from "react-hot-toast";

export const useLogoutUser = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      tokenStore.clear();
    },
    onError: () => {
      toast.error("Error occurred while logging out.");
    },
  });
};
