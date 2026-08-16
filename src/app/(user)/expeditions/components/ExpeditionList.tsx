/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFetchExpeditions } from "@/hooks/expedition/fetchExpeditions";
import AdventureExpeditionCard from "@/components/common/AdventureExpeditionCard";
import FetchingProductsPage from "@/components/common/FetchingProductsPage";

const ExpeditionsList = ({ query }: { query: string }) => {
  const { data, isLoading } = useFetchExpeditions(query);

  console.log(data?.data);

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
        {isLoading ? (
          <FetchingProductsPage />
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
            {data?.data &&
              data?.data?.length > 0 &&
              data?.data.map((exp: any) => (
                <AdventureExpeditionCard
                  key={exp.id}
                  adventure={exp.adventure}
                  expedition={exp}
                  isAdmin={false}
                  isAdventure={false}
                />
              ))}
          </div>
        )}

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
