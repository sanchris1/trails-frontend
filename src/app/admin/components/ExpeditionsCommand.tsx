"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { useFetchExpeditions } from "@/hooks/expedition/fetchExpeditions";
import { useState } from "react";
import ExpeditionsCommandItem from "./ExpeditionsCommandItem";
import { Expedition } from "@/types/t.types";

const ExpeditionsCommand = ({
  open,
  setOpen,
  setExpeditionId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  setExpeditionId: (expeditionId: string) => void;
}) => {
  const [search, setSearch] = useState("");

  const { data, isLoading, isFetching } = useFetchExpeditions(search);

  const today = new Date().toLocaleString().split("T")[0];

  const expeditionToAddGalleries = data?.data.filter(
    (exp: Expedition) => exp.departureDate < today && exp.returnDate <= today,
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command>
        <CommandInput
          placeholder="Search for expedition..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          {isLoading && <CommandEmpty>Loading expeditions...</CommandEmpty>}
          {!isLoading && isFetching && (
            <CommandEmpty>Searching expeditions</CommandEmpty>
          )}
          {!isFetching && expeditionToAddGalleries.length === 0 && (
            <CommandEmpty>No expeditions found</CommandEmpty>
          )}
          <CommandGroup heading="Expeditions"></CommandGroup>
          {expeditionToAddGalleries &&
            expeditionToAddGalleries.map((item: Expedition) => (
              <ExpeditionsCommandItem
                key={item.id}
                expedition={item}
                setId={setExpeditionId}
                setOpen={setOpen}
              />
            ))}
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

export default ExpeditionsCommand;
