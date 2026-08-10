/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { fetchAllExpeditions } from "./FetchAllExpeditions";

export function useFetchExpeditions(query: string) {
  return useQuery({
    queryFn: () => fetchAllExpeditions(query),
    queryKey: ["expeditions", query],
    placeholderData: (previousData: any) => previousData,
  });
}
