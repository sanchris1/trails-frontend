"use client";

import Image from "next/image";
import { Camera, ImagePlus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

import { AdventureFormValues } from "@/types/t.types";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/hooks/image/uploadImage";
import toast from "react-hot-toast";

const ImageUploadComponent = () => {
  const form = useFormContext<AdventureFormValues>();

  const inputRef = useRef<HTMLInputElement>(null);

  const uploadedImage = form.watch("coverImage");

  const [localPreview, setLocalPreview] = useState<string | null>(
    uploadedImage || null,
  );

  const preview = localPreview || uploadedImage;

  const handleSelectImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setLocalPreview(previewUrl);

    // Upload image here
    const result = await uploadImage(file);
    console.log(result.data[0]);

    if (result.success) {
      toast.success(result.message);
      form.setValue("coverImage", result.data[0].secure_url);
      form.setValue("coverImagePublicId", result.data[0].public_id);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <section className="space-y-6 rounded-xl border bg-card p-6">
      <div>
        <h3 className="text-lg font-semibold">Cover Image</h3>

        <p className="text-sm text-muted-foreground">
          Upload a high-quality cover image for this adventure.
        </p>
      </div>

      {!preview ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="group flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 transition hover:border-primary hover:bg-primary/5"
        >
          <ImagePlus className="mb-4 size-10 text-primary transition group-hover:scale-110" />

          <h4 className="font-medium">Upload Cover Image</h4>

          <p className="mt-1 text-sm text-muted-foreground">
            Drag & drop or click to browse
          </p>

          <p className="mt-6 text-xs text-muted-foreground">PNG • JPG • WEBP</p>

          <p className="text-xs text-muted-foreground">
            Recommended: 1600 × 900
          </p>
        </button>
      ) : (
        <div className="space-y-4">
          <div className="relative aspect-video overflow-hidden rounded-xl border">
            <Image
              src={preview}
              alt="Cover Preview"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition hover:opacity-100">
              <Button
                type="button"
                variant="secondary"
                onClick={() => inputRef.current?.click()}
              >
                <Camera className="mr-2 size-4" />
                Replace Image
              </Button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => inputRef.current?.click()}
            >
              Replace Image
            </Button>

            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                setLocalPreview(null);

                form.setValue("coverImage", "");
                form.setValue("coverImagePublicId", "");
              }}
            >
              <Trash2 className="mr-2 size-4" />
              Remove
            </Button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={handleSelectImage}
      />
    </section>
  );
};

export default ImageUploadComponent;
