import { useQuery } from "@tanstack/react-query";
import { fetchAdventureWithId } from "./fetchAdventure";

export function useFetchAdventureDetails(
  mode: "edit" | "new",
  adventureId: string,
) {
  return useQuery({
    queryKey: ["adventure", adventureId],
    queryFn: () => fetchAdventureWithId(adventureId),
    enabled: mode === "edit",
  });
}
