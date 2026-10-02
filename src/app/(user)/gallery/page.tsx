import { Suspense } from "react";
import GalleryPageComponent from "./components/GalleryPageComponent";
import GalleryHero from "./components/GalleryPageHero";
import FetchingProductsPage from "@/components/common/FetchingProductsPage";

const GalleryPage = () => {
  return (
    <div>
      <GalleryHero />
      <Suspense fallback={<FetchingProductsPage />}>
        <GalleryPageComponent />
      </Suspense>
    </div>
  );
};

export default GalleryPage;
