// components/ExpeditionStories.tsx
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type GalleryImage = {
  id: string;
  imageUrl: string;
  caption?: string;
};

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "1",
    imageUrl: "/hero/trail-1.jpg",
    caption: "First light on the escarpment",
  },
  {
    id: "2",
    imageUrl: "/hero/trail-2.jpg",
    caption: "Crossing the dry riverbed",
  },
  {
    id: "3",
    imageUrl: "/hero/trail-4.jpg",
    caption: "A quiet moment between the hills",
  },
  {
    id: "4",
    imageUrl: "/hero/trail-4.jpg",
    caption: "Dust and golden hour",
  },
  {
    id: "5",
    imageUrl: "/hero/trail-5.jpg",
    caption: "Looking back at the valley",
  },
  {
    id: "6",
    imageUrl: "/hero/trail-6.jpg",
    caption: "The trail continues",
  },
  {
    id: "7",
    imageUrl: "/hero/trail-7.jpg",
    caption: "Camp under open skies",
  },
  {
    id: "8",
    imageUrl: "/hero/trail-4.jpg",
    caption: "Last light on the ridge",
  },
];

type GalleryImageProps = {
  image: GalleryImage;
  index: number;
  className: string;
  aspect: string;
};

const GalleryImage = ({
  image,
  index,
  className,
  aspect,
}: GalleryImageProps) => {
  return (
    <article className={`group ${className}`}>
      <div
        className={`relative block w-full overflow-hidden rounded-xl ${aspect}`}
      >
        <Image
          src={image.imageUrl}
          alt={image.caption || `Photo ${index + 1} from the expedition`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
      </div>

      {image.caption && (
        <div className="mt-2.5 flex gap-2">
          <span className="mt-1 h-4 w-px shrink-0 bg-accent" />
          <p className="font-serif text-xs italic leading-5 text-muted-foreground sm:text-sm">
            {image.caption}
          </p>
        </div>
      )}
    </article>
  );
};

const LeftFeaturePattern = ({
  images,
  startIndex,
}: {
  images: GalleryImage[];
  startIndex: number;
}) => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
      {images[0] && (
        <GalleryImage
          image={images[0]}
          index={startIndex}
          className="md:col-span-8"
          aspect="aspect-[4/3]"
        />
      )}
      {images[1] && (
        <GalleryImage
          image={images[1]}
          index={startIndex + 1}
          className="md:col-span-4"
          aspect="aspect-[3/4]"
        />
      )}
      {images[2] && (
        <GalleryImage
          image={images[2]}
          index={startIndex + 2}
          className="md:col-span-6"
          aspect="aspect-[16/9]"
        />
      )}
      {images[3] && (
        <GalleryImage
          image={images[3]}
          index={startIndex + 3}
          className="md:col-span-6"
          aspect="aspect-[16/9]"
        />
      )}
    </div>
  );
};

const RightFeaturePattern = ({
  images,
  startIndex,
}: {
  images: GalleryImage[];
  startIndex: number;
}) => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
      {images[0] && (
        <GalleryImage
          image={images[0]}
          index={startIndex}
          className="md:col-span-4 md:order-1"
          aspect="aspect-[3/4]"
        />
      )}
      {images[1] && (
        <GalleryImage
          image={images[1]}
          index={startIndex + 1}
          className="md:col-span-8 md:order-2"
          aspect="aspect-[4/3]"
        />
      )}
      {images[2] && (
        <GalleryImage
          image={images[2]}
          index={startIndex + 2}
          className="md:col-span-6 md:order-3"
          aspect="aspect-[16/9]"
        />
      )}
      {images[3] && (
        <GalleryImage
          image={images[3]}
          index={startIndex + 3}
          className="md:col-span-6 md:order-4"
          aspect="aspect-[16/9]"
        />
      )}
    </div>
  );
};

export default function ExpeditionStories() {
  const groups: GalleryImage[][] = [];

  for (let i = 0; i < GALLERY_IMAGES.length; i += 4) {
    groups.push(GALLERY_IMAGES.slice(i, i + 4));
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      {/* Header */}
      <header className="mb-8 sm:mb-10">
        <h2 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Expedition Stories
        </h2>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-medium uppercase tracking-[0.16em] text-accent">
          <span>Mount Kenya Circuit</span>
          <span className="text-muted-foreground">•</span>
          <span>Northern Route</span>
          <span className="text-muted-foreground">•</span>
          <span>{GALLERY_IMAGES.length} Photos</span>
        </div>
      </header>

      {/* Gallery */}
      <div className="space-y-10 sm:space-y-14 md:space-y-16">
        {groups.map((group, groupIndex) => {
          const startIndex = groupIndex * 4;
          const isLeftFeature = groupIndex % 2 === 0;

          return isLeftFeature ? (
            <LeftFeaturePattern
              key={groupIndex}
              images={group}
              startIndex={startIndex}
            />
          ) : (
            <RightFeaturePattern
              key={groupIndex}
              images={group}
              startIndex={startIndex}
            />
          );
        })}
      </div>

      {/* Load more (static for now) */}
      <div className="mt-12 flex justify-center sm:mt-16 md:mt-20">
        <Button
          variant="outline"
          className="h-11 rounded-full px-6 text-[10px] font-semibold uppercase tracking-[0.15em]"
        >
          Load More Stories
          <ArrowDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      </div>
    </section>
  );
}
