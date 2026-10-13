"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  CreditCard,
  Package,
  TrendingUp,
  MapPin,
  Bell,
  Star,
  ArrowRight,
  Clock,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  AdminStatsResponse,
  useFetchAdminDashboardStats,
} from "@/hooks/adminDashboard/fetchAdminDashboardStats";
import { formatRelativeTime } from "@/utils/dateTimeFormat";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-KE", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

const alerts = [
  {
    id: "a1",
    title: "Aberdare trek almost full",
    detail: "11 of 12 spots taken · Sep 27",
    tone: "warning" as const,
  },
  {
    id: "a2",
    title: "Low stock: Mara Expedition Tee",
    detail: "Only 3 items left in black",
    tone: "warning" as const,
  },
  {
    id: "a3",
    title: "5 reviews awaiting moderation",
    detail: "Pending approval in Reviews",
    tone: "info" as const,
  },
];

export const notificationActivityStyles: Record<string, string> = {
  inquiry: "bg-purple-500/10 text-purple-600",
  booking_created: "bg-emerald-500/10 text-emerald-600",
  booking_confirmed: "bg-emerald-600/15 text-emerald-700",
  payment_pending: "bg-blue-500/10 text-blue-600",
  payment_received: "bg-emerald-500/10 text-emerald-600",
  payment_reminder: "bg-blue-500/10 text-blue-600",
  payment_failed: "bg-amber-500/10 text-amber-600",
  expedition_reminder: "bg-amber-500/10 text-amber-600",
  expedition_updated: "bg-amber-500/10 text-amber-600",
  booking_cancelled: "bg-destructive/10 text-destructive",
  expedition_cancelled: "bg-destructive/10 text-destructive",
  system: "bg-slate-500/10 text-slate-600",
};

export default function AdminDashboardPage() {
  const { data: stats = {} as AdminStatsResponse } =
    useFetchAdminDashboardStats();

  console.log(stats);

  const kpis = [
    {
      label: "Revenue (this month)",
      value: formatCurrency(stats?.revenue?.total),
      change: ` ${stats?.revenue?.differenceAsPercentage}%`,
      positive: stats?.revenue?.signage === "pos",
      icon: CreditCard,
    },
    {
      label: "Bookings",
      value: stats?.bookings?.total,
      change: ` ${stats?.bookings?.differenceAsPercentage}%`,
      positive: stats?.bookings?.signage === "pos",
      icon: Calendar,
    },
    {
      label: "Participants",
      value: stats?.participants?.total,
      change: ` ${stats?.participants?.differenceAsPercentage}%`,
      positive: stats?.participants?.signage === "pos",
      icon: Users,
    },
    {
      label: "Pending reviews",
      value: "5",
      change: "2 new",
      positive: true,
      icon: Star,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back. Here’s what’s happening at Trails & Memoirs.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">Last updated · just now</p>
      </div>

      {/* KPIs */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">
                  {kpi.label}
                </p>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {kpi.value}
              </p>
              <p
                className={cn(
                  "mt-1 text-xs",
                  kpi.positive ? "text-emerald-600" : "text-destructive",
                )}
              >
                {kpi.change} vs last month
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column – 2/3 */}
        <div className="space-y-6 lg:col-span-2">
          {/* Upcoming expeditions */}
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <h2 className="font-semibold text-foreground">
                  Upcoming expeditions
                </h2>
              </div>
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                <Link
                  href="/admin/participants"
                  className="flex items-center gap-2"
                >
                  View all
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>

            <ul className="divide-y divide-border">
              {stats?.expeditions?.map((exp) => {
                const pct = Math.round(
                  (Number(exp.bookedSlots) / exp.totalSlots) * 100,
                );
                const almostFull = pct >= 80;
                return (
                  <li
                    key={exp.id}
                    className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">{exp.title}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(exp.departureDate)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">
                          {exp.bookedSlots}/{exp.totalSlots}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          confirmed
                        </p>
                      </div>
                      <div className="h-2 w-20 overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            almostFull ? "bg-amber-500" : "bg-primary",
                          )}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      {almostFull && (
                        <Badge
                          variant="outline"
                          className="text-[10px] border-amber-500/30 text-amber-700"
                        >
                          Almost full
                        </Badge>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Recent activity */}
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <h2 className="font-semibold text-foreground">
                  Recent activity
                </h2>
              </div>
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                <Link
                  href="/admin/notifications"
                  className="flex items-center gap-2"
                >
                  All notifications
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>

            <ul className="divide-y divide-border">
              {stats?.notifications?.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-3 px-5 py-3.5"
                >
                  <div
                    className={cn(
                      "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      notificationActivityStyles[item.type],
                    )}
                  >
                    <Bell className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.message}
                    </p>
                  </div>
                  <span className="shrink-0 text-[11px] text-muted-foreground">
                    {formatRelativeTime(item.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Alerts */}
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border px-5 py-4">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-semibold text-foreground">Needs attention</h2>
            </div>

            <ul className="divide-y divide-border">
              {alerts.map((alert) => (
                <li key={alert.id} className="px-5 py-3.5">
                  <p className="text-sm font-medium text-foreground">
                    {alert.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {alert.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-3 font-semibold text-foreground">Quick links</h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Bookings", href: "/admin/bookings", icon: Calendar },
                {
                  label: "Participants",
                  href: "/admin/participants",
                  icon: Users,
                },
                {
                  label: "Payments",
                  href: "/admin/payments",
                  icon: CreditCard,
                },
                {
                  label: "Merchandise",
                  href: "/admin/merchandise",
                  icon: Package,
                },
                { label: "Reviews", href: "/admin/reviews", icon: Star },
                {
                  label: "Analytics",
                  href: "/admin/analytics",
                  icon: TrendingUp,
                },
              ].map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted/50"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
