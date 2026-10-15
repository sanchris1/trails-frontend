"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MapPin,
  Calendar,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useFetchAllAdminFavorites } from "@/hooks/favorites/fetchAllFavorites";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
  });
}

export default function FavoritesPage() {
  const { data: { allFavorites = [] } = {} } = useFetchAllAdminFavorites();

  const [filter, setFilter] = useState<"all" | "merchandise" | "expedition">(
    "all",
  );

  const filtered =
    filter === "all"
      ? allFavorites
      : allFavorites.filter((item) => item.type === filter);

  const trailCount = allFavorites.filter((f) => f.type === "expedition").length;
  const merchCount = allFavorites.filter(
    (f) => f.type === "merchandise",
  ).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Favorites
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Trails and merchandise you’ve saved for later.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All ({allFavorites.length})
        </Button>
        <Button
          variant={filter === "expedition" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("expedition")}
        >
          Trails ({trailCount})
        </Button>
        <Button
          variant={filter === "merchandise" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("merchandise")}
        >
          Merchandise ({merchCount})
        </Button>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-20 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <Heart className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">
            No favorites yet
          </p>
          <p className="mt-1 max-w-sm text-xs text-muted-foreground">
            Save trails and merchandise you like, and they’ll show up here.
          </p>
          <Button variant="outline" size="sm" className="mt-6">
            Explore trails
          </Button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
            >
              {/* Image */}
              <div className="relative aspect-4/3 overflow-hidden bg-muted">
                <Image
                  src={item.image ?? ""}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />

                {/* Type badge */}
                <Badge
                  className="absolute left-3 top-3 text-[10px]"
                  variant="secondary"
                >
                  {item.type === "expedition" ? "Trail" : "Merch"}
                </Badge>
              </div>

              {/* Content */}
              <div className="space-y-3 p-4">
                <div>
                  <h3 className="font-semibold text-foreground line-clamp-1">
                    {item.title}
                  </h3>

                  {item.type === "expedition" ? (
                    <div className="mt-1.5 space-y-1">
                      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {item.location}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {item.duration}
                        </span>
                      </div>
                      {item.difficulty && (
                        <Badge variant="outline" className="mt-1 text-[10px]">
                          {item.difficulty}
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <div className="mt-1.5 space-y-1">
                      <p className="text-sm font-medium text-foreground">
                        {item.price != null && formatCurrency(item.price)}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {item.category}
                        </span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px]",
                            item.stock > 0
                              ? "border-emerald-500/30 text-emerald-700"
                              : "border-destructive/30 text-destructive",
                          )}
                        >
                          {item.stock > 0 ? "In stock" : "Out of stock"}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-muted-foreground">
                    Saved {formatDate(item.savedAt)}
                  </span>

                  <Button variant="outline" size="sm" className="h-8 gap-1.5">
                    {item.type === "expedition" ? (
                      <>
                        <ExternalLink className="h-3.5 w-3.5" />
                        View trail
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-3.5 w-3.5" />
                        View product
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
