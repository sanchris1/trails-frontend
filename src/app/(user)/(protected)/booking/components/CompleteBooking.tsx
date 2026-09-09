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
} from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CompleteYourBookingPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add your payment logic here
    setTimeout(() => setIsSubmitting(false), 2000);
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
            className="gap-1.5 text-muted-foreground hover:text-foreground -ml-2"
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
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Review your details and securely enter your payment information to
            finalize your expedition.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Method */}
              <Card className="border-border/60 shadow-sm overflow-hidden">
                <div className="h-1.5 w-full bg-primary" />

                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <Smartphone className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Payment Method</CardTitle>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Tabs
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted/60">
                      <TabsTrigger
                        value="mpesa"
                        className="flex flex-col sm:flex-row items-center gap-1.5 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                      >
                        <Smartphone className="h-4 w-4" />
                        <span className="text-xs sm:text-sm">M-Pesa</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="card"
                        className="flex flex-col sm:flex-row items-center gap-1.5 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                      >
                        <CreditCard className="h-4 w-4" />
                        <span className="text-xs sm:text-sm">Credit Card</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="bank"
                        className="flex flex-col sm:flex-row items-center gap-1.5 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                      >
                        <Building2 className="h-4 w-4" />
                        <span className="text-xs sm:text-sm">
                          Bank Transfer
                        </span>
                      </TabsTrigger>
                    </TabsList>

                    {/* M-Pesa Content */}
                    <TabsContent value="mpesa" className="mt-6 space-y-5">
                      <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                            <Smartphone className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              M-Pesa Express (STK Push)
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Enter your Safaricom phone number. A secure STK
                              prompt will appear automatically on your handset
                              to authorize payment.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mpesaPhone">
                          M-Pesa Registered Phone Number*
                        </Label>
                        <div className="flex">
                          <div className="flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-sm text-muted-foreground">
                            +254
                          </div>
                          <Input
                            id="mpesaPhone"
                            placeholder="712 345 678"
                            className="rounded-l-none"
                            required
                          />
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <Info className="h-3.5 w-3.5" />
                          Use your mobile number registered with M-Pesa. You
                          will receive a prompt on your phone.
                        </p>
                      </div>

                      <div className="rounded-lg bg-primary/5 border border-primary/20 px-4 py-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">
                          Amount to Pay
                        </span>
                        <span className="text-lg font-bold text-primary">
                          KES 19,110.00
                        </span>
                      </div>
                    </TabsContent>

                    {/* Credit Card Content (placeholder) */}
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
                        <Input id="nameOnCard" placeholder="Jane Doe" />
                      </div>
                    </TabsContent>

                    {/* Bank Transfer Content (placeholder) */}
                    <TabsContent value="bank" className="mt-6">
                      <div className="rounded-lg border border-dashed border-border p-6 text-center text-muted-foreground">
                        <Building2 className="mx-auto h-8 w-8 mb-3 opacity-50" />
                        <p className="font-medium">Bank Transfer Details</p>
                        <p className="text-sm mt-1">
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
                      defaultValue="Jane Doe"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email (for itinerary & M-Pesa receipt)
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane.doe@example.com"
                      defaultValue="jane.doe@example.com"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <Card className="border-border/60 shadow-sm overflow-hidden">
                  {/* Expedition Image */}
                  <div className="relative h-40 w-full">
                    <Image
                      src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop"
                      alt="The High Sierra Traverse"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-xs font-medium text-white/80 uppercase tracking-wider">
                        Expedition
                      </p>
                      <p className="text-lg font-semibold text-white leading-tight">
                        The High Sierra Traverse
                      </p>
                    </div>
                  </div>

                  <CardContent className="pt-5 space-y-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>Participants</span>
                        </div>
                        <span className="font-medium">3 Explorers</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CalendarDays className="h-4 w-4" />
                          <span>Dates</span>
                        </div>
                        <span className="font-medium">Oct 12 – 16, 2024</span>
                      </div>
                    </div>

                    <Separator className="bg-border/60" />

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">$147.00</span>
                    </div>

                    <div className="flex justify-between items-baseline pt-1">
                      <span className="font-semibold text-foreground">
                        Final Amount
                      </span>
                      <span className="text-2xl font-bold tracking-tight text-foreground">
                        $147
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col gap-3 pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full font-medium"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Processing..."
                        : paymentMethod === "mpesa"
                          ? "Pay with M-Pesa → STK Push (KES 19,110)"
                          : "Pay & Confirm Booking"}
                    </Button>

                    <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground text-center">
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                      <span>
                        {paymentMethod === "mpesa"
                          ? "Secured by Safaricom M-Pesa • Instant STK Push"
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
