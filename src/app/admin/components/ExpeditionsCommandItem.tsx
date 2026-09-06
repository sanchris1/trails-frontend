import { Separator } from "@/components/ui/separator";
import { Adventure, Expedition } from "@/types/t.types";
import Image from "next/image";

interface ExpeditionsCommandItemProps {
  expedition?: Expedition;
  adventure?: Adventure;
  setId: (id: string) => void;
  setOpen: (state: boolean) => void;
  isAdventure: boolean;
}

const ExpeditionsCommandItem = ({
  expedition,
  setId,
  setOpen,
  adventure,
  isAdventure,
}: ExpeditionsCommandItemProps) => {
  const id = isAdventure ? adventure!.id : expedition!.id;
  const imageSrc = isAdventure
    ? adventure!.coverImage
    : expedition!.adventure.coverImage;
  const title = isAdventure ? adventure!.title : expedition!.adventure.title;

  return (
    <div
      className="flex items-center justify-between  px-2 py-1 m-1 rounded-md hover:bg-secondary/10 cursor-pointer gap-5 border"
      onClick={() => {
        setId(id);
        setOpen(false);
      }}
    >
      <div className="w-18 h-12 relative">
        <Image
          fill
          src={imageSrc}
          alt={title}
          className="rounded-sm object-cover "
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-wrap text-end text-secondary">{title}</span>
        <Separator />
        <span className="text-wrap text-end  text-muted-foreground">
          {!isAdventure && <>Departure Date: {expedition!.departureDate}</>}
          {isAdventure && <>Elevation: {adventure?.elevationGain}</>}
        </span>
      </div>
    </div>
  );
};

export default ExpeditionsCommandItem;
