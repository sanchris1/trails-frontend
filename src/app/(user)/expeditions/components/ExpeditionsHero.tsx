"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ExpeditionsHero = () => {
  return (
    <section className="relative isolate min-h-140 overflow-hidden sm:min-h-155 lg:min-h-175">
      {/* Background Image */}
      <Image
        src="/hero/expeditions-hero-3.jpg"
        alt="Group of hikers standing for a photo after a hike"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Balanced overlays that work in both light & dark */}
      <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/50 to-transparent dark:from-background/95 dark:via-background/60" />
      <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-background/20" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-140 max-w-7xl items-center px-4 py-20 sm:min-h-155 sm:px-6 lg:min-h-175 lg:px-8">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground shadow-sm backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Upcoming Expeditions
          </div>

          {/* Heading */}
          <h1 className="mt-6 max-w-xl font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Your Next Adventure{" "}
            <span className="text-primary">Starts Here</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Discover curated journeys through the heart of Kenya. From the
            towering peaks of Mount Kenya to the vast plains of the Mara, join
            expert guides on unforgettable trails.
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="h-12 gap-2 rounded-xl px-7 text-base font-semibold shadow-md transition-all hover:shadow-lg"
            >
              Explore Expeditions
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-border/70 bg-background/60 px-7 text-base font-medium backdrop-blur-sm hover:bg-background/90"
            >
              How It Works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpeditionsHero;
