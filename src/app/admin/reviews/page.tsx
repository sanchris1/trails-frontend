"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Star,
  MoreHorizontal,
  Eye,
  EyeOff,
  Trash2,
  Check,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type ReviewStatus = "published" | "pending" | "hidden";
type ReviewTarget = "trail" | "merchandise";

interface Review {
  id: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  comment: string;
  targetType: ReviewTarget;
  targetName: string;
  status: ReviewStatus;
  createdAt: string;
}

const mockReviews: Review[] = [
  {
    id: "RV-201",
    customerName: "Grace Akinyi",
    customerEmail: "grace@email.com",
    rating: 5,
    comment:
      "Amazing sunrise hike on Ngong Hills. The guides were professional and the views were unforgettable.",
    targetType: "trail",
    targetName: "Ngong Hills Sunrise Hike",
    status: "published",
    createdAt: "2026-09-14T09:20:00Z",
  },
  {
    id: "RV-202",
    customerName: "James Mwangi",
    customerEmail: "james@email.com",
    rating: 4,
    comment:
      "Great quality hoodie. Fits well and the print hasn't faded after washing.",
    targetType: "merchandise",
    targetName: "Mara Expedition Heavyweight Hoodie",
    status: "published",
    createdAt: "2026-09-13T16:45:00Z",
  },
  {
    id: "RV-203",
    customerName: "Sarah Wanjiku",
    customerEmail: "sarah@email.com",
    rating: 5,
    comment:
      "Longonot was tough but worth every step. Organization was excellent from start to finish.",
    targetType: "trail",
    targetName: "Mount Longonot Day Hike",
    status: "pending",
    createdAt: "2026-09-16T11:10:00Z",
  },
  {
    id: "RV-204",
    customerName: "David Otieno",
    customerEmail: "david@email.com",
    rating: 2,
    comment: "The trail was overcrowded and we started later than scheduled.",
    targetType: "trail",
    targetName: "Hell's Gate Walking Safari",
    status: "pending",
    createdAt: "2026-09-15T14:30:00Z",
  },
  {
    id: "RV-205",
    customerName: "Mary Njeri",
    customerEmail: "mary@email.com",
    rating: 5,
    comment: "Love the sticker pack. Perfect for my water bottle and laptop.",
    targetType: "merchandise",
    targetName: "Trail Icon Sticker Pack",
    status: "published",
    createdAt: "2026-09-12T08:55:00Z",
  },
  {
    id: "RV-206",
    customerName: "Peter Kamau",
    customerEmail: "peter@email.com",
    rating: 3,
    comment:
      "Decent experience but expected more guidance on the harder sections.",
    targetType: "trail",
    targetName: "Aberdare Weekend Trek",
    status: "hidden",
    createdAt: "2026-09-10T19:00:00Z",
  },
];

const statusConfig: Record<ReviewStatus, { label: string; className: string }> =
  {
    published: {
      label: "Published",
      className: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
    },
    pending: {
      label: "Pending",
      className: "bg-amber-500/10 text-amber-700 border-amber-500/20",
    },
    hidden: {
      label: "Hidden",
      className: "bg-muted text-muted-foreground border-border",
    },
  };

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/40",
          )}
        />
      ))}
    </div>
  );
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ReviewStatus>("all");
  const [typeFilter, setTypeFilter] = useState<"all" | ReviewTarget>("all");

  const filtered = reviews.filter((review) => {
    const matchesSearch =
      review.customerName.toLowerCase().includes(search.toLowerCase()) ||
      review.targetName.toLowerCase().includes(search.toLowerCase()) ||
      review.comment.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || review.status === statusFilter;

    const matchesType =
      typeFilter === "all" || review.targetType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: reviews.length,
    pending: reviews.filter((r) => r.status === "pending").length,
    published: reviews.filter((r) => r.status === "published").length,
    average:
      reviews.length > 0
        ? (
            reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          ).toFixed(1)
        : "0.0",
  };

  const updateStatus = (id: string, status: ReviewStatus) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Reviews
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Moderate customer reviews for trails and merchandise.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">Total</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">
            {stats.total}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">Pending</p>
          <p className="mt-1 text-2xl font-semibold text-amber-600">
            {stats.pending}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">Published</p>
          <p className="mt-1 text-2xl font-semibold text-emerald-600">
            {stats.published}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">
            Avg. rating
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-2xl font-semibold text-foreground">
            {stats.average}
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search reviews, customers, or products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-3">
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as "all" | ReviewStatus)}
          >
            <SelectTrigger className="w-35">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="hidden">Hidden</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={typeFilter}
            onValueChange={(v) => setTypeFilter(v as "all" | ReviewTarget)}
          >
            <SelectTrigger className="w-37.5">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="trail">Trails</SelectItem>
              <SelectItem value="merchandise">Merchandise</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 text-center">
            <Star className="mb-3 h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm font-medium text-foreground">
              No reviews found
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          filtered.map((review) => (
            <div
              key={review.id}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:bg-muted/20"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1 space-y-2">
                  {/* Top row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <StarRating rating={review.rating} />
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] font-medium",
                        statusConfig[review.status].className,
                      )}
                    >
                      {statusConfig[review.status].label}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px]">
                      {review.targetType === "trail" ? "Trail" : "Merch"}
                    </Badge>
                  </div>

                  {/* Comment */}
                  <p className="text-sm text-foreground leading-relaxed">
                    {review.comment}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {review.customerName}
                    </span>
                    <span>·</span>
                    <span>{review.targetName}</span>
                    <span>·</span>
                    <span>{formatDate(review.createdAt)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-1">
                  {review.status === "pending" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5 h-8"
                      onClick={() => updateStatus(review.id, "published")}
                    >
                      <Check className="h-3.5 w-3.5" />
                      Approve
                    </Button>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {review.status !== "published" && (
                        <DropdownMenuItem
                          className="gap-2"
                          onClick={() => updateStatus(review.id, "published")}
                        >
                          <Eye className="h-4 w-4" />
                          Publish
                        </DropdownMenuItem>
                      )}
                      {review.status !== "hidden" && (
                        <DropdownMenuItem
                          className="gap-2"
                          onClick={() => updateStatus(review.id, "hidden")}
                        >
                          <EyeOff className="h-4 w-4" />
                          Hide
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="gap-2 text-destructive"
                        onClick={() => deleteReview(review.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
