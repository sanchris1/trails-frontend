import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface ResponseBody {
  total: number;
  differenceAsPercentage: number;
  signage: "pos" | "neg" | "none";
}

export interface AdminStatsResponse {
  bookings: ResponseBody;
  participants: ResponseBody;
  revenue: ResponseBody;
}
async function fetchAdminDashboardStats() {
  const { data } = await api.get("/admin/stats");

  return data;
}

export const useFetchAdminDashboardStats = () =>
  useQuery<AdminStatsResponse>({
    queryFn: fetchAdminDashboardStats,
    queryKey: ["admin-stats"],
    enabled: true,
  });
