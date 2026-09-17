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

const kpis = [
  {
    label: "Revenue (this month)",
    value: formatCurrency(186500),
    change: "+12.4%",
    positive: true,
    icon: CreditCard,
  },
  {
    label: "Bookings",
    value: "48",
    change: "+8",
    positive: true,
    icon: Calendar,
  },
  {
    label: "Participants",
    value: "126",
    change: "+15",
    positive: true,
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

const upcomingExpeditions = [
  {
    id: "EXP-01",
    name: "Mount Longonot Day Hike",
    location: "Naivasha",
    date: "2026-09-20",
    confirmed: 14,
    capacity: 20,
  },
  {
    id: "EXP-02",
    name: "Ngong Hills Sunrise Hike",
    location: "Kajiado",
    date: "2026-09-22",
    confirmed: 9,
    capacity: 25,
  },
  {
    id: "EXP-03",
    name: "Aberdare Weekend Trek",
    location: "Nyeri",
    date: "2026-09-27",
    confirmed: 11,
    capacity: 12,
  },
];

const recentActivity = [
  {
    id: "1",
    type: "booking",
    title: "New booking",
    detail: "John Doe · Mount Longonot Day Hike",
    time: "12 min ago",
  },
  {
    id: "2",
    type: "payment",
    title: "Payment received",
    detail: "KES 8,500 · BK-1048",
    time: "28 min ago",
  },
  {
    id: "3",
    type: "contact",
    title: "Contact message",
    detail: "Sarah asked about group hikes",
    time: "1 hr ago",
  },
  {
    id: "4",
    type: "cancel",
    title: "Booking cancelled",
    detail: "James Mwangi · Hell's Gate",
    time: "2 hrs ago",
  },
  {
    id: "5",
    type: "review",
    title: "New review",
    detail: "5★ · Ngong Hills Sunrise Hike",
    time: "3 hrs ago",
  },
];

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

const activityIcon: Record<string, string> = {
  booking: "bg-emerald-500/10 text-emerald-600",
  payment: "bg-blue-500/10 text-blue-600",
  contact: "bg-purple-500/10 text-purple-600",
  cancel: "bg-destructive/10 text-destructive",
  review: "bg-amber-500/10 text-amber-600",
};

export default function AdminDashboardPage() {
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
                <Link href="/admin/participants">
                  View all
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>

            <ul className="divide-y divide-border">
              {upcomingExpeditions.map((exp) => {
                const pct = Math.round((exp.confirmed / exp.capacity) * 100);
                const almostFull = pct >= 80;
                return (
                  <li
                    key={exp.id}
                    className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">{exp.name}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(exp.date)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">
                          {exp.confirmed}/{exp.capacity}
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
                <Link href="/admin/notifications">
                  All notifications
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>

            <ul className="divide-y divide-border">
              {recentActivity.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-3 px-5 py-3.5"
                >
                  <div
                    className={cn(
                      "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      activityIcon[item.type],
                    )}
                  >
                    <Bell className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                  <span className="shrink-0 text-[11px] text-muted-foreground">
                    {item.time}
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

          {/* Mini stats */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-3 font-semibold text-foreground">
              This month snapshot
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Confirmed bookings
                </span>
                <span className="font-medium text-foreground">28</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cancelled</span>
                <span className="font-medium text-foreground">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Merch revenue</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(41200)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg. trail rating</span>
                <span className="font-medium text-foreground">4.7 ★</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
