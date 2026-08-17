"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Adventure, Expedition } from "@/types/t.types";
import { Button } from "../ui/button";
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
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdventure } from "@/hooks/adventures/deleteAdventure";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteExpedition } from "@/hooks/expedition/deleteExpedition";

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
  const deleteExpeditionMutation = useMutation({
    mutationFn: (expeditionId: string) => deleteExpedition(expeditionId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expeditions"],
      });
    },
  });
  const deleteAdventureMutation = useMutation({
    mutationFn: deleteAdventure,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adventures"],
      });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const router = useRouter();

  const capacity = adventure.defaultCapacity;
  const slotsLeft = expedition?.slotsLeft ?? 0;

  const availabilityPercentage = slotsLeft / capacity;

  const availabilityClass =
    availabilityPercentage < 0.3
      ? "text-red-500 bg-destructive"
      : availabilityPercentage < 0.6
        ? "text-yellow-500 bg-secondary/50"
        : "text-green-500 bg-white/80";

  return (
    <Card className=" pt-0 flex h-full flex-col">
      <div className="aspect-4/3 overflow-hidden relative ">
        <Image
          src={adventure.coverImage}
          alt={adventure.title}
          fill
          className=""
        />
        <div className="absolute  top-2 inset-x-0 mx-2 flex items-center justify-between">
          <span className="bg-secondary/50 backdrop-blur-3xl py-1 text-xs font-semibold  px-3 rounded-xl text-white ">
            {upperCaseFirstLetter(adventure.difficulty)}
          </span>
          {!isAdventure && (
            <span
              className={`${availabilityClass} text-xs font-semibold px-3 py-1 rounded-full border`}
            >
              {expedition?.slotsLeft}/{adventure.defaultCapacity}
            </span>
          )}
        </div>
      </div>
      <CardContent className="space-y-2 flex flex-1 flex-col">
        <CardHeader className="space-y-2">
          <h4 className="text-[14px] font-semibold text-accent line-clamp-2">
            {adventure.title}
          </h4>
          <span className="flex items-start text-xs text-secondary font-medium gap-3 line-clamp-2">
            <MapPin size={20} /> <span className="">{adventure.location}</span>
          </span>
        </CardHeader>
        {isAdventure && <Separator />}
        {isAdventure && (
          <div className="flex items-center justify-between ">
            <div className="">
              <span className="text-[10px] text-secondary font-medium">
                Duration
              </span>
              <div className="flex items-center gap-1.5 text-foreground text-[13px] font-semibold">
                <Hourglass className="size-3" />{" "}
                <span className="">{adventure.duration} Day(s)</span>
              </div>
            </div>
            <div className="">
              <span className="text-[10px] text-secondary font-medium">
                Elevation
              </span>
              <div className="flex items-center gap-1.5 text-foreground text-[13px] font-semibold">
                <Mountain className="size-3" />{" "}
                <span className="">{adventure.elevationGain} M</span>
              </div>
            </div>
            <div className="">
              <span className="text-[10px] text-secondary font-medium">
                Capacity
              </span>
              <div className="flex items-center gap-1.5 text-foreground text-[13px] font-semibold">
                <Users className="size-3" />{" "}
                <span className="">{adventure.defaultCapacity}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-auto flex items-center justify-between">
        <div>
          <span className="text-secondary">Price</span>
          <p className="font-semibold">
            KSH: {adventure.defaultPrice.toLocaleString()}
          </p>
        </div>

        {isAdmin && isAdventure && (
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(`/admin/expeditions/create/${adventure.id}/new`)
                  }
                >
                  <Plus />
                </Button>
              }
            />
            <TooltipContent>Create Expedition</TooltipContent>
          </Tooltip>
        )}

        {isAdmin && (
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(
                      isAdventure
                        ? `/admin/adventures/${adventure.id}`
                        : `/admin/expeditions/${expedition?.id}/details`,
                    )
                  }
                >
                  <Eye />
                </Button>
              }
            />
            <TooltipContent>View Details</TooltipContent>
          </Tooltip>
        )}

        {isAdmin && (
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(
                      isAdventure
                        ? `/admin/adventures/${adventure.id}/edit`
                        : `/admin/expeditions/${expedition?.id}/edit`,
                    )
                  }
                >
                  <Edit2 />
                </Button>
              }
            />
            <TooltipContent>
              Edit {isAdventure ? "adventure" : "expedition"}
            </TooltipContent>
          </Tooltip>
        )}

        {isAdmin && (
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button variant="destructive">
                  <Trash2 />
                </Button>
              }
            />
            <AlertDialogContent>
              <AlertDialogTitle>
                Are you sure you want to delete the{" "}
                {isAdventure ? "Adventure" : "Expedition"}?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Please cancel if you are not sure.
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
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
        )}
        {!isAdmin && !isAdventure && (
          <Button
            onClick={() => router.push(`/booking/${expedition?.id}/book`)}
          >
            Join
          </Button>
        )}

        {!isAdmin && (
          <Button
            className="bg-accent cursor-pointer"
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
        )}
      </CardFooter>
    </Card>
  );
};

export default AdventureExpeditionCard;
