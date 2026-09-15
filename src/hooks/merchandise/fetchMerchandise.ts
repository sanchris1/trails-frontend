import { api } from "@/lib/api";
import { MerchandiseResponse } from "@/types/t.types";
import { useQuery } from "@tanstack/react-query";

async function fetchAllMerchandise() {
  const { data } = await api.get("/shop/");

  return data;
}

export function useFetchAllMerchandise() {
  return useQuery<MerchandiseResponse>({
    queryKey: ["merchandise"],
    queryFn: fetchAllMerchandise,
  });
}
