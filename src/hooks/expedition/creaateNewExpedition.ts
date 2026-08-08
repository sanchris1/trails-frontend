import { api } from "@/lib/api";
import { ExpeditionFormValues } from "@/types/t.types";

export async function createNewExpedition(values: ExpeditionFormValues) {
  const { data } = await api.post(`/expeditions/add`, values);
  return data;
}
