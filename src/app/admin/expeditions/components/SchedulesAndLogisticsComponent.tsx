"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExpeditionFormValues } from "@/types/t.types";
import { Clipboard } from "lucide-react";
import { useFormContext } from "react-hook-form";

const SchedulesAndLogisticsComponent = () => {
  const form = useFormContext<ExpeditionFormValues>();

  return (
    <div className="bg-background rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.5)] overflow-hidden p-5 space-y-5">
      <div className="flex items-center gap-3 ">
        <span className="text-secondary rounded-full p-2 bg-secondary/20 ">
          <Clipboard />
        </span>
        <h4 className="text-secondary font-semibold text-xl">
          Schedule and Logistics
        </h4>
      </div>
      <div className="grid grid-cols-4 gap-6">
        <div className="">
          <Label className="mb-2">Departure date</Label>
          <Input type="date" {...form.register("departureDate")} />
        </div>
        <div className="">
          <Label className="mb-2">Departure time</Label>
          <Input type="time" {...form.register("departureTime")} />
        </div>
        <div className="">
          <Label className="mb-2">Return date</Label>
          <Input type="date" {...form.register("returnDate")} />
        </div>
        <div className="">
          <Label className="mb-2">Return time</Label>
          <Input type="time" {...form.register("returnTime")} />
        </div>
      </div>
      <div className="">
        <Label className="mb-2">Meeting point</Label>
        <Input
          className="h-14"
          {...form.register("meetingPoint")}
          placeholder="e.g, Nairobi CBD, Kencom Bus Station"
        />
      </div>
    </div>
  );
};

export default SchedulesAndLogisticsComponent;
