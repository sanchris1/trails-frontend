import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

async function updatePaymentAndBookingStatus({
  bookingId,
  status,
  amountPaid,
}: {
  bookingId: string;
  status: string;
  amountPaid?: string | number;
}) {
  const params = new URLSearchParams();

  if (amountPaid !== undefined && amountPaid !== "") {
    params.set("amountPaid", String(amountPaid));
  }

  const query = params.toString();

  const url = `booking/update-status/${bookingId}${query ? `?${query}` : ""}`;

  const { data } = await api.put(url, {
    status,
  });

  return data;
}

export const useUpdatePaymentAndBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePaymentAndBookingStatus,
    onSuccess: ({ data }) => {
      toast.success(data?.message || "Successfully updated the status");
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["mpesa-receipt"] }),
      ]);
    },
    onError: ({ data }) => {
      toast.error(data?.message || "Failed to update the status");
    },
  });
};
