import { api } from "@/lib/api";

export const deleteExpedition = async (expeditionId: string) => {
  const { data } = await api.delete(`/expeditions/delete/${expeditionId}`);

  return data;
};
