"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MerchandiseResponse } from "@/types/t.types";
import FetchingProductsPage from "@/components/common/FetchingProductsPage";
import { FaHeart, FaRegHeart, FaCartPlus } from "react-icons/fa6";
import { useCartStore } from "@/store/useMerchandiseStore";
import toast from "react-hot-toast";

export function formatPrice(price: number) {
  return `KES ${price?.toLocaleString()}`;
}

export default function ProductGrid({
  loading,
  merchandise,
  setPage,
  isFavoriteMerchandise,
  toggleFavoriteMerchandise,
}: {
  loading: boolean;
  merchandise: MerchandiseResponse;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isFavoriteMerchandise: (id: string) => boolean;
  toggleFavoriteMerchandise: (id: string) => void;
}) {
  const { addToCart, items } = useCartStore();

  const handleAddToCart = (merchandiseId: string) => {
    console.log("Adding merchandise to cart:", merchandiseId);

    const selectedMerchandise = merchandise.find(
      (item) => item.merchandise.id === merchandiseId,
    );

    console.log("Selected merchandise:", selectedMerchandise);

    if (selectedMerchandise) {
      const { id, title, price, category, slug } =
        selectedMerchandise.merchandise;
      const image = selectedMerchandise.merchandise_images.images[0].url;

      addToCart(
        { id, name: title, price: price.toString(), category, slug, image },
        1,
      );

      toast.success(`${title} has been added to your cart!`, {
        position: "top-right",
      });
    }
  };

  if (loading) return <FetchingProductsPage />;

  return (
    <section className="bg-background pb-16 md:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-12">
          {merchandise?.map((product) => {
            const id = product.merchandise.id;
            const isAdded = items.some((i) => i.id === id);

            return (
              <div key={id} className="group block">
                {/* Image */}
                <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-muted">
                  <Link
                    href={`/shop/${product.merchandise.slug}`}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.merchandise_images.images[0].url}
                      alt={product.merchandise.slug}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </Link>

                  {/* Favorite */}
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                    <Button
                      type="button"
                      aria-label="Toggle favorite"
                      onClick={() => toggleFavoriteMerchandise(id)}
                      className={`rounded-full p-2 text-xs hover:bg-transparent ${
                        isFavoriteMerchandise(id)
                          ? "bg-transparent text-accent"
                          : "bg-black/40 text-secondary backdrop-blur-sm"
                      }`}
                    >
                      {isFavoriteMerchandise(id) ? <FaHeart /> : <FaRegHeart />}
                    </Button>
                  </div>
                </div>

                {/* Existing product information */}
                <Link href={`/shop/${product.merchandise.slug}`}>
                  <div className="mt-3.5 space-y-1">
                    <p className="text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
                      {product.merchandise.category}
                    </p>

                    <h3 className="text-sm font-medium text-foreground transition-colors group-hover:text-primary sm:text-[15px]">
                      {product.merchandise.title}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {formatPrice(product.merchandise.price)}
                    </p>
                  </div>
                </Link>

                {/* Add to Cart */}
                <Button
                  type="button"
                  variant={isAdded ? "outline" : "default"}
                  onClick={() => handleAddToCart(id)}
                  className="mt-3 h-10 w-full gap-2 rounded-full text-xs font-semibold sm:text-sm"
                >
                  <FaCartPlus className="h-4 w-4" />
                  {isAdded ? "Added to Cart" : "Add to Cart"}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Load more */}
        <div className="mt-14 flex justify-center md:mt-16">
          <Button
            onClick={() => setPage((prev) => prev + 1)}
            variant="outline"
            className="h-11 rounded-full px-8 text-[11px] font-semibold tracking-[0.14em] uppercase"
          >
            Load More Gear
          </Button>
        </div>
      </div>
    </section>
  );
}
