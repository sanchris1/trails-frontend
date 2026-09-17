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
  Download,
  Calendar,
  TrendingUp,
  Users,
  CreditCard,
  MapPin,
  Package,
} from "lucide-react";

type ReportType =
  | "bookings"
  | "revenue"
  | "participants"
  | "merchandise"
  | "cancellations";

interface ReportItem {
  id: string;
  title: string;
  description: string;
  type: ReportType;
  period: string;
  generatedAt: string;
  status: "ready" | "generating";
}

const mockReports: ReportItem[] = [
  {
    id: "RPT-01",
    title: "Monthly Bookings Summary",
    description:
      "All bookings grouped by trail and status for the selected month.",
    type: "bookings",
    period: "September 2026",
    generatedAt: "2026-09-17T07:00:00Z",
    status: "ready",
  },
  {
    id: "RPT-02",
    title: "Revenue Report",
    description: "Completed payments, refunds, and pending amounts.",
    type: "revenue",
    period: "September 2026",
    generatedAt: "2026-09-17T07:05:00Z",
    status: "ready",
  },
  {
    id: "RPT-03",
    title: "Participants by Expedition",
    description: "Headcount, confirmed vs pending, and capacity utilization.",
    type: "participants",
    period: "Next 30 days",
    generatedAt: "2026-09-16T18:00:00Z",
    status: "ready",
  },
  {
    id: "RPT-04",
    title: "Merchandise Sales",
    description: "Units sold, revenue per product, and low-stock items.",
    type: "merchandise",
    period: "Q3 2026",
    generatedAt: "2026-09-15T12:00:00Z",
    status: "ready",
  },
  {
    id: "RPT-05",
    title: "Cancellations Report",
    description: "Cancelled bookings with reasons and refund status.",
    type: "cancellations",
    period: "September 2026",
    generatedAt: "2026-09-17T06:30:00Z",
    status: "generating",
  },
];

const typeIcons: Record<ReportType, React.ElementType> = {
  bookings: Calendar,
  revenue: CreditCard,
  participants: Users,
  merchandise: Package,
  cancellations: TrendingUp,
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString("en-KE", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminReportsPage() {
  const [period, setPeriod] = useState("this-month");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Reports
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Generate and download operational reports.
          </p>
        </div>

        <Select
          value={period}
          onValueChange={(value) => {
            if (value) setPeriod(value);
          }}
        >
          <SelectTrigger className="w-45">
            <Calendar className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-week">This week</SelectItem>
            <SelectItem value="this-month">This month</SelectItem>
            <SelectItem value="last-month">Last month</SelectItem>
            <SelectItem value="this-quarter">This quarter</SelectItem>
            <SelectItem value="this-year">This year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quick generate */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Bookings report",
            desc: "Status breakdown by trail",
            icon: Calendar,
          },
          {
            title: "Revenue report",
            desc: "Payments & refunds",
            icon: CreditCard,
          },
          {
            title: "Participants report",
            desc: "Per expedition headcount",
            icon: Users,
          },
          {
            title: "Merchandise report",
            desc: "Sales & stock levels",
            icon: Package,
          },
          {
            title: "Trail performance",
            desc: "Popular hikes & ratings",
            icon: MapPin,
          },
          {
            title: "Cancellations",
            desc: "Trends and refund status",
            icon: TrendingUp,
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.title}
              type="button"
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-muted/40"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {item.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Recent reports */}
      <div>
        <h2 className="mb-4 text-sm font-semibold text-foreground">
          Recent reports
        </h2>

        <div className="space-y-3">
          {mockReports.map((report) => {
            const Icon = typeIcons[report.type];
            return (
              <div
                key={report.id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-foreground">
                        {report.title}
                      </p>
                      <Badge
                        variant="outline"
                        className={
                          report.status === "ready"
                            ? "border-emerald-500/30 text-emerald-700 text-[10px]"
                            : "border-amber-500/30 text-amber-700 text-[10px]"
                        }
                      >
                        {report.status === "ready" ? "Ready" : "Generating"}
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {report.description}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {report.period} · Generated{" "}
                      {formatDate(report.generatedAt)}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 w-fit"
                  disabled={report.status !== "ready"}
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
