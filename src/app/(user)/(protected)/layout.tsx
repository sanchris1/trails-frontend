"use client";

import type { ReactNode } from "react";
import { useGetSession } from "@/hooks/auth/useGetSession.hook";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  const { data: session, isLoading } = useGetSession(); // adjust to your hook's API
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

  // Avoid flashing protected UI
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
        {/* or a proper skeleton / spinner */}
      </div>
    );
  }

  if (!session?.success || !session.user) {
    return null; // redirect is in progress
  }

  return <>{children}</>;
};

export default ProtectedLayout;
