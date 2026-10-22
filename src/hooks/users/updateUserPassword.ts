/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

async function updateUserPassword({
  currentPassword,
  newPassword,
}: {
  newPassword: string;
  currentPassword: string;
}) {
  const { data } = await api.put("/users/update-password", {
    currentPassword,
    newPassword,
  });

  return data;
}

export const useUpdateUserPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserPassword,
    onSuccess: () => {
      toast.success("Password updated successfully");

      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
    onError: (error: any) => {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while updating the password");
      }
    },
  });
};
