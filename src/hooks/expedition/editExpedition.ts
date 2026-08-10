import { api } from "@/lib/api";
import { Expedition } from "@/types/t.types";

export const editExpedition = async (
  expeditionId: string,
  values: Expedition,
) => {
  const { data } = await api.put(`/expeditions/edit/${expeditionId}`, values);

  return data;
};
