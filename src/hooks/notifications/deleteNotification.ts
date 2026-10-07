import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function deleteNotification(notificationId: string) {
  const { data } = await api.delete(`/notifications/delete/${notificationId}`);
  return data;
}

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
