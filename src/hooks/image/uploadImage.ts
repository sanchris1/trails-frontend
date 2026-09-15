import { api } from "@/lib/api";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("images", file);

  const { data } = await api.post(`/image/image-upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const uploadSeveralImages = async (file: File[]) => {
  const uploadPromise = file.map((f) => uploadImage(f));

  const result = await Promise.all(uploadPromise);

  return result;
};
