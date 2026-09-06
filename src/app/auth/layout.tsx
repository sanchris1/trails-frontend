"use client";

import { useGetSession } from "@/hooks/auth/useGetSession.hook";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthLayout = ({ children }: { children: Readonly<React.ReactNode> }) => {
  const { data: session, isLoading } = useGetSession();

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && session) {
      router.replace("/expeditions");
    }
  }, [session, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (session) {
    return null;
  }

  return <div>{children}</div>;
};

export default AuthLayout;
