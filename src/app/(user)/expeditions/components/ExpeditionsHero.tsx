"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

const ExpeditionsHero = () => {
  return (
    <section className="relative isolate min-h-155 overflow-hidden sm:min-h-170 lg:min-h-180">
      {/* Background image */}
      <Image
        src="/hero/expeditions-hero-3.jpg"
        alt="group of hikers standing for a photo after a hike"
        fill
        priority
        sizes="100vw"
        className=" object-cover"
      />

      {/* Image overlays */}
      <div className="absolute inset-0 bg-linear-to-r from-background/95 via-background/65 to-background/10" />

      <div className="absolute inset-0 bg-linear-to-t from-background/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-155 max-w-7xl items-center px-4 py-20 sm:min-h-170 sm:px-6 lg:min-h-180 lg:px-8">
        <div className="max-w-xl">
          {/* Eyebrow */}
          <span
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-secondary/10
              bg-background/80
              px-3
              py-1.5
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-secondary
              shadow-sm
              backdrop-blur-sm
            "
          >
            Upcoming Expeditions
          </span>

          {/* Heading */}
          <h1
            className="
              mt-5
              max-w-lg
              font-serif
              text-4xl
              font-semibold
              leading-[1.05]
              tracking-tight
              text-secondary
              sm:text-5xl
              lg:text-6xl
            "
          >
            Your Next Adventure <span className="text-accent">Starts Here</span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-6
              max-w-lg
              text-sm
              leading-6
              text-secondary/80
              sm:text-base
              sm:leading-7
            "
          >
            Discover curated journeys through the heart of Kenya. From the
            towering peaks of Mount Kenya to the vast plains of the Mara, join
            expert guides on unforgettable trails.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              className="
                h-11
                rounded-lg
                bg-accent
                px-6
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition-all
                hover:bg-accent/90
                hover:shadow-md
                active:scale-[0.98]
              "
            >
              Explore Expeditions
            </Button>

            <Button
              variant="outline"
              className="
                h-11
                rounded-lg
                border-secondary/30
                bg-background/30
                px-6
                text-sm
                font-medium
                text-secondary
                backdrop-blur-sm
                transition-all
                hover:bg-background/60
              "
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
