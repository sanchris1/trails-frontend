import { api } from "@/lib/api";

export async function fetchAdventureWithId(adventureId: string) {
  const { data } = await api.get(`/adventures/get/${adventureId}`);

  return data.data;
}
