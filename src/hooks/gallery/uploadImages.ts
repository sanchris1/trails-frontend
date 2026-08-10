import { api } from "@/lib/api";
import { CreateGalleryImage } from "@/types/t.types";

export type UploadGalleryImagesVariables = {
  expeditionId: string;
  images: CreateGalleryImage[];
};

export async function uploadImages({
  expeditionId,
  images,
}: UploadGalleryImagesVariables) {
  const { data } = await api.post(`/gallery/add/${expeditionId}`, images);
  return data;
}
