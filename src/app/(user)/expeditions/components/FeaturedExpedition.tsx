import Image from "next/image";
import { ArrowRight, Mountain, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturedExpedition = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div
        className="
          overflow-hidden rounded-2xl border bg-background
          shadow-sm
          lg:grid lg:grid-cols-[1.35fr_0.85fr]
        "
      >
        {/* Image */}
        <div className="relative aspect-4/3 min-h-70 overflow-hidden sm:min-h-95 lg:aspect-auto lg:min-h-130">
          <Image
            src="/hero/trail-5.jpg"
            alt="Mount Kenya Summit Expedition through the Sirimon Route"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              Featured
            </span>

            <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-secondary backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />4 spots
              left
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col p-5 sm:p-7 lg:p-8">
          {/* Location */}
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
            <Mountain className="h-3.5 w-3.5" />
            Mount Kenya National Park
          </div>

          {/* Title */}
          <h2 className="mt-4 max-w-md font-serif text-2xl font-semibold leading-tight text-secondary sm:text-3xl">
            Mount Kenya Summit Expedition: Sirimon Route
          </h2>

          {/* Description */}
          <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">
            Ascend the second highest peak in Africa through the scenic Sirimon
            route. Experience dramatic shifts in landscape from lush mountain
            forests to breathtaking alpine terrain.
          </p>

          {/* Divider */}
          <div className="my-5 h-px w-full bg-border" />

          {/* Details */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                Dates
              </p>

              <div className="mt-1.5 flex items-center gap-2">
                <CalendarDays className="hidden h-3.5 w-3.5 text-accent sm:block" />
                <p className="text-sm font-medium text-secondary">
                  Oct 12 – Oct 17
                </p>
              </div>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                Duration
              </p>

              <p className="mt-1.5 text-sm font-medium text-secondary">
                6 Days / 5 Nights
              </p>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                Difficulty
              </p>

              <div className="mt-2 flex gap-1">
                <span className="h-1.5 w-7 rounded-full bg-accent" />
                <span className="h-1.5 w-7 rounded-full bg-accent" />
                <span className="h-1.5 w-7 rounded-full bg-accent" />
                <span className="h-1.5 w-7 rounded-full bg-muted" />
                <span className="h-1.5 w-7 rounded-full bg-muted" />
              </div>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                Price
              </p>

              <p className="mt-1.5 text-sm font-semibold text-secondary">
                KSH 45,000
                <span className="ml-1 text-xs font-normal text-muted-foreground">
                  / person
                </span>
              </p>
            </div>
          </div>

          {/* CTA */}
          <Button
            className="
              mt-7 h-11 w-full rounded-lg
              bg-accent text-white
              transition-all duration-300
              hover:bg-accent/90
              hover:shadow-md
              active:scale-[0.98]
            "
          >
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedExpedition;
