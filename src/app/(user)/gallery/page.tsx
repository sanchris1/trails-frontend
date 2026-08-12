import React from "react";
import GalleryHero from "./components/GalleryPageHero";
import ExpeditionGalleryFilters from "./components/GalleryFilter";
import ExpeditionStories from "./components/ExpeditionStories";

const GalleryPage = () => {
  return (
    <div>
      <GalleryHero />
      <ExpeditionGalleryFilters />
      <ExpeditionStories />
    </div>
  );
};

export default GalleryPage;
