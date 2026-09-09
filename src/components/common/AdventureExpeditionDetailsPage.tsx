/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFetchAdventureDetails } from "@/hooks/adventures/fetchAdventureQuery";
import BackButton from "./BackButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Calendar,
  Clock,
  DollarSign,
  Edit,
  MapPin,
  Mountain,
  Phone,
  Trash2,
  TrendingUp,
  User,
  Users,
  ArrowUpRight,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

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
  className?: string;
}

const InfoCard = ({ icon: Icon, label, value, className }: InfoCardProps) => {
  return (
    <Card
      className={cn(
        "h-full border-border/60 transition-all hover:shadow-md hover:border-border",
        className,
      )}
    >
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
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
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="text-lg font-semibold tracking-tight text-foreground">
        {title}
      </h2>
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
      queryClient.invalidateQueries({ queryKey: ["adventures"] });
      toast.success("Adventure deleted");
      router.push("/admin/adventures");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete adventure");
    },
  });

  const deleteExpeditionMutation = useMutation({
    mutationFn: (expeditionId: string) => deleteExpedition(expeditionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expeditions"] });
      toast.success("Expedition deleted");
      router.push("/admin/expeditions");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete expedition");
    },
  });

  if (!data) return null;
  if (!isAdventure && !expedition) return null;

  const capacity = data.defaultCapacity;
  const slotsLeft = expedition?.slotsLeft ?? 0;
  const availabilityPercentage = capacity ? slotsLeft / capacity : 0;

  const availabilityVariant =
    availabilityPercentage < 0.3
      ? "destructive"
      : availabilityPercentage < 0.6
        ? "secondary"
        : "outline";

  const category = data.category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const title = isAdventure ? data.title : expedition!.expeditionTitle;

  const handleEdit = () => {
    router.push(
      isAdventure
        ? `/admin/adventures/${data.id}/edit`
        : `/admin/expeditions/${expedition?.id}/edit`,
    );
  };

  const isDeleting =
    deleteAdventureMutation.isPending || deleteExpeditionMutation.isPending;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <BackButton />

          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {title}
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              ID: {data.id}
            </p>
          </div>
        </div>

        {isAdmin && (
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleEdit} className="gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </Button>

            <AlertDialog>
              <AlertDialogTrigger>
                <Button
                  variant="destructive"
                  className="gap-2"
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4" />
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Delete this {isAdventure ? "Adventure" : "Expedition"}?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. All related data will be
                    permanently removed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={() => {
                      if (isAdventure) {
                        deleteAdventureMutation.mutate(data.id);
                      } else if (expedition?.id) {
                        deleteExpeditionMutation.mutate(expedition.id);
                      }
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative isolate overflow-hidden rounded-2xl border border-border/60 shadow-sm">
        <div className="relative aspect-[16/10] min-h-[320px] w-full sm:aspect-[16/8] lg:aspect-[21/9]">
          <Image
            src={data.coverImage}
            alt={title}
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1200px"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
            <div className="max-w-3xl space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="border-white/20 bg-black/40 text-white backdrop-blur-md hover:bg-black/50">
                  <Mountain className="mr-1.5 h-3.5 w-3.5" />
                  {category}
                </Badge>

                <Badge className="border-white/20 bg-black/40 text-white backdrop-blur-md hover:bg-black/50">
                  <TrendingUp className="mr-1.5 h-3.5 w-3.5" />
                  {upperCaseFirstLetter(data.difficulty)}
                </Badge>

                <Badge className="border-white/20 bg-black/40 text-white backdrop-blur-md hover:bg-black/50">
                  <MapPin className="mr-1.5 h-3.5 w-3.5" />
                  {data.location}
                </Badge>

                {!isAdventure && (
                  <Badge
                    variant={availabilityVariant}
                    className="backdrop-blur-md"
                  >
                    {slotsLeft} / {data.defaultCapacity} slots left
                  </Badge>
                )}
              </div>

              <p className="max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
                {data.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="space-y-5">
        <SectionHeader icon={Mountain} title="Adventure Overview" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard
            icon={DollarSign}
            label="Price"
            value={`KES ${data.defaultPrice.toLocaleString()}`}
          />
          <InfoCard
            icon={Clock}
            label="Duration"
            value={`${data.duration} Day${Number(data.duration) > 1 ? "s" : ""}`}
          />
          <InfoCard
            icon={Users}
            label="Capacity"
            value={`${data.defaultCapacity} people`}
          />
          <InfoCard
            icon={ArrowUpRight}
            label="Elevation Gain"
            value={`${data.elevationGain} m`}
          />
        </div>
      </section>

      {/* Expedition specific sections */}
      {!isAdventure && expedition && (
        <>
          <section className="space-y-5">
            <SectionHeader icon={Calendar} title="Expedition Schedule" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {expedition.departureDate && (
                <InfoCard
                  icon={Calendar}
                  label="Departure Date"
                  value={getBetterDateFormat(expedition.departureDate)}
                />
              )}
              <InfoCard
                icon={Clock}
                label="Departure Time"
                value={getBetterTimeFormat(expedition.departureTime)}
              />
              <InfoCard
                icon={Calendar}
                label="Return Date"
                value={getBetterDateFormat(expedition.returnDate)}
              />
              {expedition.returnTime && (
                <InfoCard
                  icon={Clock}
                  label="Return Time"
                  value={getBetterTimeFormat(expedition.returnTime)}
                />
              )}
            </div>
          </section>

          <section className="space-y-5">
            <SectionHeader icon={Users} title="Expedition Details" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoCard
                icon={User}
                label="Guide / In-charge"
                value={expedition.guide}
              />
              <InfoCard
                icon={Phone}
                label="Contact"
                value={expedition.guideContact}
              />
              <InfoCard
                icon={Users}
                label="Booked Participants"
                value={`${expedition.bookedParticipants} people`}
              />
              <InfoCard
                icon={Users}
                label="Slots Left"
                value={`${expedition.slotsLeft} slots`}
              />
            </div>
          </section>
        </>
      )}

      {/* Full Description */}
      <section className="space-y-5">
        <SectionHeader icon={BookOpen} title="Full Description" />

        <Card className="border-border/60">
          <CardContent className="p-6 sm:p-8">
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
