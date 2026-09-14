"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExpeditionsWithGalleryTypes } from "@/types/t.types";
import { SlidersHorizontal } from "lucide-react";

const ExpeditionGalleryFilters = ({
  selectedExpeditionId,
  setSelectedExpeditionId,
  expeditions,
}: {
  selectedExpeditionId?: string;
  setSelectedExpeditionId: (id: string | undefined) => void;
  expeditions: ExpeditionsWithGalleryTypes[];
}) => {
  return (
    <section className="w-full border-y bg-muted/20">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 md:py-10 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        {/* Heading */}
        <div>
          <h2 className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl">
            Explore Expedition Stories
          </h2>
        </div>

        {/* Controls */}
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:items-center">
          {/* Search */}
          {/* <div className="relative w-full sm:min-w-55 sm:max-w-70">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search expeditions..."
              className="h-10 rounded-full border-border bg-background pl-9 pr-4 text-xs"
            />
          </div> */}

          {/* Expedition filter */}
          <Select
            value={selectedExpeditionId}
            onValueChange={(value) =>
              setSelectedExpeditionId(
                value === "all" || value === null ? undefined : value,
              )
            }
          >
            <SelectTrigger className="min-w-64">
              <SelectValue placeholder="Filter by Expeditions">
                {selectedExpeditionId
                  ? expeditions?.find((exp) => exp.id === selectedExpeditionId)
                      ?.name || "Unknown Expedition"
                  : "All Expeditions"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Expeditions</SelectLabel>
                <SelectItem value="all">All Expeditions</SelectItem>
                {expeditions?.map((exp) => (
                  <SelectItem key={exp.id} value={exp.id}>
                    {exp.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Button
            variant="ghost"
            className="h-10 justify-between rounded-full px-3 text-[10px] uppercase tracking-wider text-muted-foreground sm:w-auto"
          >
            <span>Newest First</span>
            <SlidersHorizontal className="ml-2 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExpeditionGalleryFilters;
