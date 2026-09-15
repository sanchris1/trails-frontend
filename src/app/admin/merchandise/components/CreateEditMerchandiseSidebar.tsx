/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/incompatible-library */
"use client";

import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Upload, X, Plus, ImageIcon } from "lucide-react";
import { MerchandiseFormValues } from "@/types/t.types";
import Image from "next/image";
import { useAddNewMerchandise } from "@/hooks/merchandise/addNewMerchandise";
import toast from "react-hot-toast";
import { uploadSeveralImages } from "@/hooks/image/uploadImage";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

export const defaultMerchandiseValues: MerchandiseFormValues = {
  title: "",
  category: "",
  description: "",
  price: 0,
  stock: 0,
  colors: ["#8B4513"],
  tags: "",
  images: [],
};

interface CreateMerchandiseSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "edit";
  initialData?: MerchandiseFormValues;
  onSubmit?: (data: MerchandiseFormValues) => void;
}

export default function CreateMerchandiseSidebar({
  open,
  onOpenChange,
  mode = "create",
  initialData,
}: CreateMerchandiseSidebarProps) {
  const { mutateAsync: addMerchandise, isError } = useAddNewMerchandise();
  const queryClient = useQueryClient();

  const [newColor, setNewColor] = useState("#000000");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MerchandiseFormValues>({
    defaultValues: initialData ?? defaultMerchandiseValues,
  });

  const colors = watch("colors") || [];
  const images = watch("images") || [];

  // ─── Colors ───────────────────────────────────────────────
  const addColor = () => {
    if (newColor && !colors.includes(newColor)) {
      setValue("colors", [...colors, newColor], { shouldValidate: true });
    }
  };

  const removeColor = (color: string) => {
    setValue(
      "colors",
      colors.filter((c) => c !== color),
      { shouldValidate: true },
    );
  };

  // ─── Images ───────────────────────────────────────────────
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setValue("images", [...images, ...newImages], { shouldValidate: true });

    // Reset input so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    const updated = [...images];
    // Revoke the object URL to avoid memory leaks
    if (updated[index]?.preview?.startsWith("blob:")) {
      URL.revokeObjectURL(updated[index].preview);
    }
    updated.splice(index, 1);
    setValue("images", updated, { shouldValidate: true });
  };

  // ─── Submit ───────────────────────────────────────────────
  const handleFormSubmit = async (data: MerchandiseFormValues) => {
    try {
      const filesToUpload = data.images
        .map((i) => i.file)
        .filter((f: File) => !!f);

      const uploadResults = await uploadSeveralImages(filesToUpload);

      const resultsToUpload = uploadResults?.map((res) => ({
        url: res?.data[0]?.secure_url,
        publicId: res?.data[0]?.public_id,
      }));

      const payload: any = {
        ...data,
        images: resultsToUpload,
      };

      await addMerchandise({ values: payload });

      toast.success("Merchandise added successfully");
      reset(defaultMerchandiseValues);
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["merchandise"] });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Error:", error.response?.data.message);
        toast.error(error.response?.data.message);
      }

      if (isError) {
        toast.error("Merchandise upload failed");
      }
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg min-w-64 overflow-y-auto px-2">
        <SheetHeader className="pb-2">
          <SheetTitle className="text-xl">
            {mode === "create" ? "Add Merchandise" : "Edit Merchandise"}
          </SheetTitle>
          <SheetDescription>
            {mode === "create"
              ? "Add a new product to the Trails & Memoirs catalog."
              : "Update the details of this product."}
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="mt-6 space-y-6"
        >
          {/* ─── Basic Info ─── */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Basic Information
            </h3>

            <div className="space-y-2">
              <Label htmlFor="title">Product Name *</Label>
              <Input
                id="title"
                placeholder="e.g. Mara Expedition Heavyweight Tee"
                {...register("title", { required: "Product name is required" })}
              />
              {errors.title && (
                <p className="text-xs text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apparel">Apparel</SelectItem>
                        <SelectItem value="outdoor-gear">
                          Outdoor Gear
                        </SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                        <SelectItem value="stickers">
                          Stickers & Prints
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-xs text-destructive">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the product..."
                rows={3}
                {...register("description")}
              />
            </div>
          </div>

          <Separator />

          {/* ─── Pricing & Inventory ─── */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Pricing & Inventory
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priceKes">Price (KES) *</Label>
                <Input
                  id="priceKes"
                  type="number"
                  placeholder="6500"
                  {...register("price", {
                    required: "Price is required",
                    valueAsNumber: true,
                    min: { value: 0, message: "Price must be ≥ 0" },
                  })}
                />
                {errors.price && (
                  <p className="text-xs text-destructive">
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity *</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="84"
                  {...register("stock", {
                    required: "Stock is required",
                    valueAsNumber: true,
                    min: { value: 0, message: "Stock cannot be negative" },
                  })}
                />
                {errors.stock && (
                  <p className="text-xs text-destructive">
                    {errors.stock.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ─── Extra Details ─── */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Extra Details
            </h3>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                placeholder="hoodie, trail, unisex, organic"
                {...register("tags")}
              />
            </div>
          </div>

          <Separator />

          {/* ─── Colors ─── */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Available Colors
            </h3>

            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <div
                  key={color}
                  className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-border"
                  style={{ backgroundColor: color }}
                >
                  <button
                    type="button"
                    onClick={() => removeColor(color)}
                    className="absolute -right-1 -top-1 hidden h-4 w-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground group-hover:flex"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="h-9 w-14 p-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addColor}
                className="gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Color
              </Button>
            </div>
          </div>

          <Separator />

          {/* ─── Product Images (Multiple + Preview) ─── */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Product Images
            </h3>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              multiple
              className="hidden"
              onChange={handleImageSelect}
            />

            {/* Upload zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 px-6 py-8 text-center transition-colors hover:bg-muted/50"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">
                Click to upload or drag and drop
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                PNG, JPG or WEBP (max. 5MB each) — Multiple images allowed
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                Select Images
              </Button>
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted"
                  >
                    {img.preview ? (
                      <Image
                        src={img.preview}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized // needed for blob: URLs
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>

                    {/* Order badge */}
                    <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
                      {index + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {images.length === 0 && (
              <p className="text-xs text-muted-foreground">
                No images selected yet.
              </p>
            )}
          </div>

          {/* ─── Footer ─── */}
          <SheetFooter className="mt-8 flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : mode === "create"
                  ? "Create Product"
                  : "Save Changes"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
