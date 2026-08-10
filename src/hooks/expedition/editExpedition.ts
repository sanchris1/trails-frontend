import { api } from "@/lib/api";
import { ExpeditionFormValues } from "@/types/t.types";

export const editExpedition = async ({
  expeditionId,
  values,
}: {
  expeditionId: string;
  values: ExpeditionFormValues;
}) => {
  const { data } = await api.put(`/expeditions/edit/${expeditionId}`, values);

  return data;
};
