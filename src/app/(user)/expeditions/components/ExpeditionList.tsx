"use client";

import Image from "next/image";
import { CalendarDays, UserRound, ChevronDown, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type Expedition = {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  dates: string;
  guide: string;
  price: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  spotsLeft: number;
  badge?: string;
};

const expeditions: Expedition[] = [
  {
    id: "1",
    title: "Lake Michaelson Alpine Trek",
    location: "CHOGORIA ROUTE",
    description:
      "Descend through the spectacular Gorges Valley, camping by the pristine alpine lake...",
    image: "/hero/trail-1.jpg",
    dates: "Nov 05 - Nov 09",
    guide: "Samuel Kamau",
    price: "$950",
    difficulty: "Moderate",
    spotsLeft: 6,
    badge: "GUARANTEED DEPARTURE",
  },
  {
    id: "2",
    title: "Aberdare Moorlands Traverse",
    location: "ABERDARE RANGES",
    description:
      "A gentle traverse across high-altitude moorlands, passing magnificent landscapes...",
    image: "/hero/trail-1.jpg",
    dates: "Dec 12 - Dec 14",
    guide: "Jane Wanjiku",
    price: "$450",
    difficulty: "Easy",
    spotsLeft: 2,
    badge: "SELLING FAST",
  },
  {
    id: "3",
    title: "Longonot Crater Rim & Summit",
    location: "GREAT RIFT VALLEY",
    description:
      "A strenuous day hike up and around the rim of this dormant stratovolcano...",
    image: "/hero/trail-1.jpg",
    dates: "Jan 18, 2025",
    guide: "Local Ranger",
    price: "$120",
    difficulty: "Challenging",
    spotsLeft: 10,
  },
];

const difficultyStyles = {
  Easy: "bg-green-50 text-green-700",
  Moderate: "bg-orange-50 text-orange-700",
  Challenging: "bg-red-50 text-red-700",
};

const ExpeditionsList = () => {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            12 Upcoming Expeditions
          </h2>

          {/* Sort */}
          <button className="flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <span className="text-[10px] uppercase tracking-wider">
              Sort by:
            </span>

            <span className="font-medium text-foreground">Date: Closest</span>

            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {expeditions.map((expedition) => (
            <article
              key={expedition.id}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={expedition.image}
                  alt={`${expedition.title} expedition in ${expedition.location}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badge */}
                {expedition.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-wide text-secondary shadow-sm backdrop-blur-sm">
                    {expedition.badge}
                  </span>
                )}

                {/* Difficulty */}
                <span
                  className={`absolute right-3 top-3 rounded-md px-2 py-1 text-[9px] font-medium ${
                    difficultyStyles[expedition.difficulty]
                  }`}
                >
                  {expedition.difficulty}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Location */}
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">
                  {expedition.location}
                </p>

                {/* Title */}
                <h3 className="mt-2 font-serif text-xl font-semibold leading-tight text-foreground">
                  {expedition.title}
                </h3>

                {/* Description */}
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {expedition.description}
                </p>

                {/* Details */}
                <div className="mt-5 border-t border-border pt-4">
                  <div className="space-y-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-accent" />
                      <span>{expedition.dates}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <UserRound className="h-4 w-4 text-accent" />
                      <span>Guide: {expedition.guide}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom */}
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] text-muted-foreground">From</p>

                    <p className="mt-1 font-serif text-lg font-semibold text-foreground">
                      {expedition.price}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`rounded-full px-2 py-1 text-[9px] font-medium ${
                        expedition.spotsLeft <= 2
                          ? "bg-red-50 text-red-600"
                          : "bg-green-50 text-green-700"
                      }`}
                    >
                      {expedition.spotsLeft} Spots Left
                    </span>

                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full transition-all duration-300 group-hover:bg-accent group-hover:text-white"
                    >
                      <ArrowDown className="h-4 w-4 -rotate-90" />
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load more */}
        <div className="mt-10 flex justify-center sm:mt-14">
          <Button
            variant="outline"
            className="rounded-full border-secondary px-7 text-xs font-medium uppercase tracking-wide"
          >
            Load More Expeditions
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExpeditionsList;
