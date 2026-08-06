"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FilterComponent from "../components/FilterComponent";
import { useQuery } from "@tanstack/react-query";
import { fetchAllAdventures } from "@/hooks/adventures/fetchAdventures";
import { useRouter, useSearchParams } from "next/navigation";
import AdventureExpeditionCard from "@/components/common/AdventureExpeditionCard";

const AdventuresPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["adventures", query],
    queryFn: () => fetchAllAdventures(query),
  });

  console.log(data?.data);

  return (
    <div className="">
      {" "}
      <div className="flex items-center justify-between">
        <div className="">
          <h3 className="text-4xl font-medium text-foreground">Adventures</h3>
          <p className="text-sm text-secondary">
            Manage, organize and publish all travel adventures on the Trails and
            Memoirs
          </p>
        </div>
        <Button onClick={() => router.push("/admin/adventures/new")}>
          {" "}
          <Plus />
          Create Adventure
        </Button>
      </div>
      <FilterComponent />
      {isLoading ? (
        <div>Loading...</div>
      ) : data?.data.length === 0 ? (
        <div>No data found please clear the search filters</div>
      ) : (
        <div className="grid grid-cols-4 gap-7">
          {data?.data.map((adventure) => (
            <AdventureExpeditionCard
              key={adventure.id}
              adventure={adventure}
              isAdmin
              isAdventure
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdventuresPage;
