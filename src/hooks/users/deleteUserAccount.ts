import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function deleteUserAccount() {
  const { data } = await api.delete("/users/delete-account");

  return data;
}

export const useDeleteUserAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
};
