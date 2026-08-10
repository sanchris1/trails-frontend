/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFetchAdventureDetails } from "@/hooks/adventures/fetchAdventureQuery";
import BackButton from "./BackButton";
import { Button } from "../ui/button";
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

const AdventureExpeditionDetailsPage = ({
  id: adventureId,
  isAdmin,
  isAdventure,
  expedition,
}: AdventureExpeditionDetailsPageProps) => {
  const { data } = useFetchAdventureDetails(adventureId);
  console.log(data);

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
  });
  const currentExpedition = !isAdventure ? expedition : undefined;
  if (!data) {
    return;
  }
  if (!isAdventure && !currentExpedition) {
    return;
  }
  const capacity = data.defaultCapacity;
  const slotsLeft = expedition?.slotsLeft ?? 0;

  const availabilityPercentage = slotsLeft / capacity;

  const availabilityClass =
    availabilityPercentage < 0.3
      ? "text-red-500 bg-destructive"
      : availabilityPercentage < 0.6
        ? "text-yellow-500 bg-secondary/50"
        : "text-green-500 bg-white/80";

  if (deleteExpeditionMutation.isSuccess) {
    router.push("/admin/expeditions");
  }

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-5">
          <BackButton />|
          <div className="">
            <h4 className="font-semibold text-foreground text-lg">
              {data.title}
            </h4>
            <div className="flex items-center gap-1 text-sm text-secondary">
              <span>ID:</span>
              <span>{data.id}</span>
            </div>
          </div>
          |
          <span
            className={`${!data.isActive ? "bg-destructive/20 text-destructive" : "bg-secondary/20 text-secondary"} text-sm rounded-full border font-semibold  px-3 py-1 flex items-center justify-center `}
          >
            {data.isActive ? "ACTIVE" : "NOT ACTIVE"}
          </span>
        </div>
        {isAdmin && (
          <div className="flex items-center gap-5">
            <Button
              onClick={() => {
                if (isAdventure) {
                  deleteAdventureMutation.mutate(data.id);
                } else if (expedition?.id) {
                  deleteExpeditionMutation.mutate(expedition.id);
                }
              }}
              variant={"destructive"}
              className={"text-[16px] font-semibold flex items-center gap-3"}
            >
              <Trash /> Delete {isAdventure ? "Adventure" : "Expedition"}
            </Button>
            <Button
              onClick={() =>
                router.push(
                  isAdventure
                    ? `/admin/adventures/${data.id}/edit`
                    : `/admin/expeditions/${expedition?.id}/edit`,
                )
              }
              variant={"secondary"}
              className={"text-[16px] font-semibold flex items-center gap-3"}
            >
              <Edit /> Edit {isAdventure ? "Adventure" : "Expedition"}
            </Button>
          </div>
        )}
      </div>
      <div className="relative aspect-video ">
        <Image
          alt={data.title}
          fill
          src={data.coverImage}
          className="rounded-xl "
        />
        <div className="inset-0 absolute bg-linear-to-t from-black/85 via-black/53  to-transparent" />
        <div className="absolute inset-x-0 bottom-0 text-foreground p-8 space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 bg-foreground/10 backdrop-blur-3xl px-3 py-2 rounded-2xl text-sm font-semibold tracking-wider text-white">
              <Mountain className="size-5" />
              <span>
                {data.category
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </span>
            </span>
            <span className="flex items-center gap-2 bg-destructive/30 backdrop-blur-3xl px-3 py-2 text-sm font-semibold tracking-wider rounded-2xl text-white">
              <TrendingUp className="size-5" />
              <span>{upperCaseFirstLetter(data.difficulty)}</span>
            </span>
            <span className="text-white flex items-center gap-2 bg-foreground/10 backdrop-blur-3xl px-3 py-2 rounded-2xl text-sm font-semibold tracking-wider">
              <MapPin className="size-5" />
              <span>{data.location}</span>
            </span>{" "}
            {!isAdventure && (
              <span
                className={`${availabilityClass} text-xs font-semibold px-3 py-1 rounded-full border`}
              >
                {expedition?.slotsLeft}/{data.defaultCapacity}
              </span>
            )}
          </div>
          <h4 className="text-accent font-semibold text-[15px]">
            {data.location}
          </h4>
          <p className="max-w-3xl text-[13px]  text-secondary">
            {data.shortDescription}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-5">
        <div className="flex items-center gap-4 bg-secondary/10 border py-3  px-6 rounded-2xl">
          <div className="p-2 flex items-center justify-center bg-secondary/50 rounded-lg">
            <CircleDollarSign />
          </div>
          <div className="flex flex-col">
            <span className="text-sm ">Price</span>
            <span className="text-sm font-semibold text-secondary">
              Ksh: {data.defaultPrice.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-secondary/10 border py-3  px-6 rounded-2xl">
          <div className="p-2 flex items-center justify-center bg-secondary/50 rounded-lg">
            <Clock />
          </div>
          <div className="flex flex-col">
            <span className="text-sm ">Duration</span>
            <span className="text-sm font-semibold text-secondary">
              {data.duration} Day(s)
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-secondary/10 border py-3  px-6 rounded-2xl">
          <div className="p-2 flex items-center justify-center bg-secondary/50 rounded-lg">
            <Users2 />
          </div>
          <div className="flex flex-col">
            <span className="text-sm ">Capacity</span>
            <span className="text-sm font-semibold text-secondary">
              {data.defaultCapacity} people
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-secondary/10 border py-3  px-6 rounded-2xl">
          <div className="p-2 flex items-center justify-center bg-secondary/50 rounded-lg">
            <WavesArrowUp />
          </div>
          <div className="flex flex-col">
            <span className="text-sm ">Elevation</span>
            <span className="text-sm font-semibold text-secondary">
              {data.elevationGain} Meters
            </span>
          </div>
        </div>
      </div>
      {!isAdventure && expedition && (
        <div className="flex items-center justify-between flex-wrap gap-5">
          {currentExpedition?.departureDate && (
            <div className="flex items-center gap-4 bg-secondary/10 border py-3  px-6 rounded-2xl">
              <div className="p-2 flex items-center justify-center bg-secondary/50 rounded-lg">
                <Calendars />
              </div>
              <div className="flex flex-col">
                <span className="text-sm ">Departure date</span>
                <span className="text-sm font-semibold text-secondary">
                  {getBetterDateFormat(currentExpedition?.departureDate)}
                </span>
              </div>
            </div>
          )}
          <div className="flex items-center gap-4 bg-secondary/10 border py-3  px-6 rounded-2xl">
            <div className="p-2 flex items-center justify-center bg-secondary/50 rounded-lg">
              <ClipboardClock />
            </div>
            <div className="flex flex-col">
              <span className="text-sm ">Departure time</span>
              <span className="text-sm font-semibold text-secondary">
                {getBetterTimeFormat(expedition.departureTime)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-secondary/10 border py-3  px-6 rounded-2xl">
            <div className="p-2 flex items-center justify-center bg-secondary/50 rounded-lg">
              <CalendarCheck />
            </div>
            <div className="flex flex-col">
              <span className="text-sm ">Return date</span>
              <span className="text-sm font-semibold text-secondary">
                {getBetterDateFormat(expedition.returnDate)}
              </span>
            </div>
          </div>
          {expedition?.returnTime && (
            <div className="flex items-center gap-4 bg-secondary/10 border py-3  px-6 rounded-2xl">
              <div className="p-2 flex items-center justify-center bg-secondary/50 rounded-lg">
                <TimerReset />
              </div>
              <div className="flex flex-col">
                <span className="text-sm ">Return time</span>
                <span className="text-sm font-semibold text-secondary">
                  {getBetterTimeFormat(expedition?.returnTime)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
      {!isAdventure && expedition && (
        <div className="flex items-center justify-between flex-wrap gap-5">
          <div className="flex items-center gap-4 bg-secondary/10 border py-3  px-6 rounded-2xl">
            <div className="p-2 flex items-center justify-center bg-secondary/50 rounded-lg">
              <User />
            </div>
            <div className="flex flex-col">
              <span className="text-sm ">In-charge name</span>
              <span className="text-sm font-semibold text-secondary">
                {expedition?.guide}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-secondary/10 border py-3  px-6 rounded-2xl">
            <div className="p-2 flex items-center justify-center bg-secondary/50 rounded-lg">
              <Contact />
            </div>
            <div className="flex flex-col">
              <span className="text-sm ">In-Charge Contact</span>
              <span className="text-sm font-semibold text-secondary">
                {expedition?.guideContact}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-secondary/10 border py-3  px-6 rounded-2xl">
            <div className="p-2 flex items-center justify-center bg-secondary/50 rounded-lg">
              <BookCheck />
            </div>
            <div className="flex flex-col">
              <span className="text-sm ">Booked Participants</span>
              <span className="text-sm font-semibold text-secondary">
                {expedition.bookedParticipants} people
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-secondary/10 border py-3  px-6 rounded-2xl">
            <div className="p-2 flex items-center justify-center bg-secondary/50 rounded-lg">
              <ChevronsLeftRightEllipsis />
            </div>
            <div className="flex flex-col">
              <span className="text-sm ">Slots left</span>
              <span className="text-sm font-semibold text-secondary">
                {expedition.slotsLeft} slots
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-5xl space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-2 flex items-center justify-center bg-secondary/50 rounded-lg">
            <ChartBar />
          </div>
          <span className="font-semibold text-[18px]">Full Description</span>
        </div>
        <p className="text-start text-[14px] text-foreground">
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default AdventureExpeditionDetailsPage;
