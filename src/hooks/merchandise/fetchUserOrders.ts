import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { MerchandiseOrdersResponse } from "@/types/merchandiseOrder";

export const userMerchandiseOrdersQueryKey = ["merchandise-orders", "user"];

async function fetchUserOrders(): Promise<MerchandiseOrdersResponse> {
  const { data } = await api.get<MerchandiseOrdersResponse>(
    "/shop/orders/fetch-user",
  );

  return data;
}

export function useFetchUserOrders() {
  return useQuery({
    queryKey: userMerchandiseOrdersQueryKey,
    queryFn: fetchUserOrders,
    staleTime: 60 * 1000,
  });
}
