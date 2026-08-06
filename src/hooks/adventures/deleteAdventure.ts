import { api } from "@/lib/api";

export const deleteAdventure = async (adventureId: string) => {
  const results = await api.delete(`/adventures/delete/${adventureId}`);

  console.log(results);
};
