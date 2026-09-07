import { useQuery } from "@tanstack/react-query";
import { fetchFeatured } from "./fetchFeatured";
import { AdventureExpeditionTypes } from "@/types/t.types";

export const useFetchFeaturedExpedition = () =>
  useQuery<AdventureExpeditionTypes>({
    queryFn: fetchFeatured,
    queryKey: ["expeditions"],
  });
