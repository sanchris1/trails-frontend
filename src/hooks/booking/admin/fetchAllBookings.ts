import { api } from "@/lib/api";
import { FetchAllBookingsResponse } from "@/types/t.types";
import { useQuery } from "@tanstack/react-query";

async function fetchAllBookings() {
  const { data } = await api.get("/booking/fetch");

  return data;
}

export function useFetchAllBookings() {
  return useQuery<FetchAllBookingsResponse>({
    queryKey: ["bookings"],
    queryFn: fetchAllBookings,
    enabled: true,
    staleTime: 5 * 60 * 1000,
  });
}
