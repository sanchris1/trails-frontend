"use client";

import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  Package,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Mock data based on your schema (replace with real data later)
const mockBookings = [
  {
    id: "bk_001",
    expeditionId: "exp_1",
    expeditionTitle: "Maasai Mara Sunrise Safari",
    location: "Maasai Mara",
    departureDate: "2026-11-15",
    returnDate: "2026-11-17",
    numberOfParticipants: 2,
    bookingStatus: "confirmed",
    paymentStatus: "partially_paid", // ← needs payment
    totalAmount: 45000,
    amountPaid: 20000,
  },
  {
    id: "bk_002",
    expeditionId: "exp_2",
    expeditionTitle: "Mount Kenya Summit Trek",
    location: "Mount Kenya",
    departureDate: "2026-12-02",
    returnDate: "2026-12-06",
    numberOfParticipants: 1,
    bookingStatus: "confirmed",
    paymentStatus: "paid",
    totalAmount: 68000,
    amountPaid: 68000,
  },
  {
    id: "bk_003",
    expeditionId: "exp_3",
    expeditionTitle: "Diani Beach Cultural Escape",
    location: "Diani",
    departureDate: "2027-01-10",
    returnDate: "2027-01-13",
    numberOfParticipants: 3,
    bookingStatus: "pending",
    paymentStatus: "pending", // ← needs payment
    totalAmount: 32000,
    amountPaid: 0,
  },
  {
    id: "bk_004",
    expeditionId: "exp_4",
    expeditionTitle: "Amboseli Elephant Walk",
    location: "Amboseli",
    departureDate: "2026-09-20",
    returnDate: "2026-09-22",
    numberOfParticipants: 2,
    bookingStatus: "confirmed",
    paymentStatus: "paid",
    totalAmount: 28000,
    amountPaid: 28000,
  },
];

function getPaymentBadge(status: string) {
  switch (status) {
    case "paid":
      return (
        <Badge className="gap-1 bg-success/15 text-success hover:bg-success/20">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Paid
        </Badge>
      );
    case "partially_paid":
      return (
        <Badge className="gap-1 bg-warning/15 text-warning hover:bg-warning/20">
          <Clock className="h-3.5 w-3.5" />
          Partially Paid
        </Badge>
      );
    case "pending":
      return (
        <Badge className="gap-1 bg-destructive/15 text-destructive hover:bg-destructive/20">
          <AlertCircle className="h-3.5 w-3.5" />
          Payment Pending
        </Badge>
      );
    case "failed":
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertCircle className="h-3.5 w-3.5" />
          Payment Failed
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

function getBookingBadge(status: string) {
  switch (status) {
    case "confirmed":
      return (
        <Badge className="bg-primary/15 text-primary hover:bg-primary/20">
          Confirmed
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="secondary" className="bg-muted text-muted-foreground">
          Pending
        </Badge>
      );
    case "cancelled":
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export default function MyAdventuresPage() {
  const needsPayment = (status: string) =>
    status === "pending" || status === "partially_paid";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border/50 bg-linear-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-5xl px-4 py-10 sm:py-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                My Adventures
              </h1>
              <p className="mt-1 text-muted-foreground">
                All the expeditions you’ve booked
              </p>
            </div>

            <Button variant="outline" size="sm">
              <Link href="/profile" className="gap-2">
                Back to Profile
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bookings List */}
      <section className="container mx-auto max-w-5xl px-4 py-10">
        {mockBookings.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <Package className="mb-4 h-12 w-12 text-muted-foreground/40" />
              <h3 className="text-lg font-medium">No adventures yet</h3>
              <p className="mt-1 text-muted-foreground">
                You haven’t booked any expeditions.
              </p>
              <Button className="mt-6">
                <Link href="/expeditions">Explore Expeditions</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {mockBookings.map((booking) => (
              <Card
                key={booking.id}
                className="overflow-hidden transition-shadow hover:shadow-md"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col gap-0 sm:flex-row">
                    {/* Left accent bar */}
                    <div
                      className={cn(
                        "h-1.5 w-full sm:h-auto sm:w-1.5",
                        needsPayment(booking.paymentStatus)
                          ? "bg-warning"
                          : "bg-primary",
                      )}
                    />

                    <div className="flex flex-1 flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                      {/* Main Info */}
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold leading-snug">
                            {booking.expeditionTitle}
                          </h3>
                          {getBookingBadge(booking.bookingStatus)}
                          {getPaymentBadge(booking.paymentStatus)}
                        </div>

                        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            {booking.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {new Date(booking.departureDate).toLocaleDateString(
                              "en-KE",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}{" "}
                            –{" "}
                            {new Date(booking.returnDate).toLocaleDateString(
                              "en-KE",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="h-4 w-4" />
                            {booking.numberOfParticipants}{" "}
                            {booking.numberOfParticipants === 1
                              ? "traveler"
                              : "travelers"}
                          </span>
                        </div>

                        {/* Amount */}
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium text-foreground">
                            KES {booking.totalAmount.toLocaleString()}
                          </span>
                          {booking.paymentStatus === "partially_paid" && (
                            <span className="text-muted-foreground">
                              (Paid: KES {booking.amountPaid.toLocaleString()})
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 sm:items-end">
                        {needsPayment(booking.paymentStatus) && (
                          <Button
                            size="sm"
                            className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                          >
                            <Link href={`/bookings/${booking.id}/payment`}>
                              <CreditCard className="h-4 w-4" />
                              Complete Payment
                            </Link>
                          </Button>
                        )}

                        <Button variant="outline" size="sm">
                          <Link
                            href={`/expeditions/${booking.expeditionId}`}
                            className="gap-1.5"
                          >
                            View Details
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
