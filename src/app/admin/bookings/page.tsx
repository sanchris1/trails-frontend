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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  trailName: string;
  location: string;
  date: string;
  participants: number;
  totalAmount: number;
  status: BookingStatus;
  createdAt: string;
}

const mockBookings: Booking[] = [
  {
    id: "BK-1048",
    customerName: "John Doe",
    customerEmail: "john@email.com",
    trailName: "Mount Longonot Day Hike",
    location: "Naivasha",
    date: "2026-09-20",
    participants: 2,
    totalAmount: 8500,
    status: "confirmed",
    createdAt: "2026-09-15T10:20:00Z",
  },
  {
    id: "BK-1047",
    customerName: "Sarah Wanjiku",
    customerEmail: "sarah@email.com",
    trailName: "Aberdare Weekend Trek",
    location: "Nyeri",
    date: "2026-09-27",
    participants: 4,
    totalAmount: 32000,
    status: "pending",
    createdAt: "2026-09-16T14:05:00Z",
  },
  {
    id: "BK-1046",
    customerName: "James Mwangi",
    customerEmail: "james@email.com",
    trailName: "Hell's Gate Walking Safari",
    location: "Naivasha",
    date: "2026-09-18",
    participants: 1,
    totalAmount: 4500,
    status: "cancelled",
    createdAt: "2026-09-14T09:12:00Z",
  },
  {
    id: "BK-1045",
    customerName: "Grace Akinyi",
    customerEmail: "grace@email.com",
    trailName: "Ngong Hills Sunrise Hike",
    location: "Kajiado",
    date: "2026-09-12",
    participants: 3,
    totalAmount: 12000,
    status: "completed",
    createdAt: "2026-09-08T16:40:00Z",
  },
  {
    id: "BK-1044",
    customerName: "David Otieno",
    customerEmail: "david@email.com",
    trailName: "Mount Longonot Day Hike",
    location: "Naivasha",
    date: "2026-09-22",
    participants: 2,
    totalAmount: 8500,
    status: "confirmed",
    createdAt: "2026-09-13T11:30:00Z",
  },
  {
    id: "BK-1043",
    customerName: "Mary Njeri",
    customerEmail: "mary@email.com",
    trailName: "Karura Forest Nature Walk",
    location: "Nairobi",
    date: "2026-09-19",
    participants: 5,
    totalAmount: 7500,
    status: "pending",
    createdAt: "2026-09-16T08:15:00Z",
  },
];

const statusConfig: Record<
  BookingStatus,
  { label: string; className: string }
> = {
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
  completed: {
    label: "Completed",
    className: "bg-blue-500/10 text-blue-700 border-blue-500/20",
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
  const [bookings] = useState<Booking[]>(mockBookings);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | BookingStatus>(
    "all",
  );

  const filtered = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(search.toLowerCase()) ||
      booking.id.toLowerCase().includes(search.toLowerCase()) ||
      booking.trailName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
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
          onValueChange={(value) =>
            setStatusFilter(value as "all" | BookingStatus)
          }
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
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking</TableHead>
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
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center">
                  <p className="text-sm text-muted-foreground">
                    No bookings found
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <p className="font-medium text-foreground">{booking.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(booking.createdAt)}
                    </p>
                  </TableCell>

                  <TableCell>
                    <p className="font-medium text-foreground">
                      {booking.customerName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {booking.customerEmail}
                    </p>
                  </TableCell>

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

                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      {formatDate(booking.date)}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />
                      {booking.participants}
                    </div>
                  </TableCell>

                  <TableCell className="font-medium">
                    {formatCurrency(booking.totalAmount)}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-medium",
                        statusConfig[booking.status].className,
                      )}
                    >
                      {statusConfig[booking.status].label}
                    </Badge>
                  </TableCell>

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
                        {booking.status === "pending" && (
                          <DropdownMenuItem className="gap-2">
                            Confirm booking
                          </DropdownMenuItem>
                        )}
                        {booking.status !== "cancelled" &&
                          booking.status !== "completed" && (
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
