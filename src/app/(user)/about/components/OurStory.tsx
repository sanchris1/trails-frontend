import Image from "next/image";

const OurStory = () => {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <div className="relative order-2 h-[320px] w-full overflow-hidden rounded-2xl shadow-lg sm:h-[420px] lg:order-1 lg:h-[480px]">
            <Image
              src="/hero/trail-2.jpg"
              alt="Travelers taking a break during an expedition in Kenya"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Our Story
            </span>

            <h2 className="mt-4 max-w-xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              More Than Just a Journey
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              We believe that to truly understand a place, you must walk its
              paths, breathe its air, and listen to its stories. Trails &
              Memoirs was born from a desire to help people experience Kenya
              beyond the conventional tourist routes — to immerse themselves in
              the raw beauty and rich narratives of this remarkable land.
            </p>

            {/* Quote */}
            <div className="mt-8 border-l-2 border-accent pl-5 sm:mt-10 sm:pl-6">
              <blockquote className="max-w-lg font-serif text-xl italic leading-8 text-foreground sm:text-2xl sm:leading-9">
                &quot;Every trail has a story. Every journey leaves a
                memory.&quot;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
