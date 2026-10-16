import { useQuery } from "@tanstack/react-query";
import { fetchUserBooking } from "./fetchUserBookings";
import { useGetSession } from "../auth/useGetSession.hook";

interface UserBookingsResponseBody {
  expeditionId: string | null;
  location: string | null;
  paymentStatus:
    | "pending"
    | "partially_paid"
    | "paid"
    | "failed"
    | "refunded"
    | null;
  departureDate: string;
  returnDate: string;
  bookingStatus: "cancelled" | "pending" | "confirmed" | null;
  numberOfParticipants: number | null;
  bookingId: string;
  amountPaid: number;
  totalAmount: number;
  expeditionTitle: string;
}

interface UserBookingsResponse {
  success: boolean;
  userBookings: UserBookingsResponseBody[];
}

export const useFetchUserBookings = () => {
  const { data: session } = useGetSession();

  return useQuery<UserBookingsResponse>({
    queryKey: ["expeditions"],
    queryFn: fetchUserBooking,
    enabled: !!session?.user,
    staleTime: 10 * 60 * 1000,
  });
};
