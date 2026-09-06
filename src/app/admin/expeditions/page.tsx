/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import ExpeditionsFilterComponent from "./components/ExpeditionsFilterComponent";
import { useFetchExpeditions } from "@/hooks/expedition/fetchExpeditions";
import AdventureExpeditionCard from "@/components/common/AdventureExpeditionCard";
import FetchingProductsPage from "@/components/common/FetchingProductsPage";
import NoProductsFound from "@/components/common/NoProductsFound";
import ExpeditionsCommand from "../components/ExpeditionsCommand";
import { useEffect, useState } from "react";

const ExpeditionsPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const query = searchParams.toString();

  const { data, isLoading } = useFetchExpeditions(query);
  const [open, setOpen] = useState(false);
  const [adventureId, setAdventureId] = useState<string | null>(null);

  useEffect(() => {
    if (!adventureId) return;
    router.push(`/admin/expeditions/create/${adventureId}/new`);
    setAdventureId(null);
  }, [adventureId]);

  if (!data?.data) return <NoProductsFound />;

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="">
          <h3 className="text-4xl font-medium text-foreground">Expeditions</h3>
          <p className="text-sm text-secondary">
            Manage, organize and publish all travel expeditions on the Trails
            and Memoirs
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          {" "}
          <Plus />
          Create Expedition
        </Button>
      </div>
      <ExpeditionsFilterComponent />
      {isLoading ? (
        <FetchingProductsPage />
      ) : data?.data.length === 0 ? (
        <div>No data found please clear the search filters</div>
      ) : (
        <div className="grid grid-cols-4 gap-7">
          {data?.data.map((adventure: any) => (
            <AdventureExpeditionCard
              key={adventure.id}
              adventure={adventure.adventure}
              expedition={adventure}
              isAdmin
              isAdventure={false}
            />
          ))}
        </div>
      )}
      <ExpeditionsCommand
        open={open}
        setOpen={setOpen}
        setAdventureId={setAdventureId}
        isAdventure
      />
    </div>
  );
};

export default ExpeditionsPage;
