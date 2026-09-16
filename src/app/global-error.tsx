"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="mt-3 text-muted-foreground">
            A critical error occurred.
          </p>
          <Button onClick={() => reset()} className="mt-6">
            Try again
          </Button>
        </div>
      </body>
    </html>
  );
}
