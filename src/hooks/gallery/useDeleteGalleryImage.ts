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
      toast.success("Image deleted successfully");
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["gallery"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-images"] }),
      ]);
    },
    onError: () => {
      toast.error("Error deleting image");
    },
  });
};
