/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

async function toggleFavorites(id: string) {
  const { data } = await api.put(`/favorites/toggle/${id}`);

  return data;
}

export function useToggleFavorites() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleFavorites,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["user-favorites"] });
    },

    onError: (error: any) => {
      console.error(error);

      if (axios.isAxiosError(error)) {
        console.error(error.response);
      }
    },
  });
}
