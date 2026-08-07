"use client";

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

const fields = [
  {
    key: "difficulty",
    options: [
      { label: "Select Difficulty", value: "" },
      { label: "Beginner", value: "beginner" },
      { label: "Easy", value: "easy" },
      { label: "Moderate", value: "moderate" },
      { label: "Challenging", value: "challenging" },
      { label: "Extreme", value: "extreme" },
    ],
  },
  {
    key: "category",
    options: [
      { label: "Hiking", value: "hiking" },
      { label: "Camping", value: "camping" },
      { label: "Backpacking", value: "backpacking" },
      { label: "Trail Running", value: "trail-running" },
      { label: "Rock Climbing", value: "rock-climbing" },
      { label: "Mountain Biking", value: "mountain-biking" },
      { label: "Wildlife Watching", value: "wildlife-watching" },
      { label: "Nature Walks", value: "nature-walks" },
      { label: "Waterfalls", value: "waterfalls" },
      { label: "Mountain Peaks", value: "mountain-peaks" },
      { label: "Forest Trails", value: "forest-trails" },
      { label: "Scenic Views", value: "scenic-views" },
    ],
  },
  {
    key: "sort",
    options: [
      { label: "Sort By", value: "" },
      { label: "Newest", value: "newest" },
      { label: "Oldest", value: "oldest" },
      { label: "Price: Low to High", value: "price-asc" },
      { label: "Price: High to Low", value: "price-desc" },
    ],
  },
];

const FilterComponent = () => {
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
        placeholder="Search adventures..."
        value={searchParams.get("search") ?? ""}
        onChange={(e) => updateSearchParams("search", e.target.value)}
      />
      {fields.map((field) => (
        <Select
          key={field.key}
          value={searchParams.get(field.key) ?? ""}
          onValueChange={(value) => updateSearchParams(field.key, value!)}
        >
          <SelectTrigger className="w-full  max-w-44">
            <SelectValue placeholder={field.options[0].label} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{field.options[0].label}</SelectLabel>
              {field.options.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ))}
    </div>
  );
};

export default FilterComponent;
