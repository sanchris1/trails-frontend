import { api } from "@/lib/api";
import { Participant } from "@/types/t.types";

export async function bookParticipants({
  participants,
  bookingId,
}: {
  participants: Participant[];
  bookingId: string;
}) {
  const { data } = await api.post(`/booking/participants/${bookingId}`, {
    participants,
  });

  return data;
}
