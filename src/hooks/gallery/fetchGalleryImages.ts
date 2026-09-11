import { api } from "@/lib/api";

export async function fetchGalleryImages() {
  const { data } = await api.get("/gallery/fetch-all?=page=1&limit=10");

  return data;
}
