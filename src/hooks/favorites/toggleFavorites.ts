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

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["user-favorites"] });

      const previousFavorites = queryClient.getQueryData(["user-favorites"]);

      queryClient.setQueryData(["user-favorites"], (old: any) => {
        if (!old.allFavorites) return old;

        const exists = old.allFavorites.some(
          (item: any) => String(item.id) === id,
        );

        return {
          ...old,
          allFavorites: exists
            ? old.allFavorites.filter(
                (favorite: any) => String(favorite.id) !== id,
              )
            : old.allFavorites,
        };
      });
      return previousFavorites;
    },

    onSuccess: (data) => {
      toast.success(data.message);
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["user-favorites"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-favorites"] }),
      ]);
    },

    onError: (error: any) => {
      console.error(error);

      if (axios.isAxiosError(error)) {
        console.error(error.response);
      }
    },
  });
}
