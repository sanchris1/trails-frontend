import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Mountain, Plane } from "lucide-react";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pb-24 lg:pt-16">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-125 w-125 rounded-full bg-accent/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-87.5 w-87.5 rounded-full bg-primary/5 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1.5 text-sm font-semibold text-accent">
            <MapPin className="h-4 w-4" />
            Explore Kenya&apos;s Great Outdoors
          </div>

          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.2rem]">
            Discover
            <span className="text-accent"> Unforgettable </span>
            Adventures Across Kenya
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Explore Kenya&apos;s breathtaking mountains, hiking trails,
            wildlife, landscapes, and hidden gems through unforgettable
            adventures and expertly organized expeditions.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="group bg-accent px-6 text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/adventures" className="flex items-center gap-6">
                Explore Adventures
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button variant="outline" size="lg" className="px-6">
              <Link href="/expeditions">View Expeditions</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 border-t pt-6">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Mountain className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold">Authentic Adventures</p>
                <p className="text-xs text-muted-foreground">Explore Kenya</p>
              </div>
            </div>

            <div className="hidden h-8 w-px bg-border sm:block" />

            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Plane className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold">Organized Expeditions</p>
                <p className="text-xs text-muted-foreground">
                  Travel with confidence
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto hidden h-155 w-full max-w-140 lg:block">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5"
          />

          {/* Image 1 — large */}
          <div className="hero-float absolute left-[3%] top-0 z-20 h-65 w-[52%] overflow-hidden rounded-[2rem] shadow-xl">
            <Image
              src="/hero/trail-1.jpg"
              alt="Hiking through Kenya's scenic mountain trails"
              fill
              priority
              sizes="(max-width: 1024px) 0px, 280px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
          </div>

          {/* Image 2 */}
          <div className="hero-float absolute right-0 top-17.5 z-10 h-55 w-[43%] overflow-hidden rounded-[2rem] shadow-xl [animation-delay:1s]">
            <Image
              src="/hero/trail-2.jpg"
              alt="Kenya landscape and outdoor adventure experience"
              fill
              priority
              sizes="(max-width: 1024px) 0px, 230px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/25 to-transparent" />
          </div>

          {/* Image 3 */}
          <div className="hero-float absolute bottom-20 left-[10%] z-30 h-58.75 w-[48%] overflow-hidden rounded-[2rem] border-4 border-background shadow-2xl [animation-delay:2s]">
            <Image
              src="/hero/trail-3.jpg"
              alt="Mountain adventure in Kenya"
              fill
              sizes="(max-width: 1024px) 0px, 260px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
          </div>

          {/* Image 4 */}
          <div className="hero-float absolute bottom-0 right-[3%] z-20 h-47.5 w-[42%] overflow-hidden rounded-[2rem] shadow-xl [animation-delay:3s]">
            <Image
              src="/hero/trail-1.jpg"
              alt="Travelers enjoying a Kenyan outdoor expedition"
              fill
              sizes="(max-width: 1024px) 0px, 230px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          <div className="absolute bottom-[38%] left-[43%] z-40 rounded-2xl border bg-background/95 p-3 shadow-xl backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <MapPin className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Discover</p>
                <p className="text-sm font-bold">Kenya&apos;s Wild Side</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile visual */}
        <div className="relative h-82.5 w-full lg:hidden">
          <div className="absolute left-0 top-0 h-53.5 w-[62%] overflow-hidden rounded-[1.75rem] shadow-lg">
            <Image
              src="/hero/trail-1.jpg"
              alt="Hiking through Kenya's scenic trails"
              fill
              priority
              sizes="62vw"
              className="object-cover"
            />
          </div>

          <div className="absolute right-0 top-10 h-45 w-[42%] overflow-hidden rounded-[1.5rem] border-4 border-background shadow-lg">
            <Image
              src="/hero/trail-2.jpg"
              alt="Kenya travel landscape"
              fill
              sizes="42vw"
              className="object-cover"
            />
          </div>

          <div className="absolute bottom-0 left-[23%] h-42.5 w-[52%] overflow-hidden rounded-[1.75rem] border-4 border-background shadow-xl">
            <Image
              src="/hero/trail-3.jpg"
              alt="Kenya mountain expedition"
              fill
              sizes="52vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
