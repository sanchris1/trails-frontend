"use client";

import BackButton from "@/components/common/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { uploadImages } from "@/hooks/gallery/uploadImages";
import { uploadImage } from "@/hooks/image/uploadImage";
import { CreateGalleryImage } from "@/types/t.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ImagePlus, Trash2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type SelectedImage = {
  id: string;
  file: File;
  preview: string;
  caption: string;
};

const AddExpeditionImages = () => {
  const [images, setImages] = useState<SelectedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const params = useParams();
  const expeditionId = params.expeditionId as string;

  const router = useRouter();

  const queryClient = useQueryClient();

  const createGalleryImageMutation = useMutation({
    mutationFn: uploadImages,

    onSuccess: () => {
      toast.success("Images uploaded successfully");
      queryClient.invalidateQueries({
        queryKey: ["expeditions", expeditionId],
      });
      router.push("/admin/gallery");
    },
    onError: () => {
      toast.error("Error uploading images");
    },
  });

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) return;

    const newImages: SelectedImage[] = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      caption: "",
    }));

    setImages((prev) => [...prev, ...newImages]);

    // Allows selecting the same file again later
    event.target.value = "";
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const imageToRemove = prev.find((image) => image.id === id);

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }

      return prev.filter((image) => image.id !== id);
    });
  };

  const clearImages = () => {
    images.forEach((image) => {
      URL.revokeObjectURL(image.preview);
    });

    setImages([]);
  };

  const updateCaption = (id: string, caption: string) => {
    setImages((prev) =>
      prev.map((image) =>
        image.id === id
          ? {
              ...image,
              caption,
            }
          : image,
      ),
    );
  };

  const handleUpload = async () => {
    if (!images.length) return;
    setIsUploading(true);

    try {
      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          const response = await uploadImage(image.file);

          return {
            ...image,
            uploaded: response.data[0],
          };
        }),
      );

      const imagesArray: CreateGalleryImage[] = uploadedImages.map((img) => ({
        expeditionId,
        imageUrl: img.uploaded.secure_url,
        imagePublicId: img.uploaded.public_id,
        caption: img.caption,
      }));

      await createGalleryImageMutation.mutateAsync({
        expeditionId,
        images: imagesArray,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-3">
        <BackButton />

        <div>
          <h5 className="text-2xl font-semibold text-secondary">
            Add Gallery Images
          </h5>

          <p className="max-w-2xl text-muted-foreground">
            Upload multiple images to showcase the milestones achieved during
            past expeditions on Trails and Memoirs.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        {/* Main content */}
        <div className="space-y-6">
          {/* Upload area */}
          <Card>
            <CardHeader>
              <CardTitle>Add Images</CardTitle>
            </CardHeader>

            <CardContent>
              <label
                htmlFor="gallery-images"
                className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/20 p-8 text-center transition hover:border-primary/50 hover:bg-muted/40"
              >
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <ImagePlus className="size-8 text-primary" />
                </div>

                <h3 className="font-medium">Drag and drop your images here</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  or click to browse from your device
                </p>

                <p className="mt-4 text-xs text-muted-foreground">
                  PNG, JPG, JPEG or WEBP · Multiple images supported
                </p>

                <input
                  id="gallery-images"
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleImageSelect}
                />
              </label>
            </CardContent>
          </Card>

          {/* Selected images */}
          {images.length > 0 && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Selected Images</CardTitle>

                  <p className="text-sm text-muted-foreground">
                    {images.length} image
                    {images.length !== 1 ? "s" : ""} selected
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearImages}
                >
                  <Trash2 />
                  Clear all
                </Button>
              </CardHeader>

              <CardContent>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {images.map((image) => (
                    <div
                      key={image.id}
                      className="group overflow-hidden rounded-xl border bg-card"
                    >
                      {/* Image */}
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          fill
                          src={image.preview}
                          alt="Gallery preview"
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />

                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          className="absolute right-2 top-2 size-8 rounded-full opacity-90"
                          onClick={() => removeImage(image.id)}
                        >
                          <X className="size-4" />
                        </Button>
                      </div>

                      {/* Caption */}
                      <div className="p-3">
                        <Input
                          placeholder="Add a caption..."
                          value={image.caption}
                          onChange={(event) =>
                            updateCaption(image.id, event.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Empty state */}
          {images.length === 0 && (
            <div className="rounded-xl border border-dashed p-10 text-center">
              <ImagePlus className="mx-auto mb-3 size-8 text-muted-foreground" />

              <p className="font-medium">No images selected yet</p>

              <p className="mt-1 text-sm text-muted-foreground">
                Select multiple images above to preview them here.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <Card className="h-fit lg:sticky lg:top-6">
          <CardHeader>
            <CardTitle>Upload Summary</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Images selected
                </span>

                <span className="font-medium">{images.length}</span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Total size
                </span>

                <span className="font-medium">
                  {(
                    images.reduce(
                      (total, image) => total + image.file.size,
                      0,
                    ) /
                    1024 /
                    1024
                  ).toFixed(2)}{" "}
                  MB
                </span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Formats</span>

                <span className="text-sm font-medium">JPG · PNG · WEBP</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Button
                className="w-full"
                disabled={!images.length || isUploading}
                onClick={handleUpload}
              >
                {isUploading ? (
                  <>
                    <Upload className="animate-pulse" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload />
                    Upload Images
                  </>
                )}
              </Button>

              {images.length > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={isUploading}
                  onClick={clearImages}
                >
                  Clear Selection
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddExpeditionImages;
