/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFetchExpeditions } from "@/hooks/expedition/fetchExpeditions";
import AdventureExpeditionCard from "@/components/common/AdventureExpeditionCard";
import FetchingProductsPage from "@/components/common/FetchingProductsPage";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Expedition } from "@/types/t.types";

const ExpeditionsList = ({ query }: { query: string }) => {
  const { data, isLoading } = useFetchExpeditions(query);
  const [activeCondition, setActiveCondition] = useState<
    "scheduled" | "ongoing" | "cancelled" | "completed"
  >("scheduled");

  const expeditionConditions = [
    { label: "Scheduled", value: "scheduled" },
    { label: "Ongoing", value: "ongoing" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
  ] as const;

  const conditionalFilteredExpeditions = data?.data.filter(
    (item: Expedition) => item.expeditionStatus === activeCondition,
  );

  console.log(conditionalFilteredExpeditions);

  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
          {!isLoading && (
            <h2 className="font-serif  font-semibold tracking-tight text-foreground text-2xl">
              {conditionalFilteredExpeditions.length}{" "}
              {activeCondition.toUpperCase()} EXPEDITION
            </h2>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-5 hide-scrollbar mt-4">
          {expeditionConditions.map((condition) => {
            const isActive = activeCondition === condition.value;

            return (
              <button
                key={condition.value}
                onClick={() => setActiveCondition(condition.value)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide uppercase transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {condition.label}
              </button>
            );
          })}
        </div>
        {/* Cards */}
        {isLoading ? (
          <FetchingProductsPage />
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
            {conditionalFilteredExpeditions &&
              conditionalFilteredExpeditions.length > 0 &&
              conditionalFilteredExpeditions.map((exp: any) => (
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
