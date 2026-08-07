import { api } from "@/lib/api";
import { AdventureFormValues } from "@/types/t.types";

type EditAdventurePayload = {
  adventureId: string;
  values: AdventureFormValues;
};

export async function editAdventure({
  adventureId,
  values,
}: EditAdventurePayload) {
  const { data } = await api.put(`/adventures/edit/${adventureId}`, values);

  return data;
}
