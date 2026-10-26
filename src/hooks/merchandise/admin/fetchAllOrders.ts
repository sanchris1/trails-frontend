import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { MerchandiseOrdersResponse } from "@/types/merchandiseOrder";

export const allMerchandiseOrdersQueryKey = ["merchandise-orders", "admin"];

async function fetchAllOrders(): Promise<MerchandiseOrdersResponse> {
  const { data } = await api.get<MerchandiseOrdersResponse>(
    "/shop/orders/fetch-all",
  );

  return data;
}

export function useFetchAllOrders() {
  return useQuery({
    queryKey: allMerchandiseOrdersQueryKey,
    queryFn: fetchAllOrders,
    staleTime: 60 * 1000,
  });
}
