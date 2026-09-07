import { api } from "@/lib/api";

export async function fetchFeatured() {
  const { data } = await api.get("/expeditions/featured");

  return data;
}
