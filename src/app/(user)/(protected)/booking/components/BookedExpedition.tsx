/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import FetchingProductsPage from "@/components/common/FetchingProductsPage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Info,
  MapPin,
  Minus,
  Mountain,
  Plus,
  ShieldCheck,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BookedExpeditionProps {
  total: number;
  isBooked: boolean;
  isLoading: boolean;
  expedition: any;
  onContinue: () => void;
  participantsCount: number;
  setParticipantsCount: (count: number) => void;
  setCurrentStep: (step: number) => void;
}

const BookedExpedition = ({
  total,
  isBooked,
  expedition,
  isLoading,
  onContinue,
  participantsCount,
  setParticipantsCount,
  setCurrentStep,
}: BookedExpeditionProps) => {
  const maxParticipants = expedition?.slotsLeft ?? 1;

  const increaseParticipants = () => {
    if (participantsCount < maxParticipants) {
      setParticipantsCount(participantsCount + 1);
    }
  };

  const decreaseParticipants = () => {
    if (participantsCount > 1) {
      setParticipantsCount(participantsCount - 1);
    }
  };

  if (isLoading) return <FetchingProductsPage />;

  if (!expedition) return null;

  return (
    <section className="py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8">
          <Link
            href="/expeditions"
            className="mb-5 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to expeditions
          </Link>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Booking Details
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Confirm your expedition details and select the number of
            participants for the {expedition.expeditionTitle}.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)] lg:items-start">
          {/* Left Column */}
          <div className="space-y-5">
            <Card className="overflow-hidden border-border/70 shadow-sm pt-0">
              {/* Hero Image */}
              <div className="relative aspect-16/8 overflow-hidden bg-muted sm:aspect-16/7">
                <Image
                  fill
                  src={expedition.adventure.coverImage}
                  alt={expedition.expeditionTitle}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                {/* Badges */}
                <div className="absolute left-3 top-3 flex flex-wrap gap-2 sm:left-4 sm:top-4">
                  <span className="rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-foreground backdrop-blur">
                    {expedition.adventure.category}
                  </span>

                  <span className="rounded-full bg-destructive px-2.5 py-1 text-[10px] font-semibold tracking-wide text-destructive-foreground">
                    {expedition.adventure.difficulty}
                  </span>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {expedition.expeditionTitle}
                  </h2>

                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-white/85">
                    <MapPin className="h-3.5 w-3.5" />
                    {expedition.adventure.location}
                  </div>
                </div>
              </div>

              <CardContent className="p-4 sm:p-5">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <StatCard
                    icon={<CalendarDays className="h-4 w-4" />}
                    label="DURATION"
                    value={`${expedition.adventure.duration} Day${expedition.adventure.duration > 1 ? "s" : ""}`}
                  />

                  {expedition.adventure.elevationGain && (
                    <StatCard
                      icon={<Mountain className="h-4 w-4" />}
                      label="ELEVATION"
                      value={`${expedition.adventure.elevationGain} m`}
                    />
                  )}
                </div>

                {/* Guide */}
                <div className="mt-5 flex items-center gap-3 rounded-xl border bg-muted/30 p-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mountain className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Guided by</p>
                    <p className="truncate text-sm font-semibold">
                      {expedition.guide}
                    </p>
                  </div>
                </div>

                {/* Details link */}
                <div className="mt-4 flex justify-end">
                  <Link
                    href={`/expeditions/${expedition.id}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    View full expedition details
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Important Information */}
            <div className="flex gap-3 rounded-xl border bg-muted/40 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Info className="h-4 w-4" />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {expedition.adventure.shortDescription}
              </p>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <Card className="border-border/70 shadow-sm lg:sticky lg:top-6">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="h-7 w-1 rounded-full bg-primary" />
                <h2 className="text-base font-semibold">Your Booking</h2>
              </div>

              <Separator className="my-5" />

              {/* Availability */}
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Check className="h-4 w-4" />
                Available ({expedition.slotsLeft} spots left)
              </div>

              {/* Participants Counter */}
              <div className="mt-6">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Participants
                </p>

                <div className="flex items-center justify-between rounded-xl border bg-muted/30 p-2">
                  <div className="flex items-center gap-3 pl-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {participantsCount}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      disabled={participantsCount <= 1}
                      onClick={decreaseParticipants}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      disabled={participantsCount >= maxParticipants}
                      onClick={increaseParticipants}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="mt-5 rounded-xl border bg-card p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Price per participant
                  </span>
                  <span className="font-semibold">
                    KES {expedition.adventure.defaultPrice.toLocaleString()}
                  </span>
                </div>

                <Separator className="my-3" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Total</span>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      KES {expedition.adventure.defaultPrice.toLocaleString()} ×{" "}
                      {participantsCount}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      KES {total.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <Button
                className="mt-5 h-11 w-full rounded-lg"
                size="lg"
                onClick={isBooked ? () => setCurrentStep(4) : onContinue}
              >
                Continue to {isBooked ? "Payment" : "Participants"}
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>

              {/* Security note */}
              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" />
                You won&apos;t be charged yet. Secure SSL encryption.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const StatCard = ({ icon, label, value }: StatCardProps) => {
  return (
    <div className="flex min-h-20 flex-col items-center justify-center rounded-xl bg-muted/40 px-2 py-3 text-center">
      <div className="text-primary">{icon}</div>
      <span className="mt-1.5 text-[10px] font-medium tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="mt-0.5 text-sm font-semibold">{value}</span>
    </div>
  );
};

export default BookedExpedition;
