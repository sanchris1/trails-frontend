import { useQuery } from "@tanstack/react-query";
import { fetchAdventureWithId } from "./fetchAdventure";
import { Adventure } from "@/types/t.types";

export function useFetchAdventureDetails(adventureId: string) {
  return useQuery<Adventure>({
    queryKey: ["adventure", adventureId],
    queryFn: () => fetchAdventureWithId(adventureId),
    enabled: !!adventureId,
  });
}
