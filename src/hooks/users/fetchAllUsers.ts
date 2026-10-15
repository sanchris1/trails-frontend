import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface FetchAllUsersTypes {
  name: string;
  email: string;
  id: string;
  role: "admin" | "user";
  joined: Date;
  lastLogin: Date;
  bookings: number;
}

async function fetchAllUsers() {
  const { data } = await api.get("/users/fetch-all");

  return data;
}

export function useFetchAllUsers() {
  return useQuery<FetchAllUsersTypes[]>({
    queryFn: fetchAllUsers,
    queryKey: ["all-users"],
    staleTime: 1000 * 60,
  });
}
