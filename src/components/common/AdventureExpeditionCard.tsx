/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Adventure, Expedition } from "@/types/t.types";
import { Button } from "@/components/ui/button";
import { upperCaseFirstLetter } from "@/hooks/upperCaseFirstLetter";
import {
  Edit2,
  Eye,
  Hourglass,
  MapPin,
  Mountain,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdventure } from "@/hooks/adventures/deleteAdventure";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteExpedition } from "@/hooks/expedition/deleteExpedition";
import { cn } from "@/lib/utils";

interface AdventureExpeditionCardProps {
  isAdmin: boolean;
  adventure: Adventure;
  expedition?: Expedition;
  isAdventure: boolean;
}

const AdventureExpeditionCard = ({
  isAdmin,
  adventure,
  expedition,
  isAdventure,
}: AdventureExpeditionCardProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteExpeditionMutation = useMutation({
    mutationFn: (expeditionId: string) => deleteExpedition(expeditionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expeditions"] });
      toast.success("Expedition deleted");
    },
    onError: (error: any) => toast.error(error.message || "Failed to delete"),
  });

  const deleteAdventureMutation = useMutation({
    mutationFn: deleteAdventure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adventures"] });
      toast.success("Adventure deleted");
    },
    onError: (error: any) => toast.error(error.message || "Failed to delete"),
  });

  const capacity = adventure.defaultCapacity;
  const slotsLeft = expedition?.slotsLeft ?? 0;
  const availabilityPercentage = capacity > 0 ? slotsLeft / capacity : 0;

  const getAvailabilityStyles = () => {
    if (availabilityPercentage < 0.3) {
      return "bg-destructive/15 text-destructive border-destructive/30";
    }
    if (availabilityPercentage < 0.6) {
      return "bg-warning/15 text-warning border-warning/30";
    }
    return "bg-success/15 text-success border-success/30";
  };

  const title = isAdventure ? adventure.title : expedition!.expeditionTitle;
  const isClosed =
    expedition?.expeditionStatus === "cancelled" ||
    expedition?.expeditionStatus === "completed";

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden border-border/60 pt-0 transition-all duration-300 hover:shadow-lg hover:border-border">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={adventure.coverImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Soft gradient for better badge readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            {upperCaseFirstLetter(adventure.difficulty)}
          </span>

          {!isAdventure && !isClosed && (
            <span
              className={cn(
                "rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-md",
                getAvailabilityStyles(),
              )}
            >
              {slotsLeft} / {capacity} left
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <h3 className="text-base font-semibold leading-snug text-foreground line-clamp-2">
            {title}
          </h3>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1">{adventure.location}</span>
          </div>
        </div>

        {/* Stats - only for Adventures */}
        {isAdventure && (
          <>
            <Separator className="bg-border/60" />
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="space-y-1">
                <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Duration
                </p>
                <div className="flex items-center justify-center gap-1 text-sm font-semibold text-foreground">
                  <Hourglass className="h-3.5 w-3.5" />
                  <span>{adventure.duration}d</span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Elevation
                </p>
                <div className="flex items-center justify-center gap-1 text-sm font-semibold text-foreground">
                  <Mountain className="h-3.5 w-3.5" />
                  <span>{adventure.elevationGain}m</span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Capacity
                </p>
                <div className="flex items-center justify-center gap-1 text-sm font-semibold text-foreground">
                  <Users className="h-3.5 w-3.5" />
                  <span>{adventure.defaultCapacity}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>

      {/* Footer */}
      <CardFooter className="mt-auto flex items-center justify-between gap-3 border-t border-border/40 bg-muted/20 px-5 py-4">
        <div>
          <p className="text-xs text-muted-foreground">From</p>
          <p className="text-base font-bold text-foreground">
            KES {adventure.defaultPrice.toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Admin Actions */}
          {isAdmin && (
            <TooltipProvider>
              {isAdventure && (
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={() =>
                        router.push(
                          `/admin/expeditions/create/${adventure.id}/new`,
                        )
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Create Expedition</TooltipContent>
                </Tooltip>
              )}

              <Tooltip>
                <TooltipTrigger>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() =>
                      router.push(
                        isAdventure
                          ? `/admin/adventures/${adventure.id}`
                          : `/admin/expeditions/${expedition?.id}/details`,
                      )
                    }
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View Details</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() =>
                      router.push(
                        isAdventure
                          ? `/admin/adventures/${adventure.id}/edit`
                          : `/admin/expeditions/${expedition?.id}/edit`,
                      )
                    }
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Edit {isAdventure ? "Adventure" : "Expedition"}
                </TooltipContent>
              </Tooltip>

              <AlertDialog>
                <Tooltip>
                  <TooltipTrigger>
                    <AlertDialogTrigger>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Delete</TooltipContent>
                </Tooltip>

                <AlertDialogContent>
                  <AlertDialogTitle>
                    Delete this {isAdventure ? "Adventure" : "Expedition"}?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. All related data will be
                    permanently removed.
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={() => {
                        if (isAdventure) {
                          deleteAdventureMutation.mutate(adventure.id);
                        } else if (expedition?.id) {
                          deleteExpeditionMutation.mutate(expedition.id);
                        }
                      }}
                    >
                      {deleteAdventureMutation.isPending ||
                      deleteExpeditionMutation.isPending
                        ? "Deleting..."
                        : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TooltipProvider>
          )}

          {/* User Actions */}
          {!isAdmin && (
            <>
              {!isAdventure && !isClosed && (
                <Button
                  size="sm"
                  onClick={() => router.push(`/booking/${expedition?.id}/book`)}
                >
                  Join
                </Button>
              )}

              {!isAdventure && isClosed && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => router.push(`/booking/${expedition?.id}/book`)}
                >
                  Gallery
                </Button>
              )}

              <Button
                size="sm"
                variant={isAdventure ? "default" : "outline"}
                onClick={() =>
                  router.push(
                    isAdventure
                      ? `/adventures/${adventure.id}`
                      : `/expeditions/${expedition?.id}`,
                  )
                }
              >
                Details
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AdventureExpeditionCard;
