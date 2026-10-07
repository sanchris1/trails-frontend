import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Suggestion sent successfully");
    },
  });
};
