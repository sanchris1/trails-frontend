"use client";
import GalleryHero from "./components/GalleryPageHero";
import ExpeditionGalleryFilters from "./components/GalleryFilter";
import ExpeditionStories from "./components/ExpeditionStories";
import useFetchGalleryImages from "@/hooks/gallery/useFetchGalleryImages";

const GalleryPage = () => {
  const { data } = useFetchGalleryImages();

  return (
    <div>
      <GalleryHero />
      <ExpeditionGalleryFilters />
      <ExpeditionStories images={data?.images} />
    </div>
  );
};

export default GalleryPage;
