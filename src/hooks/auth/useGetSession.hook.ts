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
    queryFn: getSession,
    queryKey: ["session"],
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
