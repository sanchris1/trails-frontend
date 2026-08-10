import { api } from "@/lib/api";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("images", file);

  const { data } = await api.post(`/image/image-upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
