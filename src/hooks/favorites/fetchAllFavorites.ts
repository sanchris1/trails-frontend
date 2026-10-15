import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export type FavoriteTrail = {
  favoriteId: string;
  id: string;
  title: string;
  image: string | null;
  location: string;
  departureDate: Date;
  duration: number;
  difficulty: string;
  status: string;
  savedAt: string;
  type: "expedition";
  href: string;
  likesCount: number;
};

export type FavoriteProduct = {
  favoriteId: string;
  id: string;
  likesCount: number;
  title: string;
  image: string | null;
  category: string;
  price: number;
  stock: number;
  savedAt: string;
  type: "merchandise";
  href: string;
};

export type FavoriteItem = FavoriteTrail | FavoriteProduct;

export type FavoritesResponse = {
  success: boolean;
  allFavorites: FavoriteItem[];
};

async function fetchAllAdminFavorites() {
  const { data } = await api.get("/favorites/fetch");

  return data;
}

export const useFetchAllAdminFavorites = () =>
  useQuery<FavoritesResponse>({
    queryKey: ["admin-favorites"],
    queryFn: fetchAllAdminFavorites,
  });
