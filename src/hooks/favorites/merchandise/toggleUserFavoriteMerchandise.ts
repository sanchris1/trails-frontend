/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

async function toggleUserFavoriteMerchandise(id: string) {
  const { data } = await api.put(`/merchandise/toggle/${id}`);

  return data;
}

export function useToggleUserFavoriteMerchandise() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleUserFavoriteMerchandise,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["user-favorite-merchandise"],
      });
    },

    onError: (error: any) => {
      console.error(error);

      if (axios.isAxiosError(error)) {
        console.error(error.response);
      }
    },
  });
}
