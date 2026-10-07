"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  Info,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const mockBooking = {
  id: "bk_001",
  expeditionId: "exp_1",
  expeditionTitle: "Maasai Mara Sunrise Safari",
  location: "Maasai Mara",
  departureDate: "2026-11-15",
  returnDate: "2026-11-17",
  numberOfParticipants: 2,
  bookingStatus: "confirmed",
  paymentStatus: "partially_paid",
  totalAmount: 45000,
  amountPaid: 20000,
};

export default function PaymentPage() {
  const [phone, setPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const amountDue = mockBooking.totalAmount - mockBooking.amountPaid;
  const isFullyPaid = amountDue <= 0;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border/50 bg-linear-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-3xl px-4 py-8 sm:py-10">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Link href="/orders">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Complete Payment
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Order #{mockBooking.id.slice(-6).toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left – Booking Summary */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold leading-snug">
                    {mockBooking.expeditionTitle}
                  </h3>
                  <div className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" />
                      {mockBooking.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(mockBooking.departureDate).toLocaleDateString(
                        "en-KE",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}{" "}
                      –{" "}
                      {new Date(mockBooking.returnDate).toLocaleDateString(
                        "en-KE",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5" />
                      {mockBooking.numberOfParticipants} traveler
                      {mockBooking.numberOfParticipants > 1 ? "s" : ""}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total amount</span>
                    <span className="font-medium">
                      KES {mockBooking.totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Already paid</span>
                    <span className="font-medium text-success">
                      KES {mockBooking.amountPaid.toLocaleString()}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-base font-semibold">
                    <span>Amount due</span>
                    <span className="text-primary">
                      KES {amountDue.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Badge
                  className={cn(
                    "w-full justify-center py-1.5",
                    mockBooking.paymentStatus === "partially_paid"
                      ? "bg-warning/15 text-warning hover:bg-warning/20"
                      : "bg-destructive/15 text-destructive hover:bg-destructive/20",
                  )}
                >
                  {mockBooking.paymentStatus === "partially_paid"
                    ? "Partially Paid"
                    : "Payment Pending"}
                </Badge>
              </CardContent>
            </Card>

            <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/30 p-4 text-sm">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-medium">Secure payment</p>
                <p className="mt-0.5 text-muted-foreground">
                  All transactions are processed securely via M-Pesa.
                </p>
              </div>
            </div>
          </div>

          {/* Right – Payment Form */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Smartphone className="h-5 w-5 text-primary" />
                  Pay with M-Pesa
                </CardTitle>
                <CardDescription>
                  Enter the phone number that will receive the STK push
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {isFullyPaid ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <CheckCircle2 className="mb-3 h-12 w-12 text-success" />
                    <h3 className="text-lg font-semibold">
                      Already fully paid
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      This booking has no outstanding balance.
                    </p>
                    <Button className="mt-6">
                      <Link href="/orders">Back to Orders</Link>
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Amount highlight */}
                    <div className="rounded-xl bg-primary/5 px-5 py-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        You are about to pay
                      </p>
                      <p className="mt-1 text-3xl font-bold tracking-tight text-primary">
                        KES {amountDue.toLocaleString()}
                      </p>
                    </div>

                    {/* Phone input */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">M-Pesa phone number</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          +254
                        </span>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="7XX XXX XXX"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="h-12 pl-14 text-base"
                          maxLength={9}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Enter the number registered with M-Pesa (without the
                        leading 0)
                      </p>
                    </div>

                    {/* Info */}
                    <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/20 p-3 text-sm">
                      <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        You will receive an STK push on your phone. Enter your
                        M-Pesa PIN to complete the payment.
                      </p>
                    </div>

                    {/* Pay button */}
                    <Button
                      size="lg"
                      className="h-12 w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                      onClick={handlePay}
                      disabled={!phone || phone.length < 9 || isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4" />
                          Pay KES {amountDue.toLocaleString()}
                        </>
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      By proceeding you agree to our terms of service
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
