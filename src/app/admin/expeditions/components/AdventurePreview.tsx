import { upperCaseFirstLetter } from "@/hooks/upperCaseFirstLetter";
import { Adventure } from "@/types/t.types";
import { Clock, DollarSign, MapPin } from "lucide-react";
import Image from "next/image";

const AdventurePreview = ({ adventure }: { adventure: Adventure }) => {
  return (
    <div className="bg-background rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.5)] overflow-hidden">
      <div className="w-full h-96 relative ">
        <Image
          src={adventure?.coverImage}
          alt={adventure?.title}
          fill
          className=" object-cover"
        />
        <div className="absolute top-0 left-5 pt-6 flex items-center gap-8">
          <span className="bg-secondary text-white font-semibold text-[15px] px-4 py-1 rounded-2xl">
            {adventure?.category.replace(/-/g, " ")}
          </span>
          <span className="bg-destructive text-white font-semibold text-[15px] px-4 py-1 rounded-2xl">
            {upperCaseFirstLetter(adventure?.difficulty)}
          </span>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <h5 className="text-primary font-semibold text-2xl">
          {adventure?.title}
        </h5>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-secondary">
            <MapPin className="size-5" />
            <span className="font-semibold ">{adventure?.location}</span>
          </div>
          |
          <div className="flex items-center gap-2 text-secondary">
            <Clock className="size-5" />
            <span className="">{adventure?.duration} Day(s)</span>
          </div>
          |
          <div className="flex items-center gap-2 text-secondary">
            <DollarSign className="size-5" />
            <span className="font-semibold ">
              KSH: {adventure?.defaultPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdventurePreview;
