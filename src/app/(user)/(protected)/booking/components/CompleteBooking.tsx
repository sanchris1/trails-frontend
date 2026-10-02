/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Smartphone,
  CreditCard,
  Building2,
  MapPin,
  ShieldCheck,
  ArrowLeft,
  CalendarDays,
  Users,
  Info,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBetterDateFormat } from "@/hooks/getBetterTimeFormat";
import { Participant } from "@/types/t.types";
import { useMutation } from "@tanstack/react-query";
import { sendReceiptNumber } from "@/hooks/booking/sendReceiptNumber";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface CompleteYourBookingPageProps {
  onBack: () => void;
  participants: Participant[];
  expedition: any;
  total: number;
  bookingId: string | null;
}

export default function CompleteYourBookingPage({
  onBack,
  participants,
  expedition,
  total,
  bookingId,
}: CompleteYourBookingPageProps) {
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [receiptNumber, setReceiptNumber] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const lead = participants[0];

  const paybillNumber = "441207";

  const handleCopyPaybill = async () => {
    try {
      await navigator.clipboard.writeText(paybillNumber);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy Paybill number:", error);
    }
  };

  const { mutate: sendReceipt, isPending } = useMutation({
    mutationFn: sendReceiptNumber,
    onSuccess: (data: any) => {
      toast.success(data?.message);
      router.replace("/");
    },
    onError: (ctx: any) => {
      toast.error(ctx?.message || "Error sending the receipt");
    },
  });

  const handleSubmitMpesaReceiptNumber = () => {
    if (paymentMethod === "mpesa" && !receiptNumber.trim()) {
      return;
    }

    if (!receiptNumber || !bookingId) return;

    sendReceipt({ bookingId, receiptNumber });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="-ml-2 gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Complete Your Booking
          </h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Review your details and complete your payment to finalize your
            expedition booking.
          </p>
        </div>

        <form onSubmit={handleSubmitMpesaReceiptNumber}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column */}
            <div className="space-y-6 lg:col-span-2">
              {/* Payment Method */}
              <Card className="overflow-hidden border-border/60 shadow-sm">
                <div className="h-1.5 w-full bg-primary" />

                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Smartphone className="h-5 w-5 text-primary" />
                    </div>

                    <CardTitle className="text-lg">Payment Method</CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Tabs
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="w-full"
                  >
                    <TabsList className="grid h-auto w-full grid-cols-3 bg-muted/60 p-1">
                      <TabsTrigger
                        value="mpesa"
                        className="flex flex-col items-center gap-1.5 py-2.5 sm:flex-row data-[state=active]:bg-background data-[state=active]:shadow-sm"
                      >
                        <Smartphone className="h-4 w-4" />
                        <span className="text-xs sm:text-sm">M-Pesa</span>
                      </TabsTrigger>

                      <TabsTrigger
                        value="card"
                        className="flex flex-col items-center gap-1.5 py-2.5 sm:flex-row data-[state=active]:bg-background data-[state=active]:shadow-sm"
                      >
                        <CreditCard className="h-4 w-4" />
                        <span className="text-xs sm:text-sm">Credit Card</span>
                      </TabsTrigger>

                      <TabsTrigger
                        value="bank"
                        className="flex flex-col items-center gap-1.5 py-2.5 sm:flex-row data-[state=active]:bg-background data-[state=active]:shadow-sm"
                      >
                        <Building2 className="h-4 w-4" />
                        <span className="text-xs sm:text-sm">
                          Bank Transfer
                        </span>
                      </TabsTrigger>
                    </TabsList>

                    {/* M-Pesa */}
                    <TabsContent value="mpesa" className="mt-6 space-y-5">
                      {/* Information Banner */}
                      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                            <Info className="h-4 w-4 text-primary" />
                          </div>

                          <div>
                            <p className="font-medium text-foreground">
                              Manual M-Pesa Payment
                            </p>

                            <p className="mt-1 text-sm leading-6 text-muted-foreground">
                              M-Pesa automatic payment integration is not
                              currently available. Please make the payment
                              manually using the Paybill details below, then
                              enter your M-Pesa receipt number so our team can
                              verify your payment.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Paybill Details */}
                      <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                              M-Pesa Paybill Number
                            </p>

                            <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                              {paybillNumber}
                            </p>
                          </div>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleCopyPaybill}
                            className="w-full gap-2 sm:w-auto"
                          >
                            {copied ? (
                              <>
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4" />
                                Copy Paybill
                              </>
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Payment Instructions */}
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-medium text-foreground">
                            How to pay
                          </h3>

                          <p className="mt-1 text-sm text-muted-foreground">
                            Complete the payment from your phone using the
                            following steps:
                          </p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                              1
                            </div>

                            <p className="pt-1 text-sm text-muted-foreground">
                              Open the{" "}
                              <strong className="text-foreground">
                                M-Pesa
                              </strong>{" "}
                              menu on your phone.
                            </p>
                          </div>

                          <div className="flex gap-3">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                              2
                            </div>

                            <p className="pt-1 text-sm text-muted-foreground">
                              Select{" "}
                              <strong className="text-foreground">
                                Lipa na M-Pesa
                              </strong>{" "}
                              and then{" "}
                              <strong className="text-foreground">
                                Paybill
                              </strong>
                              .
                            </p>
                          </div>

                          <div className="flex gap-3">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                              3
                            </div>

                            <p className="pt-1 text-sm text-muted-foreground">
                              Enter our Paybill number:{" "}
                              <strong className="text-foreground">
                                {paybillNumber}
                              </strong>
                              .
                            </p>
                          </div>

                          <div className="flex gap-3">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                              4
                            </div>

                            <p className="pt-1 text-sm text-muted-foreground">
                              Enter the required account/reference number and
                              pay the amount shown below.
                            </p>
                          </div>

                          <div className="flex gap-3">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                              5
                            </div>

                            <p className="pt-1 text-sm text-muted-foreground">
                              After completing the payment, copy the M-Pesa
                              transaction receipt number and enter it below.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                        <span className="text-sm font-medium text-foreground">
                          Amount to Pay
                        </span>

                        <span className="text-lg font-bold text-primary">
                          KES {total.toLocaleString()}
                        </span>
                      </div>

                      {/* Receipt Number */}
                      <div className="space-y-2">
                        <Label htmlFor="mpesaReceipt">
                          M-Pesa Receipt / Transaction Number*
                        </Label>

                        <Input
                          id="mpesaReceipt"
                          name="mpesaReceipt"
                          placeholder="e.g. QJK7H2ABC1"
                          value={receiptNumber}
                          onChange={(e) =>
                            setReceiptNumber(e.target.value.toUpperCase())
                          }
                          required={paymentMethod === "mpesa"}
                          autoComplete="off"
                          className="uppercase"
                        />

                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Info className="h-3.5 w-3.5" />
                          Enter the receipt number from the M-Pesa confirmation
                          message you received after payment.
                        </p>
                      </div>

                      {/* Verification Notice */}
                      <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                          <div>
                            <p className="text-sm font-medium text-foreground">
                              Payment verification
                            </p>

                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                              Your booking will be submitted for payment
                              verification. Our team will confirm the
                              transaction using the receipt number you provide.
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Credit Card */}
                    <TabsContent value="card" className="mt-6 space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>

                        <Input
                          id="cardNumber"
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" maxLength={4} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nameOnCard">Name on Card</Label>

                        <Input
                          id="nameOnCard"
                          placeholder="Jane Doe"
                          defaultValue={lead?.fullName || ""}
                        />
                      </div>
                    </TabsContent>

                    {/* Bank Transfer */}
                    <TabsContent value="bank" className="mt-6">
                      <div className="rounded-lg border border-dashed border-border p-6 text-center text-muted-foreground">
                        <Building2 className="mx-auto mb-3 h-8 w-8 opacity-50" />

                        <p className="font-medium">Bank Transfer Details</p>

                        <p className="mt-1 text-sm">
                          Bank details will be shown after selecting this
                          method.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Billing & Contact Details */}
              <Card className="border-border/60 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>

                    <CardTitle className="text-lg">
                      Billing & Contact Details
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Account Holder Full Name</Label>

                    <Input
                      id="fullName"
                      placeholder="Jane Doe"
                      defaultValue={lead?.fullName || ""}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email (for itinerary & payment confirmation)
                    </Label>

                    <Input
                      id="email"
                      type="email"
                      placeholder="jane.doe@example.com"
                      defaultValue={lead?.email || ""}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">City / Region</Label>

                      <Input
                        id="city"
                        placeholder="Nairobi"
                        defaultValue="Nairobi"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>

                      <Input
                        id="country"
                        placeholder="Kenya"
                        defaultValue="Kenya"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card className="overflow-hidden border-border/60 shadow-sm">
                  {/* Expedition Image */}
                  <div className="relative h-40 w-full">
                    <Image
                      src={expedition.adventure.coverImage}
                      alt={expedition.expeditionTitle}
                      fill
                      className="object-cover"
                      priority
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-xs font-medium uppercase tracking-wider text-white/80">
                        Expedition
                      </p>

                      <p className="text-lg font-semibold leading-tight text-white">
                        {expedition.expeditionTitle}
                      </p>
                    </div>
                  </div>

                  <CardContent className="space-y-4 pt-5">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>Participants</span>
                        </div>

                        <span className="font-medium">
                          {participants.length}{" "}
                          {participants.length === 1 ? "Explorer" : "Explorers"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CalendarDays className="h-4 w-4" />
                          <span>Departure</span>
                        </div>

                        <span className="font-medium">
                          {getBetterDateFormat(expedition.departureDate)}
                        </span>
                      </div>
                    </div>

                    <Separator className="bg-border/60" />

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>

                      <span className="font-medium">
                        KES {total.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between pt-1">
                      <span className="font-semibold text-foreground">
                        Final Amount
                      </span>

                      <span className="text-2xl font-bold tracking-tight text-foreground">
                        KES {total.toLocaleString()}
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col gap-3 pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full font-medium"
                      disabled={
                        isPending ||
                        (paymentMethod === "mpesa" && !receiptNumber.trim())
                      }
                    >
                      {isPending
                        ? "Submitting..."
                        : paymentMethod === "mpesa"
                          ? "Submit Payment for Verification"
                          : "Pay & Confirm Booking"}
                    </Button>

                    <div className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0" />

                      <span>
                        {paymentMethod === "mpesa"
                          ? "Your payment will be manually verified by our team"
                          : "Secure SSL Encrypted Transaction"}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
