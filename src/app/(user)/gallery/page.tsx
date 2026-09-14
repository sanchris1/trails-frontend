"use client";
import GalleryHero from "./components/GalleryPageHero";
import ExpeditionGalleryFilters from "./components/GalleryFilter";
import ExpeditionStories from "./components/ExpeditionStories";
import useFetchGalleryImages from "@/hooks/gallery/useFetchGalleryImages";
import { useState } from "react";
import useFetchExpeditionsWithGallery from "@/hooks/gallery/useFetchExpeditionsWithGallery";

const GalleryPage = () => {
  const [selectedExpeditionId, setSelectedExpeditionId] = useState<
    string | undefined
  >(undefined);
  const [page, setPage] = useState<number>(1);
  const [expeditionTitle, setExpeditionTitle] = useState<
    string | undefined | null
  >(null);

  const { data: expeditionData } = useFetchExpeditionsWithGallery();

  const { data } = useFetchGalleryImages({
    page,
    expeditionId: selectedExpeditionId,
    limit: 10,
  });

  return (
    <div>
      <GalleryHero />
      <ExpeditionGalleryFilters
        setExpeditionTitle={setExpeditionTitle}
        expeditions={expeditionData?.result}
        selectedExpeditionId={selectedExpeditionId}
        setSelectedExpeditionId={setSelectedExpeditionId}
      />
      <ExpeditionStories
        images={data?.images}
        setPage={setPage}
        expeditionTitle={expeditionTitle}
      />
    </div>
  );
};

export default GalleryPage;
