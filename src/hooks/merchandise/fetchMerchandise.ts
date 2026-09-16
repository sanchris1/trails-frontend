import { api } from "@/lib/api";
import { MerchandiseResponse } from "@/types/t.types";
import { useQuery } from "@tanstack/react-query";

async function fetchAllMerchandise(
  params: {
    search?: string;
    category?: string;
    limit?: number;
    page?: number;
    sort?: string;
  } = {},
) {
  const query = new URLSearchParams();

  if (params.category) query.set("category", params.category);
  if (params.search) query.set("search", params.search);
  if (params.page) query.set("page", String(params.page));
  if (params.category) query.set("category", params.category);
  if (params.sort) query.set("sort", params.sort);

  const { data } = await api.get(`/shop?${query.toString()}`);

  return data;
}

export function useFetchAllMerchandise(
  params: {
    search?: string;
    category?: string;
    limit?: number;
    sort?: string;
    page?: number;
  } = {},
) {
  return useQuery<MerchandiseResponse>({
    queryKey: [
      "merchandise",
      params.category,
      params.limit,
      params.search,
      params.sort,
      params.page,
    ],
    queryFn: ({ pageParam }) =>
      fetchAllMerchandise({ ...params, page: pageParam }),
    keepPreviousData: true,
  });
}
