import { Notification } from "@/app/admin/notifications/page";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

async function fetchAdminNotifications() {
  const { data } = await api.get("/notifications/fetch-all");

  return data;
}

export const useFetchAdminNotifications = () =>
  useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: fetchAdminNotifications,
    staleTime: 1000 * 60 * 5,
  });
