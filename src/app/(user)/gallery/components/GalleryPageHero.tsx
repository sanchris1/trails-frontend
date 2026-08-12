import Image from "next/image";

const GalleryHero = () => {
  return (
    <section className="w-full border-b bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-14 sm:px-8 sm:py-16 md:gap-12 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
        {/* Text */}
        <div className="max-w-xl">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent sm:text-xs">
            Trails &amp; Memoirs
          </span>

          <h1 className="mt-5 max-w-lg font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            Stories From the Trail
          </h1>

          <p className="mt-6 max-w-md text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Explore unforgettable moments captured across our adventures and
            expeditions throughout Kenya.
          </p>
        </div>

        {/* Image */}
        <div className="relative w-full">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl sm:rounded-2xl lg:aspect-[1.15/1]">
            <Image
              src="/hero/expeditions-hero-2.jpg"
              alt="Hiker overlooking the mountains of Kenya"
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 90vw,
                50vw
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryHero;
