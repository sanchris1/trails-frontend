import { Button } from "@/components/ui/button";
import Link from "next/link";

const DiscountCTA = () => {
  return (
    <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] bg-accent/10 px-6 py-12 text-center sm:px-10 md:rounded-[2.5rem] md:py-16">
          <span className="text-sm font-semibold text-accent">
            Special Offer
          </span>

          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Don&apos;t Miss Our Special Offers
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Discover amazing adventures across Kenya and enjoy special offers
            created for explorers looking for unforgettable experiences.
          </p>

          <Button className="mt-7 bg-accent px-7 hover:bg-accent/90">
            <Link href="/expeditions">Explore Expeditions</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DiscountCTA;
