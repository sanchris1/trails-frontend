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
import { Adventure, Expedition } from "@/types/t.types";
import { useQuery } from "@tanstack/react-query";
import { fetchAllAdventures } from "@/hooks/adventures/fetchAdventures";

interface ExpeditionsCommandProps {
  open: boolean;
  setOpen: (state: boolean) => void;
  isAdventure: boolean;
  setAdventureId?: (adventureId: string) => void;
  setExpeditionId?: (expeditionId: string) => void;
}

const ExpeditionsCommand = ({
  open,
  setOpen,
  setExpeditionId,
  isAdventure,
  setAdventureId,
}: ExpeditionsCommandProps) => {
  const [search, setSearch] = useState("");

  const { data, isLoading, isFetching } = useFetchExpeditions(search);

  const { data: adventuresData } = useQuery({
    queryKey: ["adventures", search],
    queryFn: () => fetchAllAdventures(search),
  });

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
          <CommandGroup
            heading={isAdventure ? "Adventures" : "Expeditions"}
          ></CommandGroup>
          {!isAdventure &&
            expeditionToAddGalleries &&
            expeditionToAddGalleries.map((item: Expedition) => (
              <ExpeditionsCommandItem
                isAdventure={false}
                key={item.id}
                expedition={item}
                setId={setExpeditionId!}
                setOpen={setOpen}
              />
            ))}
          {isAdventure &&
            adventuresData &&
            adventuresData?.data.map((item: Adventure) => (
              <ExpeditionsCommandItem
                isAdventure={isAdventure}
                key={item.id}
                adventure={item}
                setId={setAdventureId!}
                setOpen={setOpen}
              />
            ))}
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

export default ExpeditionsCommand;
