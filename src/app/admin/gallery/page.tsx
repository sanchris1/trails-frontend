/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import ExpeditionsCommand from "../components/ExpeditionsCommand";
import { useRouter } from "next/navigation";

const GalleryPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [expeditionId, setExpeditionId] = useState<string | null>(null);

  useEffect(() => {
    if (!expeditionId) return;
    router.push(`/admin/gallery/${expeditionId}/new`);
  }, [expeditionId]);

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="">
          <h3 className="text-4xl font-medium text-foreground">Gallery</h3>
          <p className="text-sm text-secondary">
            Manage, organize and publish all travel expeditions images on the
            Trails and Memoirs gallery page
          </p>
        </div>
        <Button onClick={() => setOpen(true)} variant={"outline"}>
          {" "}
          <Plus />
          Create Gallery
        </Button>
      </div>
      <ExpeditionsCommand
        open={open}
        setOpen={setOpen}
        setExpeditionId={setExpeditionId}
      />
    </div>
  );
};

export default GalleryPage;
