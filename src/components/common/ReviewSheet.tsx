/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Image from "next/image";
import { Check, ImagePlus, Loader2, Star } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

export type ReviewTarget = {
  id: string;
  title: string;
  image?: string | null;
  type: "product" | "expedition";
  subtitle?: string;
};

type ReviewDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  target: ReviewTarget | null;
  onSubmit?: (review: {
    targetId: string;
    rating: number;
    title: string;
    comment: string;
  }) => void | Promise<void>;
};

const MAX_CHARACTERS = 1000;
const MIN_CHARACTERS = 10;

const ratingLabels = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

export function ReviewDrawer({
  open,
  onOpenChange,
  target,
  onSubmit,
}: ReviewDrawerProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setRating(0);
      setHoverRating(0);
      setTitle("");
      setComment("");
      setError("");
      setPending(false);
    }
  }, [open, target?.id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!target) return;

    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }

    if (comment.trim().length < MIN_CHARACTERS) {
      setError("Your review must be at least 10 characters.");
      return;
    }

    if (comment.length > MAX_CHARACTERS) {
      setError("Your review is too long.");
      return;
    }

    if (!onSubmit) {
      setError("Review submission is not connected yet.");
      return;
    }

    try {
      setPending(true);

      await onSubmit({
        targetId: target.id,
        rating,
        title: title.trim(),
        comment: comment.trim(),
      });

      onOpenChange(false);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  };

  if (!target) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 overflow-hidden border-l border-border bg-background p-0 sm:max-w-lg"
      >
        <SheetHeader className="shrink-0 border-b border-border px-5 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Star className="size-5" />
            </div>

            <div className="min-w-0 flex-1">
              <SheetTitle className="text-xl font-semibold tracking-tight">
                Write a review
              </SheetTitle>
              <SheetDescription className="mt-1">
                Share your experience with the community.
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6 sm:px-6">
            {/* Review target */}
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                {target.image ? (
                  <Image
                    src={target.image}
                    alt={target.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <ImagePlus className="size-6 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <Badge variant="secondary" className="mb-1 text-xs">
                  {target.type === "product" ? "Product" : "Expedition"}
                </Badge>

                <h3 className="truncate text-sm font-semibold">
                  {target.title}
                </h3>

                {target.subtitle && (
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {target.subtitle}
                  </p>
                )}
              </div>

              <Check className="size-5 shrink-0 text-primary" />
            </div>

            {/* Rating */}
            <section className="space-y-3 text-center">
              <div>
                <h3 className="font-semibold">How was your experience?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your feedback helps others make better decisions.
                </p>
              </div>

              <div
                className="flex items-center justify-center gap-2"
                role="radiogroup"
                aria-label="Star rating"
                onMouseLeave={() => setHoverRating(0)}
              >
                {[1, 2, 3, 4, 5].map((value) => {
                  const active = value <= (hoverRating || rating);

                  return (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={rating === value}
                      aria-label={`${value} star${value > 1 ? "s" : ""}`}
                      onClick={() => setRating(value)}
                      onMouseEnter={() => setHoverRating(value)}
                      onFocus={() => setHoverRating(value)}
                      onBlur={() => setHoverRating(0)}
                      className="rounded-lg p-1.5 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Star
                        className={`size-8 transition-colors sm:size-9 ${
                          active
                            ? "fill-accent text-accent"
                            : "fill-transparent text-muted-foreground/30"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <p className="h-5 text-sm font-medium text-primary">
                {ratingLabels[hoverRating || rating] || "Select your rating"}
              </p>
            </section>

            <Separator />

            {/* Review title */}
            <section className="space-y-2">
              <label htmlFor="review-title" className="text-sm font-medium">
                Give your review a title
                <span className="ml-1 text-muted-foreground">(optional)</span>
              </label>

              <Input
                id="review-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="What stood out to you?"
                maxLength={100}
                disabled={pending}
                className="h-11 bg-card"
              />
            </section>

            {/* Review comment */}
            <section className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="review-comment" className="text-sm font-medium">
                  Your review
                </label>

                <span
                  className={`text-xs ${
                    comment.length > MAX_CHARACTERS
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }`}
                >
                  {comment.length}/{MAX_CHARACTERS}
                </span>
              </div>

              <Textarea
                id="review-comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Tell us what you liked, what could be better, and whether you'd recommend it..."
                rows={5}
                maxLength={MAX_CHARACTERS}
                disabled={pending}
                className="min-h-32 resize-y bg-card leading-relaxed"
              />

              <p className="text-xs text-muted-foreground">
                Keep it helpful, honest, and respectful.
              </p>
            </section>

            {error && (
              <div
                role="alert"
                className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive"
              >
                {error}
              </div>
            )}
          </div>

          {/* Sticky footer */}
          <div className="shrink-0 border-t border-border bg-background px-5 py-4 sm:px-6">
            <Button
              type="submit"
              disabled={pending}
              className="h-11 w-full gap-2 font-medium shadow-sm"
            >
              {pending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Submitting review...
                </>
              ) : (
                <>
                  Submit review
                  <Check className="size-4" />
                </>
              )}
            </Button>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              Your honest feedback makes our community better.
            </p>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
