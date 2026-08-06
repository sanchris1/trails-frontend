import { api } from "@/lib/api";
import { Adventure, AdventureFilters, Pagination } from "@/types/t.types";
export interface AdventureResponse {
  success: boolean;
  data: Adventure[];
  pagination: Pagination;
  filters: AdventureFilters;
}

export const fetchAllAdventures = async (query: string) => {
  const { data } = await api.get<AdventureResponse>(`/adventures/get?${query}`);
  console.log(data);
  return data;
};
