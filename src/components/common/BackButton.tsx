"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} variant={"secondary"}>
      <ArrowLeft />
    </Button>
  );
};

export default BackButton;
