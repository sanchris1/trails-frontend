import { api } from "@/lib/api";

export async function fetchExpeditionDetails(expeditionId: string) {
  const { data } = await api.get(`/expeditions/get/${expeditionId}`);

  return data;
}
