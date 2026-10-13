import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

async function fetchAdminGalleryImages() {
  const { data } = await api.get("/gallery/images");

  return data;
}

export const useFetchAdminGalleryImages = () =>
  useQuery({
    queryKey: ["admin-images"],
    queryFn: fetchAdminGalleryImages,
    enabled: true,
  });
