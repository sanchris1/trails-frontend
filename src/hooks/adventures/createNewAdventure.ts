import { api } from "@/lib/api";
import { AdventureFormValues } from "@/types/t.types";

export const createNewAdventure = async (values: AdventureFormValues) => {
  const { data } = await api.post(`/adventures/add`, values);

  return data;
};
