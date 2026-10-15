/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  CreditCard,
  ArrowUpRight,
  Clock,
  XCircle,
  RefreshCw,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useFetchAllMpesaReceipts } from "@/hooks/booking/admin/fetchAllMpesaReceipts";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUpdatePaymentAndBookingStatus } from "@/hooks/booking/admin/updatePaymentAndBookingStatus";

export type PaymentStatus =
  | "pending"
  | "partially_paid"
  | "paid"
  | "failed"
  | "refunded";
type StatusFilter = "all" | PaymentStatus;

export const statusConfig: Record<
  PaymentStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  },
  partially_paid: {
    label: "Partially Paid",
    className: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  },
  paid: {
    label: "Paid",
    className: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  },
  failed: {
    label: "Failed",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  refunded: {
    label: "Refunded",
    className: "bg-purple-500/10 text-purple-700 border-purple-500/20",
  },
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPaymentsPage() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useFetchAllMpesaReceipts();

  const { mutate: updateStatus } = useUpdatePaymentAndBookingStatus();

  const stats = data?.stats ?? {
    totalRevenue: 0,
    pendingRevenue: 0,
    refundedRevenue: 0,
    transactionsCount: 0,
  };

  const allReceipts = data?.allReceipts ?? [];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    return allReceipts.filter((payment) => {
      const matchesSearch =
        !term ||
        payment.userName.toLowerCase().includes(term) ||
        payment.userEmail.toLowerCase().includes(term) ||
        payment.id.toLowerCase().includes(term) ||
        (payment.paymentReceiptId?.toLowerCase().includes(term) ?? false) ||
        payment.title.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "all" || payment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [allReceipts, search, statusFilter]);

  const paidCount = allReceipts.filter(
    (payment) => payment.status === "paid",
  ).length;

  const pendingCount = allReceipts.filter(
    (payment) => payment.status === "pending",
  ).length;

  const failedCount = allReceipts.filter(
    (payment) => payment.status === "failed",
  ).length;
  const refundedCount = allReceipts.filter(
    (payment) => payment.status === "refunded",
  ).length;
  const partialPaymentCount = allReceipts.filter(
    (payment) => payment.status === "partially_paid",
  ).length;

  if (axios.isAxiosError(error)) {
    console.error(error.response);
  }
  console.log(error);
  return (
    <div className=" py-8 px-6">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Payments
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track booking payments, receipts, and transaction status.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => void refetch()}
          disabled={isFetching}
        >
          <RefreshCw
            className={cn("mr-2 h-4 w-4", isFetching && "animate-spin")}
          />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={<ArrowUpRight className="h-4 w-4" />}
        />
        <StatCard
          label="Pending payments"
          value={formatCurrency(stats.pendingRevenue)}
          icon={<Clock className="h-4 w-4" />}
          valueClassName="text-amber-600"
        />
        <StatCard
          label="Refunded revenue"
          value={formatCurrency(stats.refundedRevenue)}
          icon={<RefreshCw className="h-4 w-4" />}
          valueClassName="text-blue-600"
        />
        <StatCard
          label="Transactions"
          value={String(stats.transactionsCount)}
          icon={<CreditCard className="h-4 w-4" />}
        />
      </div>

      {/* Status summary */}
      <div className="mb-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
        <Badge variant="outline">Confirmed: {paidCount}</Badge>
        <Badge variant="outline">Pending: {pendingCount}</Badge>
        <Badge variant="outline">Cancelled: {failedCount}</Badge>
        <Badge variant="outline">Cancelled: {partialPaymentCount}</Badge>
        <Badge variant="outline">Cancelled: {refundedCount}</Badge>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search customer, booking, receipt, or trail..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="pl-9"
          />
        </div>

        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as StatusFilter)}
        >
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {isLoading ? (
          <div className="flex min-h-48 items-center justify-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Loading payments...
          </div>
        ) : isError ? (
          <div className="flex min-h-48 flex-col items-center justify-center gap-3 p-6 text-center">
            <XCircle className="h-8 w-8 text-destructive" />
            <p className="text-sm font-medium">Could not load payments.</p>
            <p className="text-xs text-muted-foreground">
              {error instanceof Error
                ? error.message
                : "An unexpected error occurred."}
            </p>
            <Button variant="outline" size="sm" onClick={() => void refetch()}>
              Try again
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking / Receipt</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Trail / Product</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center">
                    <p className="text-sm text-muted-foreground">
                      {allReceipts.length === 0
                        ? "No payment records found."
                        : "No payments match your search or filters."}
                    </p>
                    {(search || statusFilter !== "all") && (
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => {
                          setSearch("");
                          setStatusFilter("all");
                        }}
                      >
                        Clear filters
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <p className="font-medium text-foreground">
                        {payment.receiptNumber}
                      </p>
                      <p className="font-mono text-xs text-muted-foreground">
                        Receipt: {payment.paymentReceiptId ?? "Not available"}
                      </p>
                    </TableCell>

                    <TableCell>
                      <p className="font-medium text-foreground">
                        {payment.userName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {payment.userEmail}
                      </p>
                    </TableCell>

                    <TableCell>
                      <p className="line-clamp-2 text-sm text-foreground">
                        {payment.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Booking ID: {payment.id}
                      </p>
                    </TableCell>

                    <TableCell>
                      <span className="text-sm">M-Pesa</span>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1.5 font-medium">
                        {payment.status === "paid" && (
                          <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
                        )}
                        {payment.status === "failed" && (
                          <XCircle className="h-3.5 w-3.5 text-destructive" />
                        )}
                        <span
                          className={cn(
                            payment.status === "paid" && "text-emerald-700",
                            payment.status === "failed" &&
                              "text-muted-foreground line-through",
                          )}
                        >
                          {formatCurrency(payment.amount)}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "font-medium",
                          statusConfig[payment.status]?.className,
                        )}
                      >
                        {statusConfig[payment.status]?.label}
                      </Badge>
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                      {formatDate(payment.paymentDate)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>View booking</DropdownMenuItem>
                          {payment.status === "paid" && (
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() =>
                                updateStatus({
                                  bookingId: payment.bookingId,
                                  status: "refunded",
                                })
                              }
                            >
                              Issue refund
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() =>
                              updateStatus({
                                bookingId: payment.bookingId,
                                status: "paid",
                              })
                            }
                          >
                            Mark as paid
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              updateStatus({
                                bookingId: payment.bookingId,
                                status: "partially_paid",
                              })
                            }
                          >
                            Mark as paid partially
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Showing {filtered.length} of {allReceipts.length} records
      </p>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  valueClassName,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <span className="text-muted-foreground">{icon}</span>
      </div>
      <p
        className={cn(
          "mt-2 text-xl font-semibold text-foreground sm:text-2xl",
          valueClassName,
        )}
      >
        {value}
      </p>
    </div>
  );
}
