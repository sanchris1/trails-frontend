import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

async function updateUserDetails({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const { data } = await api.put("/users/update-details", { name, email });

  return data;
}

export const useUpdateUserDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserDetails,
    onSuccess: () => {
      toast.success("User details updated successfully");

      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
};
