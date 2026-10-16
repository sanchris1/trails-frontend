import { useQuery } from "@tanstack/react-query";
import { fetchUserBooking } from "./fetchUserBookings";

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
  return useQuery<UserBookingsResponse>({
    queryKey: ["expeditions"],
    queryFn: fetchUserBooking,
    enabled: true,
    staleTime: 10 * 60 * 1000,
  });
};
