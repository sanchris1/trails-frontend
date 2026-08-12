// components/ProductGrid.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  href: string;
};

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Trails & Memoirs Classic Tee",
    category: "Apparel",
    price: 2500,
    image: "/hero/trail-1.jpg",
    href: "/shop/classic-tee",
  },
  {
    id: "2",
    name: "Mountain Trail Cap",
    category: "Accessories",
    price: 1800,
    image: "/hero/trail-2.jpg",
    href: "/shop/mountain-trail-cap",
  },
  {
    id: "3",
    name: "Trail Explorer Tote",
    category: "Travel Essentials",
    price: 1500,
    image: "/hero/trail-3.jpg",
    href: "/shop/trail-explorer-tote",
  },
  {
    id: "4",
    name: "Trails & Memoirs Hoodie",
    category: "Apparel",
    price: 4500,
    image: "/hero/trail-4.jpg",
    href: "/shop/hoodie",
  },
  {
    id: "5",
    name: "Kenya Trail Enamel Mug",
    category: "Souvenirs",
    price: 1200,
    image: "/hero/trail-5.jpg",
    href: "/shop/enamel-mug",
  },
  {
    id: "6",
    name: "Adventure Field Notebook",
    category: "Travel Essentials",
    price: 900,
    image: "/hero/trail-6.jpg",
    href: "/shop/field-notebook",
  },
  {
    id: "7",
    name: "Hiker's Canvas Bag",
    category: "Outdoor Gear",
    price: 3200,
    image: "/hero/trail-7.jpg",
    href: "/shop/canvas-bag",
  },
  {
    id: "8",
    name: "Trail Patch Collection",
    category: "Accessories",
    price: 750,
    image: "/hero/trail-8.jpg",
    href: "/shop/patch-collection",
  },
];

function formatPrice(price: number) {
  return `KES ${price.toLocaleString()}`;
}

export default function ProductGrid() {
  return (
    <section className="bg-background pb-16 md:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-12">
          {PRODUCTS.map((product) => (
            <Link key={product.id} href={product.href} className="group block">
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>

              {/* Info */}
              <div className="mt-3.5 space-y-1">
                <p className="text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
                  {product.category}
                </p>
                <h3 className="text-sm font-medium text-foreground transition-colors group-hover:text-primary sm:text-[15px]">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Load more */}
        <div className="mt-14 flex justify-center md:mt-16">
          <Button
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
