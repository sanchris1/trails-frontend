/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

async function markAsReadNotification(notificationId: string) {
  const { data } = await api.put(`/notifications/set-read/${notificationId}`);
  return data;
}

export const useMarkAsReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAsReadNotification,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["notifications"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-stats"] }),
        queryClient.invalidateQueries({ queryKey: ["user-notification"] }),
      ]),
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }
    },
  });
};
