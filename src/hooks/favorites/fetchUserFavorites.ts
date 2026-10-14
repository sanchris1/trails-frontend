import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface UserFavoritesResponseBody {
  image: string;
  status: "scheduled" | "ongoing" | "cancelled" | "completed";
  title: string;
  location: string;
  departureDate: string;
  difficulty: string;
  expeditionId: string;
}

export interface UserFavoritesResponse {
  allUserFavorites: UserFavoritesResponseBody[];
  success: boolean;
}

const fetchUserFavorites = async () => {
  const { data } = await api.get("/favorites/fetch-user");
  return data;
};

export const useFetchUserFavorites = () =>
  useQuery<UserFavoritesResponse>({
    queryKey: ["user-favorites"],
    queryFn: fetchUserFavorites,
    staleTime: 5 * 60 * 1000,
  });
