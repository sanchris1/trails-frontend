import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExpedition } from "./deleteExpedition";

const useDeleteExpedition = () => {
  const queryClient = useQueryClient();

  const deleteExpeditionMutation = useMutation({
    mutationFn: (expeditionId: string) => deleteExpedition(expeditionId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expeditions"],
      });
    },
  });
  return deleteExpeditionMutation;
};

export default useDeleteExpedition;
