/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import type { ReactNode } from "react";
import { useGetSession } from "@/hooks/auth/useGetSession.hook";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { data: session, isLoading, isError } = useGetSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [redirecting, setRedirecting] = useState(false);

  const isAuthenticated = Boolean(session?.success && session?.user);

  useEffect(() => {
    if (isLoading || !isAuthenticated || redirecting) return;

    const raw = searchParams.get("callbackUrl") ?? "/expeditions";
    const safe =
      raw.startsWith("/") && !raw.startsWith("//") ? raw : "/expeditions";

    setRedirecting(true);
    router.replace(safe);
  }, [isAuthenticated, isLoading, router, searchParams, redirecting]);

  // Safety: if session hangs > 8s, show the auth page anyway
  const [timedOut, setTimedOut] = useState(false);
  useEffect(() => {
    if (!isLoading) return;
    const t = setTimeout(() => setTimedOut(true), 8000);
    return () => clearTimeout(t);
  }, [isLoading]);

  if (
    (isLoading && !isError && !timedOut) ||
    (isAuthenticated && redirecting)
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // Error / timeout / not logged in → show login
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  // Authenticated but redirect not done yet
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner />
    </div>
  );
};

export default AuthLayout;
