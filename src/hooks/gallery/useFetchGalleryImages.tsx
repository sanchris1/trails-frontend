import { useQuery } from "@tanstack/react-query";
import { fetchGalleryImages } from "./fetchGalleryImages";

const useFetchGalleryImages = ({
  page,
  limit,
  expeditionId,
}: {
  page?: number;
  limit?: number;
  expeditionId?: string;
}) => {
  return useQuery({
    queryFn: () => fetchGalleryImages({ page, limit, expeditionId }),
    queryKey: ["gallery", { page, limit, expeditionId }],
  });
};

export default useFetchGalleryImages;
