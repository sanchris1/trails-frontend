/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";

export async function getSession() {
  try {
    const { data } = await api.get("/auth/me");
    return data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      return null;
    }
    throw error;
  }
}
