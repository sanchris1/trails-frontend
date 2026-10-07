"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  ArrowLeft,
  CheckCheck,
  Calendar,
  CreditCard,
  Map,
  AlertCircle,
  Info,
  Package,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Mock data based on your notification schema
const mockNotifications = [
  {
    id: "ntf_1",
    type: "payment_reminder",
    title: "Payment Reminder",
    message:
      "You still have a pending balance of KES 25,000 for Maasai Mara Sunrise Safari. Please complete your payment.",
    isRead: false,
    createdAt: new Date("2026-10-06T14:30:00"),
    bookingId: "bk_001",
    expeditionId: "exp_1",
  },
  {
    id: "ntf_2",
    type: "booking_confirmed",
    title: "Booking Confirmed",
    message:
      "Your booking for Mount Kenya Summit Trek has been confirmed. We’re excited to have you on this adventure!",
    isRead: false,
    createdAt: new Date("2026-10-05T09:15:00"),
    bookingId: "bk_002",
    expeditionId: "exp_2",
  },
  {
    id: "ntf_3",
    type: "expedition_reminder",
    title: "Upcoming Expedition",
    message:
      "Your Maasai Mara Sunrise Safari departs in 5 days. Meeting point details have been sent to your email.",
    isRead: false,
    createdAt: new Date("2026-10-04T11:00:00"),
    bookingId: "bk_001",
    expeditionId: "exp_1",
  },
  {
    id: "ntf_4",
    type: "payment_received",
    title: "Payment Received",
    message:
      "We have received your payment of KES 68,000 for Mount Kenya Summit Trek. Thank you!",
    isRead: true,
    createdAt: new Date("2026-09-28T16:45:00"),
    bookingId: "bk_002",
    expeditionId: "exp_2",
  },
  {
    id: "ntf_5",
    type: "expedition_updated",
    title: "Expedition Update",
    message:
      "There has been a slight change in the departure time for Diani Beach Cultural Escape. Please check the updated details.",
    isRead: true,
    createdAt: new Date("2026-09-20T10:20:00"),
    bookingId: "bk_003",
    expeditionId: "exp_3",
  },
  {
    id: "ntf_6",
    type: "system",
    title: "Welcome to the Adventure Community",
    message:
      "Thanks for joining us! Explore expeditions, save your favorites, and start planning your next journey.",
    isRead: true,
    createdAt: new Date("2024-11-12T08:00:00"),
    bookingId: null,
    expeditionId: null,
  },
];

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

function formatRelativeTime(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

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

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filtered =
    filter === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

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

            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  className="gap-2"
                >
                  <CheckCheck className="h-4 w-4" />
                  Mark all as read
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Link href="/profile" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Link>
              </Button>
            </div>
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
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <Bell className="mb-4 h-12 w-12 text-muted-foreground/40" />
              <h3 className="text-lg font-medium">
                {filter === "unread"
                  ? "No unread notifications"
                  : "No notifications yet"}
              </h3>
              <p className="mt-1 text-muted-foreground">
                {filter === "unread"
                  ? "You're all caught up!"
                  : "Updates about your bookings and expeditions will appear here."}
              </p>
            </CardContent>
          </Card>
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
