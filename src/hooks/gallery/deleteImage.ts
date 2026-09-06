import { api } from "@/lib/api";

export async function deleteImage(expeditionId: string, imagePublicId: string) {
  const { data } = await api.delete(`/gallery/delete/${expeditionId}`, {
    data: {
      publicId: imagePublicId,
    },
  });

  return data;
}
