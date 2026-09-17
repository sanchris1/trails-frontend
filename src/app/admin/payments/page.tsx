"use client";

import { useState } from "react";
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
  MoreHorizontal,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type PaymentStatus = "completed" | "pending" | "failed" | "refunded";
type PaymentMethod = "mpesa" | "card" | "bank";

interface Payment {
  id: string;
  bookingId: string;
  customerName: string;
  customerEmail: string;
  trailName: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionRef?: string;
  createdAt: string;
}

const mockPayments: Payment[] = [
  {
    id: "PAY-9001",
    bookingId: "BK-1048",
    customerName: "John Doe",
    customerEmail: "john@email.com",
    trailName: "Mount Longonot Day Hike",
    amount: 8500,
    method: "mpesa",
    status: "completed",
    transactionRef: "QGX7K2M91A",
    createdAt: "2026-09-15T10:22:00Z",
  },
  {
    id: "PAY-9002",
    bookingId: "BK-1047",
    customerName: "Sarah Wanjiku",
    customerEmail: "sarah@email.com",
    trailName: "Aberdare Weekend Trek",
    amount: 32000,
    method: "card",
    status: "pending",
    createdAt: "2026-09-16T14:08:00Z",
  },
  {
    id: "PAY-9003",
    bookingId: "BK-1046",
    customerName: "James Mwangi",
    customerEmail: "james@email.com",
    trailName: "Hell's Gate Walking Safari",
    amount: 4500,
    method: "mpesa",
    status: "refunded",
    transactionRef: "QGX7K2M88B",
    createdAt: "2026-09-14T09:15:00Z",
  },
  {
    id: "PAY-9004",
    bookingId: "BK-1045",
    customerName: "Grace Akinyi",
    customerEmail: "grace@email.com",
    trailName: "Ngong Hills Sunrise Hike",
    amount: 12000,
    method: "mpesa",
    status: "completed",
    transactionRef: "QGX7K2M70C",
    createdAt: "2026-09-08T16:42:00Z",
  },
  {
    id: "PAY-9005",
    bookingId: "BK-1044",
    customerName: "David Otieno",
    customerEmail: "david@email.com",
    trailName: "Mount Longonot Day Hike",
    amount: 8500,
    method: "bank",
    status: "completed",
    transactionRef: "BNK-55201",
    createdAt: "2026-09-13T11:35:00Z",
  },
  {
    id: "PAY-9006",
    bookingId: "BK-1043",
    customerName: "Mary Njeri",
    customerEmail: "mary@email.com",
    trailName: "Karura Forest Nature Walk",
    amount: 7500,
    method: "mpesa",
    status: "failed",
    transactionRef: "QGX7K2M55D",
    createdAt: "2026-09-16T08:18:00Z",
  },
  {
    id: "PAY-9007",
    bookingId: "BK-1042",
    customerName: "Peter Kamau",
    customerEmail: "peter@email.com",
    trailName: "Ngong Hills Sunrise Hike",
    amount: 4000,
    method: "card",
    status: "completed",
    transactionRef: "CARD-88921",
    createdAt: "2026-09-11T13:00:00Z",
  },
];

const statusConfig: Record<
  PaymentStatus,
  { label: string; className: string }
> = {
  completed: {
    label: "Completed",
    className: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  },
  failed: {
    label: "Failed",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  refunded: {
    label: "Refunded",
    className: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  },
};

const methodLabels: Record<PaymentMethod, string> = {
  mpesa: "M-Pesa",
  card: "Card",
  bank: "Bank transfer",
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPaymentsPage() {
  const [payments] = useState<Payment[]>(mockPayments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | PaymentStatus>(
    "all",
  );
  const [methodFilter, setMethodFilter] = useState<"all" | PaymentMethod>(
    "all",
  );

  const filtered = payments.filter((p) => {
    const matchesSearch =
      p.customerName.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.bookingId.toLowerCase().includes(search.toLowerCase()) ||
      p.transactionRef?.toLowerCase().includes(search.toLowerCase()) ||
      p.trailName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || p.status === statusFilter;

    const matchesMethod = methodFilter === "all" || p.method === methodFilter;

    return matchesSearch && matchesStatus && matchesMethod;
  });

  const completedPayments = payments.filter((p) => p.status === "completed");
  const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);
  const refundedAmount = payments
    .filter((p) => p.status === "refunded")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Payments
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track booking payments, refunds, and transaction status.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">
            Total revenue
          </p>
          <p className="mt-1 text-xl font-semibold text-foreground sm:text-2xl">
            {formatCurrency(totalRevenue)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">Pending</p>
          <p className="mt-1 text-xl font-semibold text-amber-600 sm:text-2xl">
            {formatCurrency(pendingAmount)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">Refunded</p>
          <p className="mt-1 text-xl font-semibold text-blue-600 sm:text-2xl">
            {formatCurrency(refundedAmount)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">
            Transactions
          </p>
          <p className="mt-1 text-xl font-semibold text-foreground sm:text-2xl">
            {payments.length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by customer, booking, ref, or trail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-3">
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as "all" | PaymentStatus)}
          >
            <SelectTrigger className="w-35">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={methodFilter}
            onValueChange={(v) => setMethodFilter(v as "all" | PaymentMethod)}
          >
            <SelectTrigger className="w-37.5">
              <CreditCard className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All methods</SelectItem>
              <SelectItem value="mpesa">M-Pesa</SelectItem>
              <SelectItem value="card">Card</SelectItem>
              <SelectItem value="bank">Bank transfer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Trail / Booking</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-12.5" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center">
                  <p className="text-sm text-muted-foreground">
                    No payments found
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <p className="font-medium text-foreground">{payment.id}</p>
                    {payment.transactionRef && (
                      <p className="text-xs text-muted-foreground font-mono">
                        {payment.transactionRef}
                      </p>
                    )}
                  </TableCell>

                  <TableCell>
                    <p className="font-medium text-foreground">
                      {payment.customerName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {payment.customerEmail}
                    </p>
                  </TableCell>

                  <TableCell>
                    <p className="text-sm text-foreground line-clamp-1">
                      {payment.trailName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {payment.bookingId}
                    </p>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">
                      {methodLabels[payment.method]}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5 font-medium">
                      {payment.status === "refunded" ? (
                        <ArrowDownLeft className="h-3.5 w-3.5 text-blue-600" />
                      ) : payment.status === "completed" ? (
                        <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
                      ) : null}
                      <span
                        className={cn(
                          payment.status === "refunded" && "text-blue-600",
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
                        statusConfig[payment.status].className,
                      )}
                    >
                      {statusConfig[payment.status].label}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatDate(payment.createdAt)}
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>View booking</DropdownMenuItem>
                        {payment.status === "completed" && (
                          <DropdownMenuItem className="text-destructive">
                            Issue refund
                          </DropdownMenuItem>
                        )}
                        {payment.status === "pending" && (
                          <DropdownMenuItem>Mark as paid</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
