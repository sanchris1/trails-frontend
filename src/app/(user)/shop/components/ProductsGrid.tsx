import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MerchandiseResponse } from "@/types/t.types";
import FetchingProductsPage from "@/components/common/FetchingProductsPage";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

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
  if (loading) return <FetchingProductsPage />;

  return (
    <section className="bg-background pb-16 md:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-12">
          {merchandise?.map((product) => (
            <Link
              key={product?.merchandise.id}
              href={`/shop/${product?.merchandise.slug}`}
              className="group block"
            >
              {/* Image */}
              <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-muted">
                <Image
                  src={product?.merchandise_images?.images[0].url}
                  alt={product?.merchandise?.slug}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      toggleFavoriteMerchandise(product.merchandise.id);
                    }}
                    className={` ${isFavoriteMerchandise(product.merchandise.id) ? "text-accent bg-transparent" : "bg-black/40 backdrop-blur-sm text-secondary "}  rounded-full hover:bg-transparent  p-2 text-xs `}
                  >
                    {isFavoriteMerchandise(product.merchandise.id) ? (
                      <FaHeart />
                    ) : (
                      <FaRegHeart />
                    )}
                  </Button>
                </div>
              </div>

              {/* Info */}
              <div className="mt-3.5 space-y-1">
                <p className="text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
                  {product?.merchandise.category}
                </p>
                <h3 className="text-sm font-medium text-foreground transition-colors group-hover:text-primary sm:text-[15px]">
                  {product?.merchandise.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formatPrice(product?.merchandise.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Load more */}
        <div className="mt-14 flex justify-center md:mt-16">
          <Button
            onClick={() => setPage((prev) => prev++)}
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
