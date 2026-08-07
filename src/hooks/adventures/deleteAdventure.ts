import { api } from "@/lib/api";

export const deleteAdventure = async (adventureId: string) => {
  const { data } = await api.delete(`/adventures/delete/${adventureId}`);

  return data;
};
