import { CreateGalleryImage } from "@/types/t.types";
import Image from "next/image";
import { Button } from "../ui/button";

const ImageComponent = ({
  isAdmin,
  image,
}: {
  isAdmin: boolean;
  image: CreateGalleryImage;
}) => {
  return (
    <div className="group relative aspect-square w-full overflow-hidden rounded-xl">
      <Image
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        fill
        alt={image.caption}
        src={image.imageUrl}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40" />

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 text-white transition-transform duration-300 group-hover:translate-y-0">
        <p className="line-clamp-2 text-sm font-medium">{image.caption}</p>
      </div>

      {/* Admin actions */}
      {isAdmin && (
        <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button size="sm" variant="destructive">
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};
export default ImageComponent;
