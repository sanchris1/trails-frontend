/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFetchAdventureDetails } from "@/hooks/adventures/fetchAdventureQuery";
import BackButton from "./BackButton";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import {
  BookCheck,
  CalendarCheck,
  Calendars,
  ChartBar,
  ChevronsLeftRightEllipsis,
  CircleDollarSign,
  ClipboardClock,
  Clock,
  Contact,
  Edit,
  MapPin,
  Mountain,
  TimerReset,
  Trash,
  TrendingUp,
  User,
  Users2,
  WavesArrowUp,
} from "lucide-react";
import Image from "next/image";
import { upperCaseFirstLetter } from "@/hooks/upperCaseFirstLetter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteAdventure } from "@/hooks/adventures/deleteAdventure";
import { useRouter } from "next/navigation";
import { Expedition } from "@/types/t.types";
import {
  getBetterDateFormat,
  getBetterTimeFormat,
} from "@/hooks/getBetterTimeFormat";
import { deleteExpedition } from "@/hooks/expedition/deleteExpedition";

interface AdventureExpeditionDetailsPageProps {
  isAdventure: boolean;
  isAdmin: boolean;
  id: string;
  expedition?: Expedition;
}

interface InfoCardProps {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}

const InfoCard = ({ icon: Icon, label, value }: InfoCardProps) => {
  return (
    <Card className="h-full transition-shadow hover:shadow-sm">
      <CardContent className="flex items-center gap-4 p-4 sm:p-5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <Icon className="size-5" />
        </div>

        <div className="min-w-0 space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>

          <p className="truncate text-sm font-semibold text-foreground sm:text-base">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const SectionHeader = ({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
        <Icon className="size-5" />
      </div>

      <div>
        <h2 className="text-base font-semibold sm:text-lg">{title}</h2>
      </div>
    </div>
  );
};

const AdventureExpeditionDetailsPage = ({
  id: adventureId,
  isAdmin,
  isAdventure,
  expedition,
}: AdventureExpeditionDetailsPageProps) => {
  const { data } = useFetchAdventureDetails(adventureId);

  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteAdventureMutation = useMutation({
    mutationFn: deleteAdventure,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adventures"],
      });

      router.push("/admin/adventures");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const deleteExpeditionMutation = useMutation({
    mutationFn: (expeditionId: string) => deleteExpedition(expeditionId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expeditions"],
      });
    },

    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const currentExpedition = !isAdventure ? expedition : undefined;

  if (!data) {
    return null;
  }

  if (!isAdventure && !currentExpedition) {
    return null;
  }

  const capacity = data.defaultCapacity;
  const slotsLeft = expedition?.slotsLeft ?? 0;

  const availabilityPercentage = capacity ? slotsLeft / capacity : 0;

  const availabilityVariant =
    availabilityPercentage < 0.3
      ? "destructive"
      : availabilityPercentage < 0.6
        ? "secondary"
        : "outline";

  if (deleteExpeditionMutation.isSuccess) {
    router.push("/admin/expeditions");
  }

  const category = data.category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const handleDelete = () => {
    if (isAdventure) {
      deleteAdventureMutation.mutate(data.id);
      return;
    }

    if (expedition?.id) {
      deleteExpeditionMutation.mutate(expedition.id);
    }
  };

  const handleEdit = () => {
    router.push(
      isAdventure
        ? `/admin/adventures/${data.id}/edit`
        : `/admin/expeditions/${expedition?.id}/edit`,
    );
  };

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 pb-10 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <BackButton />

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-lg font-bold tracking-tight sm:text-xl">
                {data.title}
              </h1>

              <Badge
                variant={data.isActive ? "secondary" : "destructive"}
                className="shrink-0"
              >
                {data.isActive ? "Active" : "Not active"}
              </Badge>
            </div>

            <p className="mt-1 truncate text-xs text-muted-foreground sm:text-sm">
              ID: {data.id}
            </p>
          </div>
        </div>

        {isAdmin && (
          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
            <Button variant="outline" onClick={handleEdit} className="gap-2">
              <Edit className="size-4" />
              <span>Edit</span>
            </Button>

            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={
                deleteAdventureMutation.isPending ||
                deleteExpeditionMutation.isPending
              }
              className="gap-2"
            >
              <Trash className="size-4" />
              <span>
                {deleteAdventureMutation.isPending ||
                deleteExpeditionMutation.isPending
                  ? "Deleting..."
                  : "Delete"}
              </span>
            </Button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative isolate overflow-hidden rounded-2xl border bg-muted shadow-sm">
        <div className="relative aspect-[4/3] min-h-[360px] w-full sm:aspect-[16/8] lg:aspect-[16/7]">
          <Image
            src={data.coverImage}
            alt={data.title}
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1200px"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/5" />

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
            <div className="max-w-4xl space-y-4">
              {/* Hero badges */}
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="border-white/20 bg-black/30 text-white backdrop-blur-md"
                >
                  <Mountain className="mr-1.5 size-4" />
                  {category}
                </Badge>

                <Badge
                  variant="secondary"
                  className="border-white/20 bg-black/30 text-white backdrop-blur-md"
                >
                  <TrendingUp className="mr-1.5 size-4" />
                  {upperCaseFirstLetter(data.difficulty)}
                </Badge>

                <Badge
                  variant="secondary"
                  className="border-white/20 bg-black/30 text-white backdrop-blur-md"
                >
                  <MapPin className="mr-1.5 size-4" />
                  {data.location}
                </Badge>

                {!isAdventure && (
                  <Badge
                    variant={availabilityVariant}
                    className="backdrop-blur-md"
                  >
                    {slotsLeft} / {data.defaultCapacity} slots available
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                <p className="flex items-center gap-2 text-sm font-medium text-white/80">
                  <MapPin className="size-4" />
                  {data.location}
                </p>

                <p className="max-w-3xl text-sm leading-6 text-white/85 sm:text-base">
                  {data.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core information */}
      <section className="space-y-4">
        <SectionHeader icon={ChartBar} title="Adventure Overview" />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard
            icon={CircleDollarSign}
            label="Price"
            value={`Ksh ${data.defaultPrice.toLocaleString()}`}
          />

          <InfoCard
            icon={Clock}
            label="Duration"
            value={`${data.duration} Day(s)`}
          />

          <InfoCard
            icon={Users2}
            label="Capacity"
            value={`${data.defaultCapacity} people`}
          />

          <InfoCard
            icon={WavesArrowUp}
            label="Elevation"
            value={`${data.elevationGain} meters`}
          />
        </div>
      </section>

      {/* Expedition information */}
      {!isAdventure && expedition && (
        <>
          <section className="space-y-4">
            <SectionHeader icon={CalendarCheck} title="Expedition Schedule" />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {currentExpedition?.departureDate && (
                <InfoCard
                  icon={Calendars}
                  label="Departure date"
                  value={getBetterDateFormat(currentExpedition.departureDate)}
                />
              )}

              <InfoCard
                icon={ClipboardClock}
                label="Departure time"
                value={getBetterTimeFormat(expedition.departureTime)}
              />

              <InfoCard
                icon={CalendarCheck}
                label="Return date"
                value={getBetterDateFormat(expedition.returnDate)}
              />

              {expedition.returnTime && (
                <InfoCard
                  icon={TimerReset}
                  label="Return time"
                  value={getBetterTimeFormat(expedition.returnTime)}
                />
              )}
            </div>
          </section>

          <section className="space-y-4">
            <SectionHeader icon={Users2} title="Expedition Details" />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <InfoCard
                icon={User}
                label="In-charge"
                value={expedition.guide}
              />

              <InfoCard
                icon={Contact}
                label="Contact"
                value={expedition.guideContact}
              />

              <InfoCard
                icon={BookCheck}
                label="Booked participants"
                value={`${expedition.bookedParticipants} people`}
              />

              <InfoCard
                icon={ChevronsLeftRightEllipsis}
                label="Slots left"
                value={`${expedition.slotsLeft} slots`}
              />
            </div>
          </section>
        </>
      )}

      {/* Description */}
      <section className="space-y-4">
        <SectionHeader icon={ChartBar} title="Full Description" />

        <Card>
          <CardContent className="p-5 sm:p-6 lg:p-8">
            <p className="max-w-4xl whitespace-pre-line text-sm leading-7 text-muted-foreground sm:text-base">
              {data.description}
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default AdventureExpeditionDetailsPage;
