"use client";

import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  Clock3,
  Heart,
  Mountain,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const adventures = [
  {
    id: 1,
    title: "Mount Kenya Summit",
    location: "Mount Kenya",
    difficulty: "Hard",
    difficultyClass: "bg-red-100 text-red-600",
    image: "/hero/trail-1.jpg",
    description:
      "Challenge yourself with a demanding multi-day ascent to Point Lenana, experiencing...",
    duration: "4 Days",
    elevation: "4,985 m",
    price: "KSH 45,000",
  },
  {
    id: 2,
    title: "Ngong Hills Adventure",
    location: "Kajiado",
    difficulty: "Moderate",
    difficultyClass: "bg-orange-100 text-orange-600",
    image: "/hero/trail-2.jpg",
    description:
      "A classic ridge hike offering panoramic views of the Great Rift Valley, perfect for...",
    duration: "1 Day",
    elevation: "2,460 m",
    price: "KSH 4,500",
  },
  {
    id: 3,
    title: "Hell's Gate Exploration",
    location: "Naivasha",
    difficulty: "Easy",
    difficultyClass: "bg-green-100 text-green-700",
    image: "/hero/trail-3.jpg",
    description:
      "Cycle or walk among wildlife in this unique national park known for its dramatic...",
    duration: "1 Day",
    elevation: "Cycling",
    price: "KSH 6,500",
  },
];

const AdventureResults = () => {
  return (
    <section className="bg-background py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Results header */}
        <div className="mb-6 flex flex-col gap-4 border-b pb-5 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          {/* Result count */}
          <div className="flex items-center">
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              24 adventures found
            </span>
          </div>

          {/* Sort */}
          <button
            type="button"
            className="flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="text-[10px] uppercase tracking-wider">
              Sort by
            </span>

            <span className="font-medium text-foreground">Recommended</span>

            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {adventures.map((adventure) => (
            <article
              key={adventure.id}
              className="
                group
                overflow-hidden
                rounded-2xl
                border
                bg-background
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
              "
            >
              {/* Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={adventure.image}
                  alt={`${adventure.title} in ${adventure.location}, Kenya`}
                  fill
                  sizes="
                    (max-width: 640px) 100vw,
                    (max-width: 1024px) 50vw,
                    33vw
                  "
                  className="
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Difficulty */}
                <span
                  className={`
                    absolute
                    left-3
                    top-3
                    rounded-full
                    px-3
                    py-1
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-wide
                    ${adventure.difficultyClass}
                  `}
                >
                  {adventure.difficulty}
                </span>

                {/* Favorite */}
                <button
                  type="button"
                  aria-label={`Save ${adventure.title}`}
                  className="
                    absolute
                    right-3
                    top-3
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-white/90
                    text-muted-foreground
                    backdrop-blur-sm
                    transition-all
                    hover:bg-white
                    hover:text-red-500
                  "
                >
                  <Heart className="h-4 w-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                {/* Location */}
                <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-accent">
                  <MapPin className="h-3 w-3" />
                  {adventure.location}
                </div>

                {/* Title */}
                <h3 className="mt-2 text-base font-semibold tracking-tight sm:text-lg">
                  {adventure.title}
                </h3>

                {/* Description */}
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground sm:text-sm">
                  {adventure.description}
                </p>

                {/* Meta */}
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />
                    {adventure.duration}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Mountain className="h-3.5 w-3.5" />
                    {adventure.elevation}
                  </span>
                </div>

                {/* Bottom */}
                <div className="mt-5 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[10px] text-muted-foreground">From</p>

                    <p className="mt-1 text-sm font-semibold">
                      {adventure.price}
                    </p>
                  </div>

                  <Button
                    size="icon"
                    variant="outline"
                    className="
                      h-9
                      w-9
                      shrink-0
                      rounded-full
                      transition-all
                      group-hover:bg-accent
                      group-hover:text-accent-foreground
                      group-hover:border-accent
                    "
                    aria-label={`View ${adventure.title}`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load more */}
        <div className="mt-10 flex justify-center sm:mt-12">
          <Button
            variant="outline"
            className="
              h-11
              rounded-full
              border-foreground
              px-6
              text-xs
              font-medium
              uppercase
              tracking-wide
              transition-all
              hover:bg-foreground
              hover:text-background
            "
          >
            Load More Adventures
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AdventureResults;
