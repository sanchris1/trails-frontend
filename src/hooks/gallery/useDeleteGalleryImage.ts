import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImage } from "./deleteImage";
import toast from "react-hot-toast";

export const useDeleteGalleryImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      expeditionId,
      imagePublicId,
    }: {
      expeditionId: string;
      imagePublicId: string;
    }) => deleteImage(expeditionId, imagePublicId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Image deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting image");
    },
  });
};
