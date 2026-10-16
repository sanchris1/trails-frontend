"use client";

import type { ReactNode } from "react";
import { useGetSession } from "@/hooks/auth/useGetSession.hook";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { data: session, isLoading } = useGetSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isLoading || !session) return;

    const raw = searchParams.get("callbackUrl") ?? "/expeditions";
    const safeCallback =
      raw.startsWith("/") && !raw.startsWith("//") ? raw : "/expeditions";

    router.replace(safeCallback);
  }, [session, isLoading, router, searchParams]);

  if (isLoading) {
    return null; // or a small spinner
  }

  if (session) {
    return null; // redirect in progress
  }

  return <>{children}</>;
};

export default AuthLayout;
