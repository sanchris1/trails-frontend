"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const AdventuresExpeditionFilterSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const updateFilterOptions = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="max-w-md">
          <p className="text-sm font-medium text-accent">Explore Adventures</p>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Choose an experience that matches your pace, interests, and sense of
            adventure.
          </p>
        </div>

        {/* Filter container */}
        <div className="mt-8 rounded-2xl border bg-background p-3 shadow-sm sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Search */}
            <div className="relative w-full lg:flex-1">
              <Search
                className="
              absolute left-3 top-1/2
              h-4 w-4
              -translate-y-1/2
              text-muted-foreground
            "
              />

              <Input
                defaultValue={searchParams.get("search") ?? ""}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateFilterOptions("search", e.currentTarget.value);
                  }
                }}
                placeholder="Search adventures..."
                className="
              h-11 w-full
              rounded-xl
              pl-10
            "
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:flex lg:w-auto">
              {/* Location */}
              <Select
                value={searchParams.get("location") ?? ""}
                onValueChange={(value) =>
                  updateFilterOptions("location", value)
                }
              >
                <SelectTrigger className="h-11 w-full rounded-xl sm:w-35">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="nairobi">Nairobi</SelectItem>
                  <SelectItem value="nakuru">Nakuru</SelectItem>
                  <SelectItem value="nyeri">Nyeri</SelectItem>
                  <SelectItem value="narok">Narok</SelectItem>
                  <SelectItem value="mombasa">Mombasa</SelectItem>
                </SelectContent>
              </Select>

              {/* Difficulty */}
              <Select
                value={searchParams.get("difficulty") ?? ""}
                onValueChange={(value) =>
                  updateFilterOptions("difficulty", value)
                }
              >
                <SelectTrigger className="h-11 w-full rounded-xl sm:w-35">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>

              {/* More filters */}
              <Button
                variant="outline"
                className="
              h-11
              w-full
              rounded-xl
              sm:w-11
              sm:px-0
            "
              >
                <SlidersHorizontal className="h-4 w-4" />

                <span className="sm:hidden">More Filters</span>
              </Button>
            </div>
          </div>

          {/* Clear filters */}
          <div className="mt-3 flex justify-end">
            <button
              onClick={() => router.push(pathname)}
              type="button"
              className="
            text-[11px]
            font-medium
            uppercase
            tracking-wide
            text-accent
            transition-colors
            hover:text-accent/70
          "
            >
              × Clear Filters
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdventuresExpeditionFilterSection;
