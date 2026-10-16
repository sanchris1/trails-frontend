"use client";

import type { ReactNode } from "react";
import { useGetSession } from "@/hooks/auth/useGetSession.hook";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner"; // or any loader you have

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { data: session, isLoading } = useGetSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isAuthenticated = Boolean(session?.success && session?.user);

  useEffect(() => {
    if (isLoading || !isAuthenticated) return;

    const raw = searchParams.get("callbackUrl") ?? "/expeditions";
    const safeCallback =
      raw.startsWith("/") && !raw.startsWith("//") ? raw : "/expeditions";

    router.replace(safeCallback);
  }, [isAuthenticated, isLoading, router, searchParams]);
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return <>{children}</>;
};

export default AuthLayout;
