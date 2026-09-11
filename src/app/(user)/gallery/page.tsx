/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import GalleryHero from "./components/GalleryPageHero";
import ExpeditionGalleryFilters from "./components/GalleryFilter";
import ExpeditionStories from "./components/ExpeditionStories";
import useFetchGalleryImages from "@/hooks/gallery/useFetchGalleryImages";
import { useQueries } from "@tanstack/react-query";
import { fetchExpeditionDetails } from "@/hooks/expedition/fetchExpeditionDetails";

const GalleryPage = () => {
  const { data } = useFetchGalleryImages();

  console.log(data);

  const expeditionIds: string[] = Array.from(
    new Set(
      (data?.images ?? [])
        .map((image: any) => image.expeditionId)
        .filter(Boolean),
    ),
  );

  const expeditionQueries = useQueries({
    queries: expeditionIds.map((id: string) => ({
      queryKey: ["gallery", "expeditions", id],
      queryFn: () => fetchExpeditionDetails(id),
      enabled: !!id,
    })),
  });

  const fetchedExpeditions = expeditionQueries
    .map((q) => q?.data?.data)
    .filter(Boolean);

  console.log(fetchedExpeditions);

  return (
    <div>
      <GalleryHero />
      <ExpeditionGalleryFilters />
      <ExpeditionStories images={data?.images} />
    </div>
  );
};

export default GalleryPage;
