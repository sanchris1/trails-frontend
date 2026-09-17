"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Users,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronRight,
  Mail,
  Phone,
  MoreHorizontal,
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
  confirmed: {
    label: "Confirmed",
    className: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
} as const;

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-KE", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminParticipantsPage() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const { data, isLoading } = useFetchAllBookings();

  if (isLoading) {
    return <FetchingProductsPage />;
  }

  if (!data?.bookingsWithParticipants) {
    return <p>Not found</p>;
  }

  const bookings = data.bookingsWithParticipants;

  const expeditionMap = new Map<
    string,
    {
      id: string;
      title: string;
      location: string;
      departureDate: string;
      totalSlots: number;
      slotsLeft: number;
      bookings: typeof bookings;
      participants: (typeof bookings)[number]["participants"];
    }
  >();

  bookings.forEach((booking) => {
    const expeditionKey = `${booking.title}-${booking.location}-${booking.departureDate}`;

    const existing = expeditionMap.get(expeditionKey);

    if (existing) {
      existing.bookings.push(booking);
      existing.participants.push(...booking.participants);
    } else {
      expeditionMap.set(expeditionKey, {
        id: expeditionKey,
        title: booking.title,
        location: booking.location,
        departureDate: booking.departureDate,
        totalSlots: booking.totalSlots,
        slotsLeft: booking.slotsLeft,
        bookings: [booking],
        participants: [...booking.participants],
      });
    }
  });

  const expeditions = Array.from(expeditionMap.values());

  const filteredExpeditions = expeditions
    .map((exp) => {
      if (!search.trim()) {
        return exp;
      }

      const q = search.toLowerCase();

      const matchingParticipants = exp.participants.filter(
        (person) =>
          person.fullName.toLowerCase().includes(q) ||
          person.email.toLowerCase().includes(q) ||
          person.phone?.toLowerCase().includes(q) ||
          person.bookingId.toLowerCase().includes(q),
      );

      const expeditionMatches =
        exp.title.toLowerCase().includes(q) ||
        exp.location.toLowerCase().includes(q);

      return {
        ...exp,
        participants: expeditionMatches
          ? exp.participants
          : matchingParticipants,
      };
    })
    .filter((exp) => exp.participants.length > 0);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalParticipants = bookings.reduce(
    (sum, booking) => sum + booking.numberOfParticipants,
    0,
  );

  const confirmedCount = bookings.filter(
    (booking) => booking.bookingStatus === "confirmed",
  ).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Participants
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          View hikers grouped by the expedition they&apos;re joining.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">
            Expeditions
          </p>

          <p className="mt-1 text-2xl font-semibold text-foreground">
            {expeditions.length}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">
            Total participants
          </p>

          <p className="mt-1 text-2xl font-semibold text-foreground">
            {totalParticipants}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">
            Confirmed bookings
          </p>

          <p className="mt-1 text-2xl font-semibold text-emerald-600">
            {confirmedCount}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Search by name, email, booking, or trail..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Grouped list */}
      <div className="space-y-4">
        {filteredExpeditions.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 text-center">
            <Users className="mb-3 h-8 w-8 text-muted-foreground/50" />

            <p className="text-sm font-medium text-foreground">
              No participants found
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Try a different search term.
            </p>
          </div>
        ) : (
          filteredExpeditions.map((exp) => {
            const isOpen = expanded[exp.id] ?? false;

            const activeParticipants = exp.participants.filter((person) => {
              const booking = exp.bookings.find(
                (booking) => booking.bookingId === person.bookingId,
              );

              return booking?.bookingStatus !== "cancelled";
            });

            const activeCount = activeParticipants.length;

            const spotsLeft = exp.slotsLeft;

            return (
              <div
                key={exp.id}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                {/* Expedition header */}
                <button
                  type="button"
                  onClick={() => toggleExpand(exp.id)}
                  className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-muted/40"
                >
                  <div className="text-muted-foreground">
                    {isOpen ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold text-foreground">
                        {exp.title}
                      </h2>

                      <Badge variant="secondary" className="text-[10px]">
                        {activeCount}/{exp.totalSlots} spots
                      </Badge>

                      {spotsLeft <= 3 && spotsLeft > 0 && (
                        <Badge
                          variant="outline"
                          className="border-amber-500/30 text-[10px] text-amber-700"
                        >
                          Almost full
                        </Badge>
                      )}

                      {spotsLeft <= 0 && (
                        <Badge
                          variant="outline"
                          className="border-destructive/30 text-[10px] text-destructive"
                        >
                          Full
                        </Badge>
                      )}
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {exp.location}
                      </span>

                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(exp.departureDate)}
                      </span>

                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {exp.participants.length} listed
                      </span>

                      <span>
                        {spotsLeft} {spotsLeft === 1 ? "spot" : "spots"} left
                      </span>
                    </div>
                  </div>
                </button>

                {/* Participants */}
                {isOpen && (
                  <div className="border-t border-border">
                    {exp.participants.length === 0 ? (
                      <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                        No participants registered yet.
                      </p>
                    ) : (
                      <ul className="divide-y divide-border">
                        {exp.participants.map((person) => {
                          const booking = exp.bookings.find(
                            (booking) => booking.bookingId === person.bookingId,
                          );

                          const bookingStatus =
                            booking?.bookingStatus ?? "pending";

                          const paymentStatus =
                            booking?.paymentStatus ?? "pending";

                          const status =
                            statusConfig[
                              bookingStatus as keyof typeof statusConfig
                            ] ?? statusConfig.pending;

                          return (
                            <li
                              key={person.id}
                              className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                            >
                              <div className="min-w-0 space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <p className="font-medium text-foreground">
                                    {person.fullName}
                                  </p>

                                  <Badge
                                    variant="outline"
                                    className={cn(
                                      "text-[10px] font-medium",
                                      status.className,
                                    )}
                                  >
                                    {status.label}
                                  </Badge>

                                  {paymentStatus === "paid" ? (
                                    <Badge
                                      variant="outline"
                                      className="border-emerald-500/30 text-[10px] text-emerald-700"
                                    >
                                      Paid
                                    </Badge>
                                  ) : (
                                    <Badge
                                      variant="outline"
                                      className="border-amber-500/30 text-[10px] text-amber-700"
                                    >
                                      {paymentStatus}
                                    </Badge>
                                  )}
                                </div>

                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Mail className="h-3 w-3" />
                                    {person.email}
                                  </span>

                                  {person.phone && (
                                    <span className="flex items-center gap-1">
                                      <Phone className="h-3 w-3" />
                                      {person.phone}
                                    </span>
                                  )}

                                  <span>Booking: {person.bookingId}</span>
                                </div>
                              </div>

                              <DropdownMenu>
                                <DropdownMenuTrigger>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 shrink-0"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    View booking
                                  </DropdownMenuItem>

                                  <DropdownMenuItem>
                                    Send message
                                  </DropdownMenuItem>

                                  <DropdownMenuItem className="text-destructive">
                                    Remove from list
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
