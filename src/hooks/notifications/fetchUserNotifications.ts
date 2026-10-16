import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface UserNotificationsResponse {
  id: string;
  recipientId: string;
  senderId: string | null;
  type:
    | "inquiry"
    | "booking_created"
    | "booking_confirmed"
    | "booking_cancelled"
    | "payment_pending"
    | "payment_received"
    | "payment_failed"
    | "payment_reminder"
    | "expedition_reminder"
    | "expedition_updated"
    | "expedition_cancelled"
    | "system";
  title: string;
  message: string;
  bookingId: string | null;
  expeditionId: string | null;
  isRead: boolean;
  createdAt: Date;
  readAt: Date | null;
}

async function fetchUserNotifications() {
  const { data } = await api.get("/notifications/fetch-user");

  return data;
}

export const useFetchUserNotifications = () => {
  return useQuery<UserNotificationsResponse[]>({
    queryKey: ["user-notification"],
    queryFn: fetchUserNotifications,
    enabled: true,
  });
};
