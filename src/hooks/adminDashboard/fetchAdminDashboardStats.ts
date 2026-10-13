import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface ResponseBody {
  total: number;
  differenceAsPercentage: number;
  signage: "pos" | "neg" | "none";
}

interface ExpeditionResponseBody {
  id: string;
  bookedSlots: string;
  departureDate: string;
  location: string;
  title: string;
  totalSlots: number;
}

interface NotificationResponseBody {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  type: string;
}

export interface AdminStatsResponse {
  bookings: ResponseBody;
  participants: ResponseBody;
  revenue: ResponseBody;
  expeditions: ExpeditionResponseBody[];
  notifications: NotificationResponseBody[];
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
