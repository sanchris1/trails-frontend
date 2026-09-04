import { api } from "@/lib/api";

export async function logoutUser() {
  const { data } = await api.post("/auth/logout");

  return data;
}
