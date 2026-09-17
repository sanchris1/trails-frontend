"use client";

import { useState, useMemo } from "react";
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

type ParticipantStatus = "confirmed" | "pending" | "cancelled";

interface Participant {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  bookingId: string;
  status: ParticipantStatus;
  paid: boolean;
}

interface Expedition {
  id: string;
  name: string;
  location: string;
  date: string;
  capacity: number;
  participants: Participant[];
}

const mockExpeditions: Expedition[] = [
  {
    id: "EXP-01",
    name: "Mount Longonot Day Hike",
    location: "Naivasha",
    date: "2026-09-20",
    capacity: 20,
    participants: [
      {
        id: "P-101",
        fullName: "John Doe",
        email: "john@email.com",
        phone: "+254 712 345 678",
        bookingId: "BK-1048",
        status: "confirmed",
        paid: true,
      },
      {
        id: "P-102",
        fullName: "Mary Njeri",
        email: "mary@email.com",
        phone: "+254 722 111 222",
        bookingId: "BK-1048",
        status: "confirmed",
        paid: true,
      },
      {
        id: "P-103",
        fullName: "David Otieno",
        email: "david@email.com",
        bookingId: "BK-1044",
        status: "confirmed",
        paid: true,
      },
      {
        id: "P-104",
        fullName: "Lucy Wambui",
        email: "lucy@email.com",
        phone: "+254 733 444 555",
        bookingId: "BK-1050",
        status: "pending",
        paid: false,
      },
    ],
  },
  {
    id: "EXP-02",
    name: "Aberdare Weekend Trek",
    location: "Nyeri",
    date: "2026-09-27",
    capacity: 12,
    participants: [
      {
        id: "P-201",
        fullName: "Sarah Wanjiku",
        email: "sarah@email.com",
        phone: "+254 700 111 222",
        bookingId: "BK-1047",
        status: "confirmed",
        paid: true,
      },
      {
        id: "P-202",
        fullName: "James Mwangi",
        email: "james@email.com",
        bookingId: "BK-1047",
        status: "confirmed",
        paid: true,
      },
      {
        id: "P-203",
        fullName: "Grace Akinyi",
        email: "grace@email.com",
        phone: "+254 711 333 444",
        bookingId: "BK-1047",
        status: "confirmed",
        paid: true,
      },
      {
        id: "P-204",
        fullName: "Peter Kamau",
        email: "peter@email.com",
        bookingId: "BK-1051",
        status: "pending",
        paid: false,
      },
    ],
  },
  {
    id: "EXP-03",
    name: "Ngong Hills Sunrise Hike",
    location: "Kajiado",
    date: "2026-09-22",
    capacity: 25,
    participants: [
      {
        id: "P-301",
        fullName: "Anne Chebet",
        email: "anne@email.com",
        phone: "+254 722 555 666",
        bookingId: "BK-1052",
        status: "confirmed",
        paid: true,
      },
      {
        id: "P-302",
        fullName: "Brian Ochieng",
        email: "brian@email.com",
        bookingId: "BK-1053",
        status: "cancelled",
        paid: false,
      },
    ],
  },
  {
    id: "EXP-04",
    name: "Hell's Gate Walking Safari",
    location: "Naivasha",
    date: "2026-09-18",
    capacity: 15,
    participants: [],
  },
];

const statusConfig: Record<
  ParticipantStatus,
  { label: string; className: string }
> = {
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
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-KE", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminParticipantsPage() {
  const [expeditions] = useState<Expedition[]>(mockExpeditions);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "EXP-01": true,
    "EXP-02": true,
  });

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredExpeditions = useMemo(() => {
    if (!search.trim()) return expeditions;

    const q = search.toLowerCase();
    return expeditions
      .map((exp) => ({
        ...exp,
        participants: exp.participants.filter(
          (p) =>
            p.fullName.toLowerCase().includes(q) ||
            p.email.toLowerCase().includes(q) ||
            p.bookingId.toLowerCase().includes(q) ||
            exp.name.toLowerCase().includes(q),
        ),
      }))
      .filter(
        (exp) =>
          exp.participants.length > 0 || exp.name.toLowerCase().includes(q),
      );
  }, [expeditions, search]);

  const totalParticipants = expeditions.reduce(
    (sum, exp) =>
      sum + exp.participants.filter((p) => p.status !== "cancelled").length,
    0,
  );

  const confirmedCount = expeditions.reduce(
    (sum, exp) =>
      sum + exp.participants.filter((p) => p.status === "confirmed").length,
    0,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Participants
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View hikers grouped by the expedition they’re joining.
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
          <p className="text-xs font-medium text-muted-foreground">Confirmed</p>
          <p className="mt-1 text-2xl font-semibold text-emerald-600">
            {confirmedCount}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 relative max-w-sm">
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
            const activeCount = exp.participants.filter(
              (p) => p.status !== "cancelled",
            ).length;
            const spotsLeft = exp.capacity - activeCount;

            return (
              <div
                key={exp.id}
                className="rounded-xl border border-border bg-card overflow-hidden"
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
                        {exp.name}
                      </h2>
                      <Badge variant="secondary" className="text-[10px]">
                        {activeCount}/{exp.capacity} spots
                      </Badge>
                      {spotsLeft <= 3 && spotsLeft > 0 && (
                        <Badge
                          variant="outline"
                          className="text-[10px] border-amber-500/30 text-amber-700"
                        >
                          Almost full
                        </Badge>
                      )}
                      {spotsLeft <= 0 && (
                        <Badge
                          variant="outline"
                          className="text-[10px] border-destructive/30 text-destructive"
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
                        {formatDate(exp.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {exp.participants.length} listed
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
                        {exp.participants.map((person) => (
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
                                    statusConfig[person.status].className,
                                  )}
                                >
                                  {statusConfig[person.status].label}
                                </Badge>
                                {person.paid ? (
                                  <Badge
                                    variant="outline"
                                    className="text-[10px] border-emerald-500/30 text-emerald-700"
                                  >
                                    Paid
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="text-[10px] border-amber-500/30 text-amber-700"
                                  >
                                    Unpaid
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
                        ))}
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
