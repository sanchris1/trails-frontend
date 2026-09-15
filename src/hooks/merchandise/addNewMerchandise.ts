import { api } from "@/lib/api";
import { MerchandiseFormValues } from "@/types/t.types";
import { useMutation } from "@tanstack/react-query";

export async function addNewMerchandise({
  values,
}: {
  values: MerchandiseFormValues;
}) {
  const { data } = await api.post("/shop/add", values);

  return data;
}

export function useAddNewMerchandise() {
  return useMutation({
    mutationKey: ["merchandise"],
    mutationFn: addNewMerchandise,
  });
}
