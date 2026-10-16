"use client";

import type { ReactNode } from "react";
import { useGetSession } from "@/hooks/auth/useGetSession.hook";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { data: session, isLoading } = useGetSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirected = useRef(false);

  const isAuthenticated = Boolean(session?.success && session?.user);

  useEffect(() => {
    if (isLoading || !isAuthenticated || redirected.current) return;

    redirected.current = true;

    const raw = searchParams.get("callbackUrl") ?? "/expeditions";
    const safe =
      raw.startsWith("/") && !raw.startsWith("//") ? raw : "/expeditions";

    router.replace(safe);
  }, [isAuthenticated, isLoading, router, searchParams]);

  return <>{children}</>;
};

export default AuthLayout;
