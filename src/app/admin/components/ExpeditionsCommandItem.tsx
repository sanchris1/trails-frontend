import { Separator } from "@/components/ui/separator";
import { Expedition } from "@/types/t.types";
import Image from "next/image";

const ExpeditionsCommandItem = ({
  expedition,
  setId,
  setOpen,
}: {
  expedition: Expedition;
  setId: (id: string) => void;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <div
      className="flex items-center justify-between  px-2 py-1 m-1 rounded-md hover:bg-secondary/10 cursor-pointer gap-5 border"
      onClick={() => {
        setId(expedition.id);
        setOpen(false);
      }}
    >
      <div className="w-18 h-12 relative">
        <Image
          fill
          src={expedition.adventure.coverImage}
          alt={expedition.adventure.title}
          className="rounded-sm object-cover "
        />
      </div>
      <div className="flex flex-col">
        <span className="text-wrap text-end text-secondary">
          {expedition.adventure.title}
        </span>
        <Separator />
        <span className="text-wrap text-end text-secondary">
          {expedition.departureDate}
        </span>
      </div>
    </div>
  );
};

export default ExpeditionsCommandItem;
