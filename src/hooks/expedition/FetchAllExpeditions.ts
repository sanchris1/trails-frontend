import { api } from "@/lib/api";

export async function fetchAllExpeditions(query: string) {
  const { data } = await api.get(`/expeditions/get?${query}`);

  return data;
}
