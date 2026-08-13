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
  console.log("Images before upload", images);
  const { data } = await api.post(`/gallery/add/${expeditionId}`, images);
  console.log("Data after upload", data);
  return data;
}
