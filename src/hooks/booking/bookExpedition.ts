import { api } from "@/lib/api";

export async function bookExpedition({
  expeditionId,
  numberOfParticipants,
}: {
  expeditionId: string;
  numberOfParticipants: number;
}) {
  const { data } = await api.post(`/booking/book/${expeditionId}`, {
    numberOfParticipants,
  });

  return data;
}
