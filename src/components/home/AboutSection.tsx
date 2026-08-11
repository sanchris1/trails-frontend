import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="w-full px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Image composition */}
        <div className="relative mx-auto h-95 w-full max-w-130 sm:h-112.5">
          {/* Main image */}
          <div className="absolute left-0 top-0 h-67.5 w-[58%] overflow-hidden rounded-[2rem] sm:h-80">
            <Image
              src="/hero/trail-1.jpg"
              alt="Travelers exploring Kenya"
              fill
              className="object-cover"
            />
          </div>

          {/* Top-right image */}
          <div className="absolute right-[5%] top-[8%] z-10 h-37.5 w-[38%] overflow-hidden rounded-[1.75rem] border-4 border-background sm:h-47.5">
            <Image
              src="/hero/trail-2.jpg"
              alt="Beautiful destination in Kenya"
              fill
              className="object-cover"
            />
          </div>

          {/* Bottom image */}
          <div className="absolute bottom-0 left-[25%] z-20 h-47.5 w-[48%] overflow-hidden rounded-[2rem] border-4 border-background sm:h-57.5">
            <Image
              src="/hero/trail-3.jpg"
              alt="Hot air balloons over Kenya"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            About
          </span>

          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            We Recommend
            <br />
            Beautiful Destinations
            <br />
            Every Month
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
            Let&apos;s choose your dream destination. We provide amazing
            destinations and unforgettable experiences for every kind of
            traveler.
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
            <div className="rounded-2xl bg-muted/50 p-4 text-center">
              <p className="text-xl font-bold sm:text-2xl">2000+</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Our Explorers
              </p>
            </div>

            <div className="rounded-2xl bg-muted/50 p-4 text-center">
              <p className="text-xl font-bold sm:text-2xl">100+</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Destinations
              </p>
            </div>

            <div className="rounded-2xl bg-muted/50 p-4 text-center">
              <p className="text-xl font-bold sm:text-2xl">20+</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Years Experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
