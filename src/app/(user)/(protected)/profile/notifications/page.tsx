"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  ArrowLeft,
  Calendar,
  CreditCard,
  Map,
  AlertCircle,
  Info,
  Package,
  CheckCircle2,
  Clock,
  XCircle,
  Compass,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useFetchUserNotifications } from "@/hooks/notifications/fetchUserNotifications";
import { useMarkAsReadNotification } from "@/hooks/notifications/markAsReadNotification";

function parseNotificationDate(dateInput: string | Date): Date {
  if (dateInput instanceof Date) return dateInput;

  // "2026-10-16 08:09:25.655705" → "2026-10-16T08:09:25.655705"
  const normalized = String(dateInput).trim().replace(" ", "T");
  const parsed = new Date(normalized);

  // Fallback if parsing still fails
  if (Number.isNaN(parsed.getTime())) {
    return new Date(dateInput);
  }
  return parsed;
}

function formatRelativeTime(dateInput: string | Date) {
  const date = parseNotificationDate(dateInput);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 0) return "Just now"; // future / clock skew
  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return date.toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getTypeIcon(type: string) {
  switch (type) {
    case "booking_created":
    case "booking_confirmed":
      return <CheckCircle2 className="h-5 w-5 text-success" />;
    case "booking_cancelled":
    case "expedition_cancelled":
      return <XCircle className="h-5 w-5 text-destructive" />;
    case "payment_pending":
    case "payment_reminder":
      return <Clock className="h-5 w-5 text-warning" />;
    case "payment_received":
      return <CreditCard className="h-5 w-5 text-success" />;
    case "payment_failed":
      return <AlertCircle className="h-5 w-5 text-destructive" />;
    case "expedition_reminder":
    case "expedition_updated":
      return <Calendar className="h-5 w-5 text-primary" />;
    case "inquiry":
      return <Info className="h-5 w-5 text-info" />;
    default:
      return <Bell className="h-5 w-5 text-muted-foreground" />;
  }
}

function getTypeLabel(type: string) {
  const labels: Record<string, string> = {
    inquiry: "Inquiry",
    booking_created: "Booking Created",
    booking_confirmed: "Booking Confirmed",
    booking_cancelled: "Booking Cancelled",
    payment_pending: "Payment Pending",
    payment_received: "Payment Received",
    payment_failed: "Payment Failed",
    payment_reminder: "Payment Reminder",
    expedition_reminder: "Expedition Reminder",
    expedition_updated: "Expedition Updated",
    expedition_cancelled: "Expedition Cancelled",
    system: "System",
  };
  return labels[type] || type;
}

function EmptyState({ filter }: { filter: "all" | "unread" }) {
  const isUnread = filter === "unread";

  return (
    <Card className="border-dashed bg-muted/20">
      <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center sm:py-20">
        <div className="relative mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            {isUnread ? (
              <CheckCircle2 className="h-10 w-10 text-primary" />
            ) : (
              <Bell className="h-10 w-10 text-muted-foreground/60" />
            )}
          </div>
          {!isUnread && (
            <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-background shadow-sm ring-1 ring-border">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold tracking-tight">
          {isUnread ? "You're all caught up!" : "No notifications yet"}
        </h3>

        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {isUnread
            ? "You have no unread notifications. Check back later for updates on your bookings and expeditions."
            : "When you book an expedition, make a payment, or get important updates, they'll show up here."}
        </p>

        {!isUnread && (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button>
              <Link href="/expeditions" className="gap-2 flex items-center">
                <Compass className="h-4 w-4" />
                Explore Expeditions
              </Link>
            </Button>
            <Button variant="outline">
              <Link href="/profile/adventures">View My Bookings</Link>
            </Button>
          </div>
        )}

        {isUnread && (
          <Button
            variant="outline"
            className="mt-8"
            onClick={() => {
              /* parent will handle via filter change if needed */
            }}
          >
            <Link href="#" onClick={(e) => e.preventDefault()}>
              View all notifications
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default function NotificationsPage() {
  const { data: notifications = [] } = useFetchUserNotifications();
  const { mutate: markAsRead } = useMarkAsReadNotification();

  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filtered =
    filter === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border/50 bg-linear-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-3xl px-4 py-10 sm:py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Notifications
                </h1>
                {unreadCount > 0 && (
                  <Badge className="bg-accent text-accent-foreground">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-muted-foreground">
                Updates about your bookings, payments and expeditions
              </p>
            </div>

            <Button variant="outline" size="sm">
              <Link href="/profile" className="gap-2 flex items-center">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Filters + List */}
      <section className="container mx-auto max-w-3xl px-4 py-8">
        {/* Filter tabs */}
        <div className="mb-6 flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("unread")}
          >
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </Button>
        </div>

        {filtered.length === 0 ? (
          <EmptyState filter={filter} />
        ) : (
          <div className="space-y-3">
            {filtered.map((notification) => (
              <Card
                key={notification.id}
                className={cn(
                  "transition-all hover:shadow-md",
                  !notification.isRead && "border-primary/30 bg-primary/5",
                )}
              >
                <CardContent className="p-4 sm:p-5">
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                      {getTypeIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3
                              className={cn(
                                "font-semibold leading-snug",
                                !notification.isRead && "text-foreground",
                              )}
                            >
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <span className="h-2 w-2 rounded-full bg-accent" />
                            )}
                          </div>
                          <Badge
                            variant="secondary"
                            className="text-xs font-normal"
                          >
                            {getTypeLabel(notification.type)}
                          </Badge>
                        </div>

                        <span className="shrink-0 text-xs text-muted-foreground">
                          {formatRelativeTime(notification.createdAt)}
                        </span>
                      </div>

                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {notification.message}
                      </p>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}

                        {notification.expeditionId && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-1.5 text-xs"
                          >
                            <Link
                              href={`/expeditions/${notification.expeditionId}`}
                            >
                              <Map className="h-3.5 w-3.5" />
                              View Expedition
                            </Link>
                          </Button>
                        )}

                        {notification.bookingId && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-1.5 text-xs"
                          >
                            <Link href={`/bookings/${notification.bookingId}`}>
                              <Package className="h-3.5 w-3.5" />
                              View Booking
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
