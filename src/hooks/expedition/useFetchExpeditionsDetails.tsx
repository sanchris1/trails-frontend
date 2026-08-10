import { useQuery } from "@tanstack/react-query";
import { fetchExpeditionDetails } from "./fetchExpeditionDetails";

export function useFetchExpeditionDetails(expeditionId: string) {
  return useQuery({
    queryFn: () => fetchExpeditionDetails(expeditionId),
    queryKey: ["expedition", expeditionId],
    enabled: !!expeditionId,
  });
}
