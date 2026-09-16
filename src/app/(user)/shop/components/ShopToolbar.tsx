// components/ShopToolbar.tsx
"use client";

import { Search, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  { value: "all", label: "All Gear" }, // optional – include if you still have an "All" option
  { value: "apparel", label: "Apparel" },
  { value: "outdoor-gear", label: "Outdoor Gear" },
  { value: "accessories", label: "Accessories" },
  { value: "stickers", label: "Stickers & Prints" },
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

export default function ShopToolbar({
  merchandiseLength,
  search,
  setSearch,
  activeCategory,
  setActiveCategory,
  sort,
  setSort,
}: {
  merchandiseLength: number;
  search: string;
  sort: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setSort: (sort: string) => void;
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Top row */}
        <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: Title + count */}
          <div className="flex items-baseline gap-2">
            <h2 className="text-base font-medium text-foreground sm:text-lg">
              All Merchandise
            </h2>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {merchandiseLength}
              {merchandiseLength > 1 ? " Items" : " Item"}
            </span>
          </div>

          {/* Right: Search + Sort + Cart */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Search */}
            <div className="relative flex-1 sm:w-56 sm:flex-none">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search gear..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 rounded-full border-border bg-muted/40 pl-9 text-sm placeholder:text-muted-foreground focus-visible:ring-accent"
              />
            </div>

            {/* Sort */}
            <Select value={sort} onValueChange={(value) => setSort(value!)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort Options</SelectLabel>
                  {sortOptions.map((sort) => (
                    <SelectItem key={sort.value} value={sort.value}>
                      {sort.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Cart */}
            <Button
              variant="outline"
              size="icon"
              className="relative h-9 w-9 rounded-full"
            >
              <ShoppingBag className="h-4 w-4" />
              <Badge className="absolute -right-1.5 -top-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-accent px-1 text-[10px] text-accent-foreground">
                2
              </Badge>
            </Button>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-5 hide-scrollbar">
          {categories.map((category) => {
            const isActive = activeCategory === category.value;

            return (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide uppercase transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
