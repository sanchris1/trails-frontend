"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  CalendarX,
  Mail,
  Check,
  CheckCheck,
  Trash2,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NotificationType = "booking_cancelled" | "contact" | "system";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  meta?: {
    bookingId?: string;
    contactName?: string;
    contactEmail?: string;
  };
}

// Temporary mock data — replace with real API data later
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "booking_cancelled",
    title: "Booking Cancelled",
    message: "John Doe cancelled the Mount Longonot hike scheduled for Sep 20.",
    isRead: false,
    createdAt: "2026-09-17T06:12:00Z",
    meta: { bookingId: "BK-1042" },
  },
  {
    id: "2",
    type: "contact",
    title: "New Contact Message",
    message: "Sarah asked about upcoming group hikes and merchandise sizes.",
    isRead: false,
    createdAt: "2026-09-17T05:40:00Z",
    meta: {
      contactName: "Sarah Wanjiku",
      contactEmail: "sarah@email.com",
    },
  },
  {
    id: "3",
    type: "booking_cancelled",
    title: "Booking Cancelled",
    message: "James Mwangi cancelled the Aberdare weekend trek.",
    isRead: true,
    createdAt: "2026-09-16T18:22:00Z",
    meta: { bookingId: "BK-1038" },
  },
  {
    id: "4",
    type: "contact",
    title: "New Contact Message",
    message: "Partnership inquiry from an outdoor gear brand.",
    isRead: true,
    createdAt: "2026-09-16T14:05:00Z",
    meta: {
      contactName: "David Otieno",
      contactEmail: "david@outdoorgear.com",
    },
  },
  {
    id: "5",
    type: "system",
    title: "System Notice",
    message:
      "Low stock alert: Mara Expedition Tee (Black) has only 3 items left.",
    isRead: false,
    createdAt: "2026-09-16T11:30:00Z",
  },
];

const typeConfig = {
  booking_cancelled: {
    label: "Booking",
    icon: CalendarX,
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  contact: {
    label: "Contact",
    icon: Mail,
    color: "text-blue-600",
    bg: "bg-blue-500/10",
  },
  system: {
    label: "System",
    icon: Bell,
    color: "text-amber-600",
    bg: "bg-amber-500/10",
  },
};

function formatTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString("en-KE", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<"all" | NotificationType>("all");

  const filtered =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.type === filter);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Notifications
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "You're all caught up"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select
            value={filter}
            onValueChange={(value) =>
              setFilter(value as "all" | NotificationType)
            }
          >
            <SelectTrigger className="w-40">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="booking_cancelled">Bookings</SelectItem>
              <SelectItem value="contact">Contacts</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="gap-1.5"
          >
            <CheckCheck className="h-4 w-4" />
            Mark all read
          </Button>
        </div>
      </div>

      {/* Notifications list */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <Bell className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">
              No notifications
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              New booking cancellations and contact messages will appear here.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((notification) => {
              const config = typeConfig[notification.type];
              const Icon = config.icon;

              return (
                <li
                  key={notification.id}
                  className={cn(
                    "flex gap-4 p-4 transition-colors hover:bg-muted/40",
                    !notification.isRead && "bg-primary/5",
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                      config.bg,
                    )}
                  >
                    <Icon className={cn("h-5 w-5", config.color)} />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p
                            className={cn(
                              "text-sm text-foreground",
                              !notification.isRead && "font-semibold",
                            )}
                          >
                            {notification.title}
                          </p>
                          <Badge variant="secondary" className="text-[10px]">
                            {config.label}
                          </Badge>
                          {!notification.isRead && (
                            <span className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </div>

                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {notification.message}
                        </p>

                        {/* Meta */}
                        {notification.meta?.contactEmail && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            From: {notification.meta.contactName} (
                            {notification.meta.contactEmail})
                          </p>
                        )}
                        {notification.meta?.bookingId && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            Booking ID: {notification.meta.bookingId}
                          </p>
                        )}

                        <p className="mt-2 text-xs text-muted-foreground">
                          {formatTime(notification.createdAt)}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex shrink-0 items-center gap-1">
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => markAsRead(notification.id)}
                            title="Mark as read"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => deleteNotification(notification.id)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
