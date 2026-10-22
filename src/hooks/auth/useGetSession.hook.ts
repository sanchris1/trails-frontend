import { useQuery } from "@tanstack/react-query";
import { getSession } from "../getSession";

export interface GetSessionUser {
  createdAt: Date;
  email: string;
  id: string;
  name: string;
  role: string;
}

interface GetSessionResponse {
  success: boolean;
  user: GetSessionUser;
}

export const useGetSession = () =>
  useQuery<GetSessionResponse>({
    queryFn: getSession as any,
    queryKey: ["session"],
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });
