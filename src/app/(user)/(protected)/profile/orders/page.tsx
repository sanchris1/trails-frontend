"use client";

import Link from "next/link";
import {
  Calendar,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  Receipt,
  ArrowRight,
  Package,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Mock data based on your schema
const mockOrders = [
  {
    id: "bk_001",
    expeditionId: "exp_1",
    expeditionTitle: "Maasai Mara Sunrise Safari",
    location: "Maasai Mara",
    createdAt: "2026-09-12",
    departureDate: "2026-11-15",
    numberOfParticipants: 2,
    bookingStatus: "confirmed",
    paymentStatus: "partially_paid",
    totalAmount: 45000,
    amountPaid: 20000,
    hasReceipt: false,
  },
  {
    id: "bk_002",
    expeditionId: "exp_2",
    expeditionTitle: "Mount Kenya Summit Trek",
    location: "Mount Kenya",
    createdAt: "2026-08-28",
    departureDate: "2026-12-02",
    numberOfParticipants: 1,
    bookingStatus: "confirmed",
    paymentStatus: "paid",
    totalAmount: 68000,
    amountPaid: 68000,
    hasReceipt: true,
  },
  {
    id: "bk_003",
    expeditionId: "exp_3",
    expeditionTitle: "Diani Beach Cultural Escape",
    location: "Diani",
    createdAt: "2026-10-01",
    departureDate: "2027-01-10",
    numberOfParticipants: 3,
    bookingStatus: "pending",
    paymentStatus: "pending",
    totalAmount: 32000,
    amountPaid: 0,
    hasReceipt: false,
  },
  {
    id: "bk_004",
    expeditionId: "exp_4",
    expeditionTitle: "Amboseli Elephant Walk",
    location: "Amboseli",
    createdAt: "2026-07-15",
    departureDate: "2026-09-20",
    numberOfParticipants: 2,
    bookingStatus: "confirmed",
    paymentStatus: "paid",
    totalAmount: 28000,
    amountPaid: 28000,
    hasReceipt: true,
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
          Pending
        </Badge>
      );
    case "failed":
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertCircle className="h-3.5 w-3.5" />
          Failed
        </Badge>
      );
    case "refunded":
      return (
        <Badge variant="secondary" className="gap-1">
          Refunded
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export default function OrdersPage() {
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
                My Orders
              </h1>
              <p className="mt-1 text-muted-foreground">
                Payment history and receipts for your bookings
              </p>
            </div>

            <Button variant="outline" size="sm">
              <Link href="/profile">Back to Profile</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Orders List */}
      <section className="container mx-auto max-w-5xl px-4 py-10">
        {mockOrders.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <Package className="mb-4 h-12 w-12 text-muted-foreground/40" />
              <h3 className="text-lg font-medium">No orders yet</h3>
              <p className="mt-1 text-muted-foreground">
                Your booking payments will appear here.
              </p>
              <Button className="mt-6">
                <Link href="/expeditions">Browse Expeditions</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <Card
                key={order.id}
                className="overflow-hidden transition-shadow hover:shadow-md"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    {/* Left accent */}
                    <div
                      className={cn(
                        "h-1.5 w-full sm:h-auto sm:w-1.5",
                        needsPayment(order.paymentStatus)
                          ? "bg-warning"
                          : order.paymentStatus === "paid"
                            ? "bg-success"
                            : "bg-muted",
                      )}
                    />

                    <div className="flex flex-1 flex-col gap-5 p-5">
                      {/* Top row */}
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground">
                              Order #{order.id.slice(-6).toUpperCase()}
                            </span>
                            {getPaymentBadge(order.paymentStatus)}
                          </div>
                          <h3 className="text-lg font-semibold leading-snug">
                            {order.expeditionTitle}
                          </h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5" />
                              {order.location}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              Departs{" "}
                              {new Date(order.departureDate).toLocaleDateString(
                                "en-KE",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Amount */}
                        <div className="text-left sm:text-right">
                          <p className="text-xl font-bold text-foreground">
                            KES {order.totalAmount.toLocaleString()}
                          </p>
                          {order.paymentStatus === "partially_paid" && (
                            <p className="text-sm text-muted-foreground">
                              Paid: KES {order.amountPaid.toLocaleString()}
                            </p>
                          )}
                          <p className="mt-1 text-xs text-muted-foreground">
                            Ordered{" "}
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-KE",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        {needsPayment(order.paymentStatus) && (
                          <Button
                            size="sm"
                            className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                          >
                            <Link href={`/bookings/${order.id}/payment`}>
                              <CreditCard className="h-4 w-4" />
                              Complete Payment
                            </Link>
                          </Button>
                        )}

                        {order.hasReceipt && (
                          <Button variant="outline" size="sm">
                            <Link
                              href={`/bookings/${order.id}/receipt`}
                              className="gap-2"
                            >
                              <Receipt className="h-4 w-4" />
                              View Receipt
                            </Link>
                          </Button>
                        )}

                        <Button variant="ghost" size="sm">
                          <Link
                            href={`/expeditions/${order.expeditionId}`}
                            className="gap-1.5"
                          >
                            View Expedition
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
