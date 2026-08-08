import { expeditionStatuses } from "@/common";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExpeditionFormValues } from "@/types/t.types";
import { Loader } from "lucide-react";
import { useFormContext } from "react-hook-form";

const StatusComponent = () => {
  const form = useFormContext<ExpeditionFormValues>();

  return (
    <div className="bg-background rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.5)] overflow-hidden p-5 space-y-5">
      <div className="flex items-center gap-3 ">
        <span className="text-secondary rounded-full p-2 bg-secondary/20 ">
          <Loader />
        </span>
        <h4 className="text-secondary font-semibold text-xl">
          Expedition Status
        </h4>
      </div>
      <div className="">
        <Label className="mb-2">Category</Label>
        <Select
          value={form.watch("expeditionStatus")}
          onValueChange={(value) => form.setValue("expeditionStatus", value!)}
        >
          <SelectTrigger className={" px-5"}>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {expeditionStatuses.map((stat) => (
                <SelectItem key={stat.value} value={stat.value}>
                  {stat.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default StatusComponent;
