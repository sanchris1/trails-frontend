import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface UserFavoriteMerchandiseResponseBody {
  images: { url: string; publicId: string }[];
  title: string;
  stock: number;
  price: number;
  category: string;
  slug: string;
  id: string;
}

export interface UserFavoriteMerchandiseResponse {
  allUserFavoritesMerchandise: UserFavoriteMerchandiseResponseBody[];
  success: boolean;
}

const fetchUserFavoriteMerchandise = async () => {
  const { data } = await api.get("/merchandise/fetch-user");
  return data;
};

export const useFetchUserFavoriteMerchandise = () =>
  useQuery<UserFavoriteMerchandiseResponse>({
    queryKey: ["user-favorite-merchandise"],
    queryFn: fetchUserFavoriteMerchandise,
    staleTime: 5 * 60 * 1000,
  });
