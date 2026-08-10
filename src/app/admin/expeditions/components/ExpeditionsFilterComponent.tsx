"use client";

import { expeditionSortOptions, expeditionStatuses } from "@/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ExpeditionsFilterComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className=" flex  items-center justify-between gap-6 py-6 border-2 border-border px-6 rounded-xl my-8">
      <Input
        placeholder="Search expeditions..."
        value={searchParams.get("search") ?? ""}
        onChange={(e) => updateSearchParams("search", e.target.value)}
      />
      <Select
        items={expeditionStatuses}
        value={searchParams.get("status") ?? ""}
        onValueChange={(value) => updateSearchParams("status", value!)}
      >
        <SelectTrigger className={"w-full max-w-xs"}>
          <SelectValue placeholder="Set some status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            {expeditionStatuses.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        items={expeditionSortOptions}
        value={searchParams.get("sortBy") ?? ""}
        onValueChange={(value) => updateSearchParams("sortBy", value!)}
      >
        <SelectTrigger className={"w-full max-w-xs"}>
          <SelectValue placeholder="Set some sort options" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort</SelectLabel>
            {expeditionSortOptions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button onClick={() => router.replace(pathname)}>
        Clear Search Params
      </Button>
    </div>
  );
};

export default ExpeditionsFilterComponent;
