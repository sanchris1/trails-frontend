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
  Eye,
  MoreHorizontal,
  Calendar,
  Users,
  MapPin,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useFetchAllBookings } from "@/hooks/booking/admin/fetchAllBookings";
import FetchingProductsPage from "@/components/common/FetchingProductsPage";

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function AdminBookingsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, isError: error, isLoading: loading } = useFetchAllBookings();

  const bookings = data?.bookingsWithParticipants;

  if (!bookings) return <p>No data found</p>;

  const filtered = bookings?.filter((booking) => {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      (booking.customerName?.toLowerCase() ?? "").includes(searchTerm) ||
      (booking.customerEmail?.toLowerCase() ?? "").includes(searchTerm) ||
      booking.bookingId.toLowerCase().includes(searchTerm) ||
      booking.trailName.toLowerCase().includes(searchTerm) ||
      booking.location.toLowerCase().includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || booking.bookingStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.bookingStatus === "pending").length,
    confirmed: bookings.filter((b) => b.bookingStatus === "confirmed").length,
    cancelled: bookings.filter((b) => b.bookingStatus === "cancelled").length,
  };

  if (loading) return <FetchingProductsPage />;

  return (
    <div className=" px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Bookings
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage hike bookings, cancellations, and customer details.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">Total</p>

          <p className="mt-1 text-2xl font-semibold text-foreground">
            {stats.total}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">Pending</p>

          <p className="mt-1 text-2xl font-semibold text-amber-600">
            {stats.pending}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">Confirmed</p>

          <p className="mt-1 text-2xl font-semibold text-emerald-600">
            {stats.confirmed}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">Cancelled</p>

          <p className="mt-1 text-2xl font-semibold text-destructive">
            {stats.cancelled}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search by name, booking ID, or trail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as "all")}
        >
          <SelectTrigger className="w-40">
            <Filter className="mr-2 h-4 w-4" />

            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Trail</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>People</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12.5" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading bookings...
                  </div>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center">
                  <div className="space-y-2">
                    <p className="text-sm text-destructive">{error}</p>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.reload()}
                    >
                      Try again
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center">
                  <p className="text-sm text-muted-foreground">
                    No bookings found
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((booking) => (
                <TableRow key={booking.bookingId}>
                  {/* Booking */}

                  {/* Customer */}
                  <TableCell>
                    <p className="font-medium text-foreground">
                      {booking.customerName || "Unknown customer"}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {booking.customerEmail || "No email"}
                    </p>
                  </TableCell>

                  {/* Trail */}
                  <TableCell>
                    <div className="flex items-start gap-1.5">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />

                      <div>
                        <p className="text-sm text-foreground">
                          {booking.trailName}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {booking.location}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Date */}
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />

                      {formatDate(booking.departureDate)}
                    </div>
                  </TableCell>

                  {/* Participants */}
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />

                      {booking.numberOfParticipants}

                      <span className="text-xs text-muted-foreground">
                        / {booking.totalSlots}
                      </span>
                    </div>
                  </TableCell>

                  {/* Amount */}
                  <TableCell className="font-medium">
                    {formatCurrency(booking.totalAmount)}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-medium",
                        statusConfig[booking.bookingStatus].className,
                      )}
                    >
                      {statusConfig[booking.bookingStatus].label}
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="h-4 w-4" />
                          View details
                        </DropdownMenuItem>

                        {booking.bookingStatus === "pending" && (
                          <DropdownMenuItem className="gap-2">
                            Confirm booking
                          </DropdownMenuItem>
                        )}

                        {booking.bookingStatus !== "cancelled" && (
                          <DropdownMenuItem className="gap-2 text-destructive">
                            Cancel booking
                          </DropdownMenuItem>
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
