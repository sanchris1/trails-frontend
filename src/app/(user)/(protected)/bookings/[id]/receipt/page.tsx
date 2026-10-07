"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  MapPin,
  Calendar,
  Users,
  Receipt,
  Printer,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Mock data (replace with real booking + mpesaReceipt data)
const mockReceipt = {
  id: "bk_002",
  receiptNumber: "QWE7X9K2M1",
  expeditionTitle: "Mount Kenya Summit Trek",
  location: "Mount Kenya",
  departureDate: "2026-12-02",
  returnDate: "2026-12-06",
  numberOfParticipants: 1,
  totalAmount: 68000,
  amountPaid: 68000,
  paymentStatus: "paid",
  paidAt: new Date("2026-09-28T16:45:00"),
  customerName: "Amina Wanjiku",
  customerEmail: "amina.wanjiku@example.com",
};

export default function ReceiptPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border/50 bg-linear-to-b from-primary/5 to-background print:hidden">
        <div className="container mx-auto max-w-2xl px-4 py-8 sm:py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Link href="/orders">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Receipt</h1>
                <p className="text-sm text-muted-foreground">
                  Payment confirmation
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Printer className="h-4 w-4" />
                Print
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Receipt Card */}
      <section className="container mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <Card className="overflow-hidden border-border/60 shadow-sm">
          {/* Success banner */}
          <div className="bg-success/10 px-6 py-5 text-center">
            <CheckCircle2 className="mx-auto mb-2 h-10 w-10 text-success" />
            <h2 className="text-lg font-semibold text-success">
              Payment Successful
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Thank you for your payment
            </p>
          </div>

          <CardHeader className="pb-2 pt-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="text-base font-medium text-muted-foreground">
                  Receipt Number
                </CardTitle>
                <p className="mt-0.5 text-xl font-bold tracking-wide">
                  {mockReceipt.receiptNumber}
                </p>
              </div>
              <Badge className="bg-success/15 text-success hover:bg-success/20">
                Paid
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pb-8">
            {/* Customer */}
            <div>
              <p className="text-sm text-muted-foreground">Billed to</p>
              <p className="font-medium">{mockReceipt.customerName}</p>
              <p className="text-sm text-muted-foreground">
                {mockReceipt.customerEmail}
              </p>
            </div>

            <Separator />

            {/* Expedition details */}
            <div className="space-y-3">
              <h3 className="font-semibold">{mockReceipt.expeditionTitle}</h3>

              <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {mockReceipt.location}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {mockReceipt.numberOfParticipants} traveler
                  {mockReceipt.numberOfParticipants > 1 ? "s" : ""}
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(mockReceipt.departureDate).toLocaleDateString(
                    "en-KE",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}{" "}
                  –{" "}
                  {new Date(mockReceipt.returnDate).toLocaleDateString(
                    "en-KE",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Amount breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total amount</span>
                <span>KES {mockReceipt.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount paid</span>
                <span className="font-medium text-success">
                  KES {mockReceipt.amountPaid.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment date</span>
                <span>
                  {mockReceipt.paidAt.toLocaleDateString("en-KE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  at{" "}
                  {mockReceipt.paidAt.toLocaleTimeString("en-KE", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            <Separator />

            {/* Total paid highlight */}
            <div className="flex items-center justify-between rounded-xl bg-primary/5 px-5 py-4">
              <div className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-primary" />
                <span className="font-medium">Total Paid</span>
              </div>
              <span className="text-2xl font-bold text-primary">
                KES {mockReceipt.amountPaid.toLocaleString()}
              </span>
            </div>

            {/* Footer note */}
            <p className="text-center text-xs text-muted-foreground">
              This is an official payment receipt. Keep it for your records.
              <br />
              For any questions, contact support with the receipt number above.
            </p>
          </CardContent>
        </Card>

        {/* Actions (hidden when printing) */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center print:hidden">
          <Button variant="outline">
            <Link href="/orders">Back to Orders</Link>
          </Button>
          <Button>
            <Link
              href={`/expeditions/${mockReceipt.id.replace("bk_", "exp_")}`}
            >
              View Expedition
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
