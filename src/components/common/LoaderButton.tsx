import React from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const LoaderButton = () => {
  return (
    <Button size="icon" disabled>
      <Loader2 className="h-4 w-4 animate-spin" />
    </Button>
  );
};

export default LoaderButton;
