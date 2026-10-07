"use client";

import { Bell } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import AvatarUser from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { useFetchAdminNotifications } from "@/hooks/notifications/fetchAdminNotifications";
import { useRouter } from "next/navigation";

const AdminNavbar = () => {
  const { data: notifications = [] } = useFetchAdminNotifications();

  const router = useRouter();

  const hasUnreadNotification = notifications.some((item) => !item.isRead);

  return (
    <div className="flex items-center justify-between  border  p-2 sticky top-0">
      <h3 className="font-semibold text-primary text-2xl">
        Trails an<span className="text-accent">d Memoirs</span> Admin{" "}
      </h3>
      <div className="flex items-center gap-4">
        {" "}
        <ModeToggle />
        <Button
          onClick={() => router.push("/admin/notifications")}
          variant={"ghost"}
          className="relative"
        >
          {hasUnreadNotification && (
            <span className="absolute top-0 right-0 bg-red-500 rounded-full size-2" />
          )}
          <Bell className="" />
        </Button>
        |<AvatarUser />
      </div>
    </div>
  );
};

export default AdminNavbar;
