"use client";

import { CalendarDays, MapPin, Users } from "lucide-react";
import { Button } from "../ui/button";

const ExploreDestination = () => {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-6xl">
        {/* Main CTA container */}
        <div
          className="
            relative
            overflow-visible
            rounded-[2rem]
            bg-muted/40
            px-5 py-12
            text-center
            sm:px-8 sm:py-16
            md:px-12
            lg:px-16 lg:py-20
          "
        >
          {/* Heading */}
          <div className="mx-auto max-w-2xl">
            <span className="text-sm font-semibold tracking-wide text-accent">
              Top Destinations
            </span>

            <h2
              className="
                mt-3
                text-3xl font-bold leading-tight tracking-tight
                text-foreground
                sm:text-4xl
                md:text-5xl
              "
            >
              Let&apos;s Explore Your Dream
              <br className="hidden sm:block" />
              Destination Here!
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Discover popular destinations and unforgettable adventures across
              Kenya. Find your next experience without the hassle.
            </p>
          </div>

          {/* Search / booking bar */}
          <div
            className="
              relative
              mt-8
              w-full
              rounded-2xl
              border
              border-border/60
              bg-background
              p-3
              shadow-xl
              md:mt-10
              md:rounded-3xl
              md:p-4
              lg:absolute
              lg:left-1/2
              lg:bottom-0
              lg:mt-0
              lg:w-[calc(100%-8rem)]
              lg:-translate-x-1/2
              lg:translate-y-1/2
            "
          >
            <div
              className="
                grid
                gap-2
                md:grid-cols-2
                lg:grid-cols-[1.1fr_1fr_1fr_1fr_auto]
                lg:items-center
              "
            >
              {/* Location */}
              <div className="flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-muted/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <MapPin className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground">
                    Location
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    Where are you going?
                  </p>
                </div>
              </div>

              {/* People */}
              <div className="flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-muted/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Users className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground">
                    Travelers
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    How many people?
                  </p>
                </div>
              </div>

              {/* Check in */}
              <div className="flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-muted/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <CalendarDays className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground">
                    Check In
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    Choose your date
                  </p>
                </div>
              </div>

              {/* Check out */}
              <div className="flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-muted/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <CalendarDays className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground">
                    Check Out
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    Choose your date
                  </p>
                </div>
              </div>

              {/* CTA */}
              <Button
                className="
                  h-11
                  rounded-xl
                  bg-accent
                  px-6
                  text-sm
                  font-semibold
                  text-accent-foreground
                  transition-all
                  hover:bg-accent/90
                  active:scale-[0.98]
                  md:col-span-2
                  lg:col-span-1
                "
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreDestination;
