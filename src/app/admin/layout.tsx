"use client";

import { useGetSession } from "@/hooks/auth/useGetSession.hook";
import AdminNavbar from "./components/AdminNavbar";
import AdminSidebar from "./components/AdminSidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isLoading, isFetching } = useGetSession();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!session) {
      router.replace("/auth/login");
      return;
    }

    if (session.user?.role !== "admin") {
      router.replace("/");
    }
  }, [session, isLoading, isFetching, router]);

  if (isLoading || isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!session || session.user?.role !== "admin") {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminNavbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
