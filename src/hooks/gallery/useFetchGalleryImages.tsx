import { useQuery } from "@tanstack/react-query";
import { fetchGalleryImages } from "./fetchGalleryImages";

const useFetchGalleryImages = () => {
  return useQuery({
    queryFn: fetchGalleryImages,
    queryKey: ["gallery"],
  });
};

export default useFetchGalleryImages;
