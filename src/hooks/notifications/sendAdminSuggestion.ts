import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function sendAdminSuggestion({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  const { data } = await api.post("/notifications/suggestion", {
    title,
    message,
  });

  return data;
}

export const useSendAdminSuggestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendAdminSuggestion,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["notifications"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-stats"] }),
      ]),
  });
};
