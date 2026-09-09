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
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Mountain,
  Users,
  Pencil,
  MapPin,
  CalendarDays,
  ShieldCheck,
  ArrowRight,
  ArrowLeft, // ← added
} from "lucide-react";
import { useState } from "react";

const participants = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    initials: "JD",
    hasMedicalNotes: true,
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    email: "sarahj@example.com",
    phone: "+1 (555) 987-6543",
    initials: "SJ",
    hasMedicalNotes: false,
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "m.chen@example.com",
    phone: "+1 (555) 456-7890",
    initials: "MC",
    hasMedicalNotes: true,
  },
];

export default function ReviewYourJourneyPage({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  const [confirmed, setConfirmed] = useState(false);

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
          <div className="flex items-center gap-3 mb-2">
            <Badge
              variant="secondary"
              className="rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase bg-muted text-muted-foreground"
            >
              Step 03
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Review Your Journey
          </h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Please review the expedition details and participant information
            carefully before proceeding to payment.
          </p>
        </div>

        {/* ... rest of the page stays exactly the same ... */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Expedition Details Card */}
            <Card className="overflow-hidden border-border/60 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Mountain className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Expedition Details</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Pencil className="mr-1.5 h-3.5 w-3.5" />
                  Edit
                </Button>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop"
                    alt="Annapurna Circuit"
                    width={800}
                    height={320}
                    className="h-48 w-full object-cover sm:h-56"
                    priority
                  />
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-black/60 text-white backdrop-blur-sm border-0">
                      Annapurna Circuit Traverse
                    </Badge>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Expedition
                    </p>
                    <p className="font-medium text-foreground">
                      Annapurna Circuit Traverse
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      Location
                    </p>
                    <p className="font-medium text-foreground">
                      Himalayas, Nepal
                    </p>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      Dates
                    </p>
                    <p className="font-medium text-foreground">
                      Oct 12 – Oct 26, 2024
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Participants Card */}
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">
                    Participants ({participants.length})
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Pencil className="mr-1.5 h-3.5 w-3.5" />
                  Edit
                </Button>
              </CardHeader>

              <CardContent className="p-0">
                <ul className="divide-y divide-border/60">
                  {participants.map((person) => (
                    <li
                      key={person.id}
                      className="flex items-center justify-between gap-4 px-6 py-4"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar className="h-10 w-10 border border-border">
                          <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                            {person.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {person.name}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {person.email} · {person.phone}
                          </p>
                        </div>
                      </div>

                      <Badge
                        variant={
                          person.hasMedicalNotes ? "destructive" : "secondary"
                        }
                        className={
                          person.hasMedicalNotes
                            ? "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/15"
                            : "bg-muted text-muted-foreground border-transparent"
                        }
                      >
                        {person.hasMedicalNotes
                          ? "Medical Notes Added"
                          : "No Medical Notes"}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="border-border/60 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-muted-foreground">Base Fare</p>
                        <p className="text-xs text-muted-foreground/80">
                          $45 × 3 Participants
                        </p>
                      </div>
                      <p className="font-medium">$135.00</p>
                    </div>

                    <div className="flex justify-between">
                      <p className="text-muted-foreground">Service Fee</p>
                      <p className="font-medium">$12.00</p>
                    </div>
                  </div>

                  <Separator className="bg-border/60" />

                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold text-foreground">Total</p>
                    <p className="text-2xl font-bold tracking-tight text-foreground">
                      $147.00
                    </p>
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <Checkbox
                      id="confirm"
                      checked={confirmed}
                      onCheckedChange={(checked) =>
                        setConfirmed(checked === true)
                      }
                      className="mt-0.5"
                    />
                    <label
                      htmlFor="confirm"
                      className="text-sm leading-relaxed text-muted-foreground cursor-pointer"
                    >
                      I confirm that the participant information provided is
                      accurate and I agree to the expedition terms and
                      cancellation policy.
                    </label>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3 pt-2">
                  <Button
                    size="lg"
                    className="w-full gap-2 font-medium"
                    disabled={!confirmed}
                    onClick={onContinue}
                  >
                    Proceed to Payment
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Secure SSL Encrypted Transaction</span>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
