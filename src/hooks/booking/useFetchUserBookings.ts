import { useQuery } from "@tanstack/react-query";
import { fetchUserBooking } from "./fetchUserBookings";
import { useGetSession } from "../auth/useGetSession.hook";

export const useFetchUserBookings = () => {
  const { data: session } = useGetSession();

  return useQuery({
    queryKey: ["expeditions"],
    queryFn: fetchUserBooking,
    enabled: !!session?.user,
    staleTime: 10 * 60 * 1000,
  });
};
