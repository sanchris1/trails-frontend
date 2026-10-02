import { api } from "@/lib/api";

export async function sendReceiptNumber({
  bookingId,
  receiptNumber,
}: {
  bookingId: string;
  receiptNumber: string;
}) {
  const { data } = await api.post("/booking/receipt", {
    bookingId,
    receiptNumber,
  });

  return data;
}
