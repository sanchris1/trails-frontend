// components/WhatYoullFindHere.tsx
import Image from "next/image";
import Link from "next/link";

interface CardItem {
  title: string;
  cta: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

interface WhatYoullFindHereProps {
  items?: CardItem[];
}

const defaultItems: CardItem[] = [
  {
    title: "Adventures",
    cta: "Explore",
    href: "/adventures",
    imageSrc: "/hero/trail-1.jpg",
    imageAlt: "Hiking boots on a dusty trail",
  },
  {
    title: "Expeditions",
    cta: "Discover",
    href: "/expeditions",
    imageSrc: "/hero/trail-2.jpg",
    imageAlt: "Safari vehicle driving through the savanna",
  },
  {
    title: "Expedition Stories",
    cta: "Read",
    href: "/stories",
    imageSrc: "/hero/trail-4.jpg",
    imageAlt: "Journal and notebook overlooking the savanna",
  },
];

export default function WhatYoullFindHere({
  items = defaultItems,
}: WhatYoullFindHereProps) {
  return (
    <section className="bg-background py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Headline */}
        <h2 className="mb-12 text-center font-serif text-3xl text-foreground sm:text-4xl md:mb-16 md:text-5xl">
          What You&apos;ll Find Here
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              {/* Image */}
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Text content */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <h3 className="text-xl font-medium text-white sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium tracking-widest text-white/80 uppercase transition-colors group-hover:text-white">
                  {item.cta}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
