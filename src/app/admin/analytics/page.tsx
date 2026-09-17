"use client";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  CreditCard,
  Star,
  MapPin,
  Package,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(amount);
}

const kpiCards = [
  {
    label: "Revenue",
    value: formatCurrency(186500),
    change: "+12.4%",
    positive: true,
    icon: CreditCard,
  },
  {
    label: "Bookings",
    value: "48",
    change: "+8.1%",
    positive: true,
    icon: Calendar,
  },
  {
    label: "Participants",
    value: "126",
    change: "+15.2%",
    positive: true,
    icon: Users,
  },
  {
    label: "Avg. rating",
    value: "4.7",
    change: "-0.1",
    positive: false,
    icon: Star,
  },
];

const topTrails = [
  { name: "Mount Longonot Day Hike", bookings: 18, revenue: 76500 },
  { name: "Ngong Hills Sunrise Hike", bookings: 14, revenue: 56000 },
  { name: "Aberdare Weekend Trek", bookings: 9, revenue: 144000 },
  { name: "Hell's Gate Walking Safari", bookings: 7, revenue: 31500 },
];

const bookingsByStatus = [
  { label: "Confirmed", value: 28, color: "bg-emerald-500" },
  { label: "Pending", value: 11, color: "bg-amber-500" },
  { label: "Completed", value: 6, color: "bg-blue-500" },
  { label: "Cancelled", value: 3, color: "bg-destructive" },
];

const monthlyRevenue = [
  { month: "Apr", amount: 92000 },
  { month: "May", amount: 110000 },
  { month: "Jun", amount: 98000 },
  { month: "Jul", amount: 135000 },
  { month: "Aug", amount: 152000 },
  { month: "Sep", amount: 186500 },
];

const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.amount));

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState("this-month");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Analytics
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Overview of bookings, revenue, and trail performance.
          </p>
        </div>

        <Select
          value={period}
          onValueChange={(value) => {
            if (value) setPeriod(value);
          }}
        >
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-week">This week</SelectItem>
            <SelectItem value="this-month">This month</SelectItem>
            <SelectItem value="last-month">Last month</SelectItem>
            <SelectItem value="this-quarter">This quarter</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpiCards.map((kpi) => {
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
              <div className="mt-1 flex items-center gap-1 text-xs">
                {kpi.positive ? (
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                )}
                <span
                  className={
                    kpi.positive ? "text-emerald-600" : "text-destructive"
                  }
                >
                  {kpi.change}
                </span>
                <span className="text-muted-foreground">vs last period</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Revenue chart (simple bars) */}
        <div className="lg:col-span-3 rounded-xl border border-border bg-card p-5">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-foreground">Revenue trend</h2>
              <p className="text-xs text-muted-foreground">Last 6 months</p>
            </div>
            <Badge variant="secondary" className="text-[10px]">
              KES
            </Badge>
          </div>

          <div className="flex items-end gap-3 h-48">
            {monthlyRevenue.map((item) => (
              <div
                key={item.month}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <span className="text-[10px] text-muted-foreground">
                  {formatCurrency(item.amount).replace("KES", "").trim()}
                </span>
                <div
                  className="w-full rounded-t-md bg-primary/80 transition-all"
                  style={{
                    height: `${(item.amount / maxRevenue) * 100}%`,
                    minHeight: "8px",
                  }}
                />
                <span className="text-xs font-medium text-muted-foreground">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bookings by status */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <h2 className="font-semibold text-foreground">Bookings by status</h2>
          <p className="mb-5 text-xs text-muted-foreground">This month</p>

          <div className="space-y-4">
            {bookingsByStatus.map((item) => {
              const total = bookingsByStatus.reduce((s, i) => s + i.value, 0);
              const pct = Math.round((item.value / total) * 100);
              return (
                <div key={item.label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-foreground">{item.label}</span>
                    <span className="text-muted-foreground">
                      {item.value} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn("h-full rounded-full", item.color)}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top trails + merch snapshot */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground">Top trails</h2>
          </div>

          <ul className="space-y-3">
            {topTrails.map((trail, i) => (
              <li
                key={trail.name}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {trail.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {trail.bookings} bookings
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground whitespace-nowrap">
                  {formatCurrency(trail.revenue)}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground">
              Merchandise snapshot
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">Units sold</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">84</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">Merch revenue</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">
                {formatCurrency(41200)}
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">Low stock items</p>
              <p className="mt-1 text-2xl font-semibold text-amber-600">5</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">Out of stock</p>
              <p className="mt-1 text-2xl font-semibold text-destructive">2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
