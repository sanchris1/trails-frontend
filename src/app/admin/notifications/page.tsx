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
  Check,
  Trash2,
  Filter,
  CircleX,
  RefreshCw,
  AlarmClock,
  BellRing,
  Clock,
  CalendarCheck,
  CalendarPlus,
  MessageSquare,
  CircleDollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useFetchAdminNotifications } from "@/hooks/notifications/fetchAdminNotifications";
import { useMarkAsReadNotification } from "@/hooks/notifications/markAsReadNotification";
import { useDeleteNotification } from "@/hooks/notifications/deleteNotification";

export type NotificationType =
  | "inquiry"
  | "booking_created"
  | "booking_confirmed"
  | "booking_cancelled"
  | "payment_pending"
  | "payment_received"
  | "payment_failed"
  | "payment_reminder"
  | "expedition_reminder"
  | "expedition_updated"
  | "expedition_cancelled"
  | "system";

export interface Notification {
  id: string;
  recipientId: string;
  senderId: string | null;
  type: NotificationType;
  title: string;
  message: string;
  bookingId: string | null;
  expeditionId: string | null;
  isRead: boolean;
  createdAt: string;
  readAt: string;
}

const typeConfig = {
  inquiry: {
    label: "Inquiry",
    icon: MessageSquare,
    color: "text-blue-600",
    bg: "bg-blue-500/10",
  },
  booking_created: {
    label: "Booking Created",
    icon: CalendarPlus,
    color: "text-indigo-600",
    bg: "bg-indigo-500/10",
  },
  booking_confirmed: {
    label: "Booking Confirmed",
    icon: CalendarCheck,
    color: "text-green-600",
    bg: "bg-green-500/10",
  },
  booking_cancelled: {
    label: "Booking Cancelled",
    icon: CalendarX,
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  payment_pending: {
    label: "Payment Pending",
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-500/10",
  },
  payment_received: {
    label: "Payment Received",
    icon: CircleDollarSign,
    color: "text-green-600",
    bg: "bg-green-500/10",
  },
  payment_failed: {
    label: "Payment Failed",
    icon: CircleX,
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  payment_reminder: {
    label: "Payment Reminder",
    icon: BellRing,
    color: "text-amber-600",
    bg: "bg-amber-500/10",
  },
  expedition_reminder: {
    label: "Expedition Reminder",
    icon: AlarmClock,
    color: "text-orange-600",
    bg: "bg-orange-500/10",
  },
  expedition_updated: {
    label: "Expedition Updated",
    icon: RefreshCw,
    color: "text-blue-600",
    bg: "bg-blue-500/10",
  },
  expedition_cancelled: {
    label: "Expedition Cancelled",
    icon: CircleX,
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  system: {
    label: "System",
    icon: Bell,
    color: "text-amber-600",
    bg: "bg-amber-500/10",
  },
} satisfies Record<
  NotificationType,
  {
    label: string;
    icon: typeof Bell;
    color: string;
    bg: string;
  }
>;

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
  const { data: notificationsData } = useFetchAdminNotifications();

  const [filter, setFilter] = useState<"all" | NotificationType>("all");

  const { mutate: markAsRead } = useMarkAsReadNotification();

  const { mutate: deleteNotification } = useDeleteNotification();

  if (notificationsData?.length === 0 || !notificationsData) {
    return;
  }

  const filtered =
    filter === "all"
      ? notificationsData
      : notificationsData.filter((n) => n.type === filter);

  const unreadCount = notificationsData.filter((n) => !n.isRead).length;
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

              <SelectItem value="inquiry">Inquiries</SelectItem>

              <SelectItem value="booking_created">Booking Created</SelectItem>
              <SelectItem value="booking_confirmed">
                Booking Confirmed
              </SelectItem>
              <SelectItem value="booking_cancelled">
                Booking Cancelled
              </SelectItem>
              <SelectItem value="payment_pending">Payment Pending</SelectItem>
              <SelectItem value="payment_received">Payment Received</SelectItem>
              <SelectItem value="payment_failed">Payment Failed</SelectItem>
              <SelectItem value="payment_reminder">Payment Reminder</SelectItem>
              <SelectItem value="expedition_reminder">
                Expedition Reminder
              </SelectItem>
              <SelectItem value="expedition_updated">
                Expedition Updated
              </SelectItem>
              <SelectItem value="expedition_cancelled">
                Expedition Cancelled
              </SelectItem>

              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
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
