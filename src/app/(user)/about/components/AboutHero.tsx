import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const AboutHero = () => {
  return (
    <section className="overflow-hidden bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 md:gap-14 md:py-20 lg:grid-cols-2 lg:px-10 lg:py-24 xl:gap-20">
        {/* Content */}
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent sm:text-sm">
            About Trails &amp; Memoirs
          </span>

          <h1 className="mt-5 font-serif text-4xl font-semibold leading-[0.98] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-7xl">
            Stories, Adventures
            <br className="hidden sm:block" /> &amp; Memories
            <br className="hidden sm:block" /> From the Trail
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Trails &amp; Memoirs connects curious travelers with unforgettable
            adventures and expeditions across Kenya — from mountain trails and
            dramatic landscapes to hidden gems and meaningful moments along the
            way.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button className="h-12 rounded-full bg-accent px-7 font-semibold text-white hover:bg-accent/90">
              <Link href="/adventures">Explore Adventures</Link>
            </Button>

            <Button
              variant="outline"
              className="h-12 rounded-full border-secondary/40 px-7 font-semibold"
            >
              <Link href="/expeditions">Discover Our Expeditions</Link>
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          {/* Decorative background */}
          <div className="absolute -right-6 -top-6 hidden h-32 w-32 rounded-full bg-accent/10 sm:block" />

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-xl sm:rounded-3xl">
            <Image
              src="/hero/trail-1.jpg"
              alt="Hikers exploring a mountain trail in Kenya"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
            />

            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          {/* Small floating label */}
          <div className="absolute bottom-5 left-5 rounded-xl border border-white/20 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm sm:bottom-7 sm:left-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Explore Kenya
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              One trail at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
