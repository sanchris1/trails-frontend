import { Suspense } from "react";
import AuthLayout from "./AuthLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <AuthLayout>{children}</AuthLayout>
    </Suspense>
  );
}
