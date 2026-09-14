import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export async function fetchExpeditionsWithGallery() {
  const { data } = await api.get("/gallery/expeditions");

  return data;
}

export default function useFetchExpeditionsWithGallery() {
  return useQuery({
    queryKey: ["expeditions", "gallery"],
    queryFn: fetchExpeditionsWithGallery,
  });
}
