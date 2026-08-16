"use client";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchAllAdventures } from "@/hooks/adventures/fetchAdventures";
import AdventureExpeditionCard from "@/components/common/AdventureExpeditionCard";

const AdventureResults = ({ query }: { query: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["adventures", query],
    queryFn: () => fetchAllAdventures(query),
  });

  console.log(data?.data);

  return (
    <section className="bg-background py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Results header */}
        <div className="mb-6 flex flex-col gap-4 border-b pb-5 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          {/* Result count */}
          <div className="flex items-center">
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              {data?.data.length} adventures found
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
        {isLoading ? (
          <div>Loading data...</div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6 xl:gap-8">
            {data?.data &&
              data?.data.length > 0 &&
              data?.data.map((adventure) => (
                <AdventureExpeditionCard
                  key={adventure.id}
                  adventure={adventure}
                  isAdventure
                  isAdmin={false}
                />
              ))}
          </div>
        )}

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
