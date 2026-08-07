"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Adventure } from "@/types/t.types";
import { Button } from "../ui/button";
import { upperCaseFirstLetter } from "@/hooks/upperCaseFirstLetter";
import {
  Edit2,
  Eye,
  Hourglass,
  MapPin,
  Mountain,
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

interface AdventureExpeditionCardProps {
  isAdmin: boolean;
  adventure: Adventure;
  isAdventure: boolean;
}

const AdventureExpeditionCard = ({
  isAdmin,
  adventure,
  isAdventure,
}: AdventureExpeditionCardProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
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

  return (
    <Card className=" pt-0 flex h-full flex-col">
      <div className="aspect-4/3 overflow-hidden relative ">
        <Image
          src={adventure.coverImage}
          alt={adventure.title}
          fill
          className=""
        />
        <div className="absolute  top-2 left-0 right-0 mx-2 flex items-center justify-between">
          <span className="bg-secondary/40 py-1 text-xs font-semibold  px-3 rounded-xl text-foreground">
            {upperCaseFirstLetter(adventure.difficulty)}
          </span>

          {!isAdventure && !isAdmin && <Button>fav</Button>}
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
        <Separator />
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
      </CardContent>
      <CardFooter className="flex items-center justify-between mt-auto">
        <div className="">
          <span className="">Price</span>
          <p className="">KSH: {adventure.defaultPrice.toLocaleString()}</p>
        </div>
        {!isAdmin ||
          (!isAdventure && <Button className="bg-accent">Book now</Button>)}

        {isAdmin && (
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant={"outline"}>
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
                  variant={"outline"}
                  onClick={() =>
                    router.push(`/admin/adventures/${adventure.id}/edit`)
                  }
                >
                  <Edit2 />
                </Button>
              }
            />
            <TooltipContent>Edit adventure</TooltipContent>
          </Tooltip>
        )}
        {isAdmin && (
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button variant={"destructive"}>
                  <Trash2 />
                </Button>
              }
            />
            <AlertDialogContent>
              <AlertDialogTitle>
                Are you sure you want to delete the Adventure?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action will delete the Adventure please cancel if not sure.
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant={"destructive"}
                  onClick={() => deleteMutation.mutate(adventure.id)}
                >
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>
    </Card>
  );
};

export default AdventureExpeditionCard;
