import { api } from "@/lib/api";

export async function fetchGalleryImages({
  page = 1,
  limit = 5,
  expeditionId,
}: {
  page?: number;
  limit?: number;
  expeditionId?: string;
}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (expeditionId) {
    params.set("expeditionId", expeditionId);
  }

  const { data } = await api.get(`/gallery/fetch-all?${params.toString()}`);

  return data;
}
