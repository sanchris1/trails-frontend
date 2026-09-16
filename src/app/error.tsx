"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optional: log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Something went wrong
      </h1>

      <p className="mt-3 max-w-md text-muted-foreground">
        We encountered an unexpected error. Please try again or return to the
        homepage.
      </p>

      {process.env.NODE_ENV === "development" && (
        <p className="mt-4 max-w-lg rounded-md bg-muted p-3 text-left text-xs text-muted-foreground">
          {error.message}
        </p>
      )}

      <div className="mt-8 flex gap-3">
        <Button onClick={() => reset()} variant="default">
          Try again
        </Button>
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Go home
        </Button>
      </div>
    </div>
  );
}
