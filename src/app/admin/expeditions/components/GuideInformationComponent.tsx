"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExpeditionFormValues } from "@/types/t.types";
import { PersonStanding } from "lucide-react";
import { useFormContext } from "react-hook-form";

const GuideInformationComponent = () => {
  const form = useFormContext<ExpeditionFormValues>();

  return (
    <div className="bg-background rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.5)] overflow-hidden p-5 space-y-5">
      <div className="flex items-center gap-3 ">
        <span className="text-secondary rounded-full p-2 bg-secondary/20 ">
          <PersonStanding />
        </span>
        <h4 className="text-secondary font-semibold text-xl">
          Guide Information
        </h4>
      </div>
      <div className="flex items-center gap-3.5">
        <div className="">
          <Label className="mb-2">Guide name</Label>
          <Input
            placeholder="Guide name e.g Sam Chris..."
            {...form.register("guide")}
          />
        </div>
        <div className="">
          <Label className="mb-2">Guide Phone Contact</Label>
          <Input
            placeholder="e.g 0711223344"
            {...form.register("guideContact")}
          />
        </div>
      </div>
    </div>
  );
};

export default GuideInformationComponent;
