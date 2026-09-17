"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MapPin,
  Calendar,
  Star,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type FavoriteType = "trail" | "merchandise";

interface FavoriteItem {
  id: string;
  type: FavoriteType;
  name: string;
  image: string;
  // Trail fields
  location?: string;
  duration?: string;
  difficulty?: string;
  rating?: number;
  // Merch fields
  price?: number;
  category?: string;
  inStock?: boolean;
  savedAt: string;
}

const mockFavorites: FavoriteItem[] = [
  {
    id: "fav-1",
    type: "trail",
    name: "Mount Longonot Day Hike",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400",
    location: "Naivasha",
    duration: "6–7 hours",
    difficulty: "Moderate",
    rating: 4.8,
    savedAt: "2026-09-10T12:00:00Z",
  },
  {
    id: "fav-2",
    type: "merchandise",
    name: "Mara Expedition Heavyweight Tee",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    price: 6500,
    category: "Apparel",
    inStock: true,
    savedAt: "2026-09-12T09:30:00Z",
  },
  {
    id: "fav-3",
    type: "trail",
    name: "Ngong Hills Sunrise Hike",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400",
    location: "Kajiado",
    duration: "4–5 hours",
    difficulty: "Easy–Moderate",
    rating: 4.9,
    savedAt: "2026-09-08T15:20:00Z",
  },
  {
    id: "fav-4",
    type: "merchandise",
    name: "Trail Icon Sticker Pack",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400",
    price: 1200,
    category: "Accessories",
    inStock: true,
    savedAt: "2026-09-14T11:00:00Z",
  },
  {
    id: "fav-5",
    type: "trail",
    name: "Aberdare Weekend Trek",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    location: "Nyeri",
    duration: "2 days",
    difficulty: "Challenging",
    rating: 4.7,
    savedAt: "2026-09-05T08:45:00Z",
  },
  {
    id: "fav-6",
    type: "merchandise",
    name: "Summit Fleece Hoodie",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
    price: 9800,
    category: "Apparel",
    inStock: false,
    savedAt: "2026-09-11T17:10:00Z",
  },
];

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
  const [favorites, setFavorites] = useState<FavoriteItem[]>(mockFavorites);
  const [filter, setFilter] = useState<"all" | FavoriteType>("all");

  const filtered =
    filter === "all"
      ? favorites
      : favorites.filter((item) => item.type === filter);

  const trailCount = favorites.filter((f) => f.type === "trail").length;
  const merchCount = favorites.filter((f) => f.type === "merchandise").length;

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

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
          All ({favorites.length})
        </Button>
        <Button
          variant={filter === "trail" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("trail")}
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
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />

                {/* Type badge */}
                <Badge
                  className="absolute left-3 top-3 text-[10px]"
                  variant="secondary"
                >
                  {item.type === "trail" ? "Trail" : "Merch"}
                </Badge>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeFavorite(item.id)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-destructive shadow-sm backdrop-blur transition-opacity hover:bg-background"
                  title="Remove from favorites"
                >
                  <Heart className="h-4 w-4 fill-current" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-3 p-4">
                <div>
                  <h3 className="font-semibold text-foreground line-clamp-1">
                    {item.name}
                  </h3>

                  {item.type === "trail" ? (
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
                        {item.rating && (
                          <span className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            {item.rating}
                          </span>
                        )}
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
                            item.inStock
                              ? "border-emerald-500/30 text-emerald-700"
                              : "border-destructive/30 text-destructive",
                          )}
                        >
                          {item.inStock ? "In stock" : "Out of stock"}
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
                    {item.type === "trail" ? (
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
