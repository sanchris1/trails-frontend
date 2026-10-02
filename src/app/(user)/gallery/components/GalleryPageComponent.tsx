/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import useFetchGalleryImages from "@/hooks/gallery/useFetchGalleryImages";
import { useEffect, useState } from "react";
import useFetchExpeditionsWithGallery from "@/hooks/gallery/useFetchExpeditionsWithGallery";
import { useSearchParams } from "next/navigation";
import ExpeditionGalleryFilters from "./GalleryFilter";
import ExpeditionStories from "./ExpeditionStories";

const GalleryPageComponent = () => {
  const [selectedExpeditionId, setSelectedExpeditionId] = useState<
    string | undefined
  >(undefined);
  const [page, setPage] = useState<number>(1);
  const [expeditionTitle, setExpeditionTitle] = useState<
    string | undefined | null
  >(null);

  const { data: expeditionData } = useFetchExpeditionsWithGallery();

  const searchParams = useSearchParams();

  const { data } = useFetchGalleryImages({
    page,
    expeditionId: selectedExpeditionId,
    limit: 10,
  });

  useEffect(() => {
    const expeditionId = searchParams.get("expeditionId");

    if (!expeditionId) return;

    setSelectedExpeditionId(expeditionId);
  }, [searchParams]);

  return (
    <div>
      {" "}
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

export default GalleryPageComponent;
