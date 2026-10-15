import { PaymentStatus } from "@/app/admin/payments/page";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface FetchReceiptsResponse {
  stats: {
    totalRevenue: number;
    pendingRevenue: number;
    refundedRevenue: number;
    transactionsCount: number;
  };

  allReceipts: {
    paymentReceiptId: string | null;
    id: string;
    userName: string;
    userEmail: string;
    title: string;
    amount: number;
    status: PaymentStatus;
    paymentDate: string;
    receiptNumber: string;
    bookingId: string;
  }[];
}

async function fetchAllMpesaReceipts() {
  const { data } = await api.get("/booking/fetch-all");

  return data;
}

export const useFetchAllMpesaReceipts = () =>
  useQuery<FetchReceiptsResponse>({
    queryKey: ["mpesa-receipt"],
    queryFn: fetchAllMpesaReceipts,
    enabled: true,
  });
