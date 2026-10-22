/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { tokenStore } from "@/lib/tokenStore";
import axios from "axios";

export async function getSession() {
  // If no accessToken is in memory (initial load or page refresh),
  // proactively refresh first to get accessToken & user in 1 fast hop
  if (!tokenStore.get()) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
      const { data } = await axios.post(
        `${baseUrl}/auth/refresh`,
        {},
        { withCredentials: true },
      );

      if (data?.accessToken) {
        tokenStore.set(data.accessToken);
      }

      if (data?.user) {
        return { success: true, user: data.user };
      }
    } catch {
      // No refresh token or expired -> unauthenticated
      return null;
    }
  }

  try {
    const { data } = await api.get("/auth/me", { withCredentials: true });
    return data;
  } catch (error: any) {
    if (
      error.response?.status === 401 ||
      error.response?.status === 403 ||
      error.response?.status === 404
    ) {
      return null;
    }
    throw error;
  }
}
