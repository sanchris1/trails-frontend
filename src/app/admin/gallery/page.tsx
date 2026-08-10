/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import ExpeditionsCommand from "../components/ExpeditionsCommand";
import { useRouter } from "next/navigation";
import useFetchGalleryImages from "@/hooks/gallery/useFetchGalleryImages";
import ImageComponent from "@/components/common/ImageComponent";
import { CreateGalleryImage } from "@/types/t.types";

const GalleryPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [expeditionId, setExpeditionId] = useState<string | null>(null);

  const { data } = useFetchGalleryImages();

  console.log("Gallery images", data);

  const images = data?.images;

  useEffect(() => {
    if (!expeditionId) return;
    router.push(`/admin/gallery/${expeditionId}/new`);
    setExpeditionId(null);
  }, [expeditionId]);

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="">
          <h3 className="text-4xl font-medium text-foreground">Gallery</h3>
          <p className="text-sm text-secondary">
            Manage, organize and publish all travel expeditions images on the
            Trails and Memoirs gallery page
          </p>
        </div>
        <Button onClick={() => setOpen(true)} variant={"outline"}>
          {" "}
          <Plus />
          Create Gallery
        </Button>
      </div>
      <div className="my-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-5">
          {images &&
            images.length !== 0 &&
            images.map((image: CreateGalleryImage) => (
              <ImageComponent isAdmin key={image.imageUrl} image={image} />
            ))}
        </div>
      </div>
      <ExpeditionsCommand
        open={open}
        setOpen={setOpen}
        setExpeditionId={setExpeditionId}
      />
    </div>
  );
};

export default GalleryPage;
