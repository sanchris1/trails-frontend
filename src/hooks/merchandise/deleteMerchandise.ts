import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

async function deleteMerchandise({ merchandiseId }: { merchandiseId: string }) {
  const { data } = await api.delete(`/shop/delete/${merchandiseId}`);

  return data;
}

export function useDeleteMerchandise() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMerchandise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["merchandise"] });

      toast.success("Merchandise deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting the merchandise");
    },
  });
}
