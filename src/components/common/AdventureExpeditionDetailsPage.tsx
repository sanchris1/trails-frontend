/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFetchAdventureDetails } from "@/hooks/adventures/fetchAdventureQuery";
import BackButton from "./BackButton";
import { Button } from "../ui/button";
import {
  ChartBar,
  CircleDollarSign,
  Clock,
  Edit,
  MapPin,
  Mountain,
  Trash,
  TrendingUp,
  Users2,
  WavesArrowUp,
} from "lucide-react";
import Image from "next/image";
import { upperCaseFirstLetter } from "@/hooks/upperCaseFirstLetter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteAdventure } from "@/hooks/adventures/deleteAdventure";
import { useRouter } from "next/navigation";

interface AdventureExpeditionDetailsPageProps {
  isAdventure: boolean;
  isAdmin: boolean;
  id: string;
}

const AdventureExpeditionDetailsPage = ({
  id: adventureId,
  isAdmin,
  isAdventure,
}: AdventureExpeditionDetailsPageProps) => {
  const { data } = useFetchAdventureDetails(adventureId);

  const router = useRouter();

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
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
  if (!data) {
    return;
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
              onClick={() => deleteMutation.mutate(data.id)}
              variant={"destructive"}
              className={"text-[16px] font-semibold flex items-center gap-3"}
            >
              <Trash /> Delete Adventure
            </Button>
            <Button
              onClick={() => router.push(`/admin/adventures/${data.id}/edit`)}
              variant={"secondary"}
              className={"text-[16px] font-semibold flex items-center gap-3"}
            >
              <Edit /> Edit Adventure
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
            </span>
          </div>
          <h4 className="text-accent font-semibold text-[15px]">
            {data.location}
          </h4>
          <p className="max-w-3xl text-[13px]  text-secondary">
            {data.shortDescription}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between flex-nowrap gap-5">
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
      <div className="max-w-3xl space-y-3">
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
