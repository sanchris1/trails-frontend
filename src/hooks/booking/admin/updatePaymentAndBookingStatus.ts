import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

async function updatePaymentAndBookingStatus({
  bookingId,
  status,
}: {
  bookingId: string;
  status: string;
}) {
  const { data } = await api.put(`/booking/update-status/${bookingId}`, {
    status,
  });

  return data;
}

export const useUpdatePaymentAndBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePaymentAndBookingStatus,
    onSuccess: ({ data }) => {
      console.log(data);
      toast.success(data?.message || "Successfully updated the status");
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["mpesa-receipt"] }),
      ]);
    },
    onError: ({ data }) => {
      console.log(data);
      toast.error(data?.message || "Failed to update the status");
    },
  });
};
