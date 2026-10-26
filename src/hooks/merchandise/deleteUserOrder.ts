import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { userMerchandiseOrdersQueryKey } from "./fetchUserOrders";

async function deleteUserOrder(orderId: string): Promise<void> {
  await api.delete(`/shop/orders/delete/${encodeURIComponent(orderId)}`);
}

export function useDeleteUserOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userMerchandiseOrdersQueryKey,
      });
      toast.success("Order deleted successfully.");
    },
    onError: () => {
      toast.error("We couldn't delete this order. Please try again.");
    },
  });
}
