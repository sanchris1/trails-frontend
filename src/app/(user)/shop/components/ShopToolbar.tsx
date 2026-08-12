// components/ShopToolbar.tsx
"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "All Gear",
  "Apparel",
  "Accessories",
  "Outdoor Gear",
  "Travel Essentials",
  "Souvenirs",
];

export default function ShopToolbar() {
  const [activeCategory, setActiveCategory] = useState("All Gear");
  const [search, setSearch] = useState("");

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
              (24 Items)
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
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1.5 rounded-full px-3 text-xs font-medium uppercase tracking-wider"
            >
              Sort
              <SlidersHorizontal className="h-3.5 w-3.5" />
            </Button>

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
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide uppercase transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
