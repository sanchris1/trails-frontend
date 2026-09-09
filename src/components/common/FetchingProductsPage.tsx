"use client";

import { Spinner } from "@/components/ui/spinner"; // adjust path if needed
import { Mountain } from "lucide-react";

const FetchingProductsPage = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      {/* Soft background accent */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        {/* Icon + Spinner combination */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
          <Mountain className="h-8 w-8 text-primary/80" />
          <Spinner className="absolute size-20 text-primary/40" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Preparing your journey...
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            We’re gathering the latest expedition details for you
          </p>
        </div>

        {/* Subtle progress dots */}
        <div className="flex items-center gap-1.5 mt-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default FetchingProductsPage;
