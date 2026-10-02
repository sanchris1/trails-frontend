import { api } from "@/lib/api";
import { BookExpeditionsRequestData } from "@/types/t.types";

export async function bookExpedition(data: BookExpeditionsRequestData) {
  const { data: receivedData } = await api.post("/booking/book", data);
  return receivedData;
}
