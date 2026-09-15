"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Heart,
  ImageIcon,
  Loader2,
  Package,
  Pencil,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MerchandiseResponseItem } from "@/types/t.types";
import { useRouter } from "next/navigation";

type MerchandiseDetailsProps = {
  product: MerchandiseResponseItem;
  isAdmin?: boolean;

  onEdit?: () => void;
  onDelete?: () => void;
  onDeleteImage?: (imageId: string, publicId: string) => void;

  deleting?: boolean;
  deletingImage?: string | null;
};

export default function MerchandiseDetails({
  product,
  isAdmin = false,
  onEdit,
  onDelete,
  onDeleteImage,
  deleting = false,
  deletingImage = null,
}: MerchandiseDetailsProps) {
  const router = useRouter();

  const { merchandise, merchandise_colors, merchandise_images } = product;

  const images = merchandise_images?.images ?? [];

  const [selectedImage, setSelectedImage] = useState(0);

  const currentImage = images[selectedImage] ?? images[0];

  const formattedPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "KSH",
  }).format(merchandise.price);

  const isOutOfStock = merchandise.stock <= 0;

  const handlePreviousImage = () => {
    if (!images.length) return;

    setSelectedImage((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  const handleNextImage = () => {
    if (!images.length) return;

    setSelectedImage((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        {/* Admin actions */}
        {isAdmin && (
          <div className="mb-6 flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              disabled={deleting}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={onDelete}
              disabled={deleting}
            >
              {deleting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              Delete
            </Button>
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(380px,0.85fr)] lg:gap-16">
          <section className="min-w-0">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
              {currentImage ? (
                <div className="relative aspect-square w-full">
                  <Image
                    src={currentImage.url}
                    alt={merchandise.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="
                      (max-width: 640px) 100vw,
                      (max-width: 1024px) 90vw,
                      60vw
                    "
                  />

                  {/* Image counter */}
                  <div className="absolute left-4 top-4">
                    <Badge
                      variant="secondary"
                      className="bg-background/80 text-foreground backdrop-blur-sm"
                    >
                      {selectedImage + 1} / {images.length}
                    </Badge>
                  </div>

                  {/* Admin delete image */}
                  {isAdmin && (
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute right-4 top-4"
                      disabled={deletingImage === currentImage.publicId}
                      onClick={() =>
                        onDeleteImage?.(
                          merchandise_images.id,
                          currentImage.publicId,
                        )
                      }
                    >
                      {deletingImage === currentImage.publicId ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}

                      <span className="sr-only">Delete current image</span>
                    </Button>
                  )}

                  {/* Desktop navigation */}
                  {images.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm sm:flex"
                        onClick={handlePreviousImage}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>

                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm sm:flex"
                        onClick={handleNextImage}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex aspect-square items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <ImageIcon className="h-10 w-10" />
                    <span>No images available</span>
                  </div>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-4">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2">
                    {images.map((image, index) => (
                      <CarouselItem
                        key={image.publicId}
                        className="basis-1/4 pl-2 sm:basis-1/5 md:basis-1/6"
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedImage(index)}
                          className={`
                            group relative aspect-square w-full
                            overflow-hidden rounded-xl border
                            bg-card transition
                            ${
                              selectedImage === index
                                ? "border-primary ring-2 ring-primary/20"
                                : "border-border hover:border-primary/50"
                            }
                          `}
                        >
                          <Image
                            src={image.url}
                            alt={`${merchandise.title} image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="120px"
                          />

                          {selectedImage === index && (
                            <div className="absolute inset-0 bg-primary/10" />
                          )}
                        </button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious className="-left-3 hidden sm:flex" />
                  <CarouselNext className="-right-3 hidden sm:flex" />
                </Carousel>
              </div>
            )}
          </section>

          <section className="flex flex-col">
            {/* Category */}
            <div className="mb-3">
              <Badge variant="outline" className="capitalize">
                {merchandise.category.replace("-", " ")}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {merchandise.title}
            </h1>

            {/* Description */}
            <p className="mt-4 leading-7 text-muted-foreground">
              {merchandise.description}
            </p>

            {/* Price */}
            <div className="mt-6">
              <span className="text-3xl font-semibold tracking-tight">
                {formattedPrice}
              </span>
            </div>

            <Separator className="my-6" />

            {/* Stock */}
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-muted-foreground" />

              <div>
                <p className="text-sm font-medium">Availability</p>

                <p
                  className={
                    isOutOfStock
                      ? "text-sm text-destructive"
                      : "text-sm text-muted-foreground"
                  }
                >
                  {isOutOfStock
                    ? "Out of stock"
                    : `${merchandise.stock} available`}
                </p>
              </div>
            </div>

            {/* Colors */}
            {merchandise_colors?.colors?.length > 0 && (
              <>
                <Separator className="my-6" />

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium">Available colors</p>

                    <span className="text-xs text-muted-foreground">
                      {merchandise_colors.colors.length} colors
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {merchandise_colors.colors.map((color) => (
                      <div
                        key={color}
                        title={color}
                        className="h-9 w-9 rounded-full border-2 border-border p-0.5"
                      >
                        <div
                          className="h-full w-full rounded-full"
                          style={{
                            backgroundColor: color,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Tags */}
            {merchandise.tags.length > 0 && (
              <>
                <Separator className="my-6" />

                <div>
                  <p className="mb-3 text-sm font-medium">Tags</p>

                  <div className="flex flex-wrap gap-2">
                    {merchandise.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="flex-1" disabled={isOutOfStock}>
                <ShoppingBag className="mr-2 h-5 w-5" />
                {isOutOfStock ? "Out of stock" : "Add to cart"}
              </Button>

              <Button size="lg" variant="outline" className="sm:w-14">
                <Heart className="h-5 w-5" />
                <span className="sm:hidden">Add to wishlist</span>
                <span className="sr-only sm:not-sr-only">Add to wishlist</span>
              </Button>
            </div>

            {/* Admin information */}
            {isAdmin && (
              <>
                <Separator className="my-8" />

                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="mb-4 flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    <p className="text-sm font-medium">
                      Product administration
                    </p>
                  </div>

                  <div className="grid gap-3 text-sm sm:grid-cols-2">
                    <div>
                      <p className="text-muted-foreground">Product ID</p>
                      <p className="mt-1 break-all font-mono text-xs">
                        {merchandise.id}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Slug</p>
                      <p className="mt-1 font-mono text-xs">
                        {merchandise.slug}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Created</p>
                      <p className="mt-1 text-xs">
                        {new Date(merchandise.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Updated</p>
                      <p className="mt-1 text-xs">
                        {new Date(merchandise.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
        {!isAdmin && (
          <section className="mt-20 border-t border-border pt-10">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  You may also like
                </p>

                <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                  Related products
                </h2>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/shop")}
              >
                View all
              </Button>
            </div>

            {/* 
            Pass up to 4 related products here.
            
            Example:
            
            <RelatedProducts
              products={relatedProducts.slice(0, 4)}
            />
          */}

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[0, 1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="aspect-4/5 rounded-xl border border-border bg-muted/30"
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
