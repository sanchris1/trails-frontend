import { useQuery } from "@tanstack/react-query";
import { getSession } from "../getSession";

export const useGetSession = () =>
  useQuery({
    queryFn: getSession,
    queryKey: ["session"],
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
