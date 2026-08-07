import { Input } from "@/components/ui/input";
import { AdventureFormValues } from "@/types/t.types";
import { SquareChartGantt } from "lucide-react";
import { useFormContext } from "react-hook-form";

const LogisticsAndDetails = () => {
  const form = useFormContext<AdventureFormValues>();

  return (
    <div className="bg-secondary/10 border border-border p-5 rounded-xl ">
      <div className="flex items-center gap-3 ">
        <span className="text-secondary ">
          <SquareChartGantt />
        </span>
        <h4 className="text-secondary font-semibold">Logistics and Details</h4>
      </div>
      <div className="grid grid-cols-4 gap-12 my-5">
        <div className=" flex items-center flex-col gap-2">
          <span className="text-sm text-secondary">
            Duration <br /> (Days)
          </span>
          <Input
            type="number"
            placeholder="eg. 4"
            {...form.register("duration", { valueAsNumber: true })}
          />
        </div>
        <div className=" flex items-center flex-col gap-2">
          <span className="text-sm text-secondary">
            Group Size <br /> (Max)
          </span>
          <Input
            type="number"
            placeholder="eg. 4"
            {...form.register("defaultCapacity", { valueAsNumber: true })}
          />
        </div>
        <div className=" flex items-center flex-col gap-2">
          <span className="text-sm text-secondary">
            Elevation <br /> (m)
          </span>
          <Input
            type="number"
            placeholder="eg. 4"
            {...form.register("elevationGain", { valueAsNumber: true })}
          />
        </div>
        <div className=" flex items-center flex-col gap-2">
          <span className="text-sm text-secondary">
            Price <br /> (KSH)
          </span>
          <Input
            type="number"
            placeholder="eg. 4000"
            {...form.register("defaultPrice", { valueAsNumber: true })}
          />
        </div>
      </div>
    </div>
  );
};

export default LogisticsAndDetails;
