import { api } from "@/lib/api";

export async function fetchUserBooking() {
  const { data } = await api.get("/booking/fetch-user");

  return data;
}
