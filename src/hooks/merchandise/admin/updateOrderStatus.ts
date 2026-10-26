import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { allMerchandiseOrdersQueryKey } from "./fetchAllOrders";
import { userMerchandiseOrdersQueryKey } from "../fetchUserOrders";
import type { MerchandiseOrderStatus } from "@/types/merchandiseOrder";

interface UpdateOrderStatusInput {
  orderId: string;
  status: MerchandiseOrderStatus;
}

async function updateOrderStatus({
  orderId,
  status,
}: UpdateOrderStatusInput): Promise<{ message?: string }> {
  const { data } = await api.put<{ message?: string }>(
    `/shop/orders/update-status/${encodeURIComponent(orderId)}/status`,
    { status },
  );

  return data;
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: (response) => {
      void queryClient.invalidateQueries({
        queryKey: allMerchandiseOrdersQueryKey,
      });
      void queryClient.invalidateQueries({
        queryKey: userMerchandiseOrdersQueryKey,
      });
      toast.success(response.message ?? "Order status updated.");
    },
    onError: (error) => {
      const message = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message
        : undefined;
      toast.error(message ?? "We couldn't update the order status.");
    },
  });
}
