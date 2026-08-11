import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass } from "lucide-react";

const AdventureHero = () => {
  return (
    <section className="relative isolate min-h-[620px] overflow-hidden rounded-b-[2rem] sm:min-h-[680px] lg:min-h-[720px]">
      {/* Background image */}
      <Image
        src="/adventures/adventure-hero.jpg"
        alt="Mount Kenya landscape and hiking adventure"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Main dark overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Green atmospheric overlay */}
      <div className="absolute inset-0 bg-emerald-950/30 mix-blend-multiply" />

      {/* Top-to-bottom gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-black/45 via-black/20 to-background" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-background via-background/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[620px] items-center justify-center px-5 py-24 sm:min-h-[680px] sm:px-8 lg:min-h-[720px]">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Eyebrow */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Explore Kenya
          </div>

          {/* Heading */}
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Find Your Next Great{" "}
            <span className="font-serif italic text-accent">Adventure</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
            From breathtaking mountain trails to hidden gems and unforgettable
            outdoor experiences, discover adventures designed to help you
            experience Kenya differently.
          </p>

          {/* Actions */}
          <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Button
              size="lg"
              className="w-full rounded-full bg-accent px-7 font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 hover:bg-accent/90 sm:w-auto"
            >
              Explore Adventures
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full rounded-full border-white/30 bg-white/5 px-7 font-semibold text-white backdrop-blur-sm hover:bg-white/15 hover:text-white sm:w-auto"
            >
              View Expeditions
            </Button>
          </div>

          {/* Small supporting info */}
          <div className="mt-10 flex items-center gap-2 text-xs font-medium text-white/60">
            <Compass className="h-4 w-4" />
            <span>Hiking · Mountains · Nature · Outdoor Experiences</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdventureHero;
