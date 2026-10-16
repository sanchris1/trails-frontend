"use client";

import type { ReactNode } from "react";
import { useGetSession } from "@/hooks/auth/useGetSession.hook";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  const { data: session, isLoading } = useGetSession();
  const router = useRouter();
  const pathname = usePathname();

  const loading = isLoading ?? session === undefined;

  useEffect(() => {
    if (loading) return;

    if (!session?.success || !session.user) {
      const callbackUrl = encodeURIComponent(pathname || "/profile");
      router.replace(`/auth/login?callbackUrl=${callbackUrl}`);
    }
  }, [session, loading, router, pathname]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedLayout;
