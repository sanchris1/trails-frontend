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
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { getBetterDateFormat } from "@/hooks/getBetterTimeFormat";
import { Participant } from "@/types/t.types";
import { useMutation } from "@tanstack/react-query";
import { bookExpedition } from "@/hooks/booking/bookExpedition";
import toast from "react-hot-toast";
import { bookParticipants } from "@/hooks/booking/bookParticipants";
import axios from "axios";

interface ReviewYourJourneyPageProps {
  onBack: () => void;
  onContinue: () => void;
  expedition: any;
  total: number;
  participants: Participant[];
}

export default function ReviewYourJourneyPage({
  onBack,
  onContinue,
  expedition,
  total,
  participants,
}: ReviewYourJourneyPageProps) {
  const { mutate: bookP } = useMutation({
    mutationFn: bookParticipants,
    onSuccess: (data: any) => {
      console.log(data);
      toast.success(data?.message);
      onContinue();
    },
    onError: (error: any) => {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log(error.response);
        toast.error(error.response?.data.message);
      } else toast.error("Incurred some error while booking");
    },
  });

  const { mutate: book } = useMutation({
    mutationFn: bookExpedition,
    onSuccess: (data: any) => {
      const newBookingId = data?.data[0]?.id;
      toast.success(data?.message);
      if (!newBookingId) {
        return toast.error(
          "Booking created but the booking id was not returned",
        );
      }
      bookP({ bookingId: newBookingId, participants });
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else toast.error("Incurred some error while booking");
    },
  });

  const [confirmed, setConfirmed] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
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
          <div className="mb-2 flex items-center gap-3">
            <Badge
              variant="secondary"
              className="rounded-full bg-muted px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground"
            >
              Step 03
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Review Your Journey
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Please review the expedition details and participant information
            carefully before proceeding to payment.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Expedition Details */}
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
                  onClick={onBack} // or navigate to step 1
                >
                  <Pencil className="mr-1.5 h-3.5 w-3.5" />
                  Edit
                </Button>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src={expedition.adventure.coverImage}
                    alt={expedition.expeditionTitle}
                    width={800}
                    height={320}
                    className="h-48 w-full object-cover sm:h-56"
                    priority
                  />
                  <div className="absolute bottom-3 left-3">
                    <Badge className="border-0 bg-black/60 text-white backdrop-blur-sm">
                      {expedition.adventure.location}
                    </Badge>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Expedition
                    </p>
                    <p className="font-medium text-foreground">
                      {expedition.expeditionTitle}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      Location
                    </p>
                    <p className="font-medium text-foreground">
                      {expedition.adventure.location}
                    </p>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />
                      Departure Date
                    </p>
                    <p className="font-medium text-foreground">
                      {getBetterDateFormat(expedition.departureDate)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Participants */}
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
                  onClick={onBack} // goes back to participants step
                >
                  <Pencil className="mr-1.5 h-3.5 w-3.5" />
                  Edit
                </Button>
              </CardHeader>

              <CardContent className="p-0">
                <ul className="divide-y divide-border/60">
                  {participants.map((person, index) => {
                    const hasMedicalNotes = Boolean(
                      person.medicalNotes?.trim(),
                    );

                    return (
                      <li
                        key={index}
                        className="flex items-center justify-between gap-4 px-6 py-4"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <Avatar className="h-10 w-10 border border-border">
                            <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                              {getInitials(person.fullName || "P")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="min-w-0">
                            <p className="truncate font-medium text-foreground">
                              {person.fullName || `Participant ${index + 1}`}
                            </p>
                            <p className="truncate text-sm text-muted-foreground">
                              {person.email}
                              {person.phone ? ` · ${person.phone}` : ""}
                            </p>
                          </div>
                        </div>

                        <Badge
                          variant={
                            hasMedicalNotes ? "destructive" : "secondary"
                          }
                          className={
                            hasMedicalNotes
                              ? "border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/15"
                              : "border-transparent bg-muted text-muted-foreground"
                          }
                        >
                          {hasMedicalNotes
                            ? "Medical Notes Added"
                            : "No Medical Notes"}
                        </Badge>
                      </li>
                    );
                  })}
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
                        <p className="text-muted-foreground">Base price</p>
                        <p className="text-xs text-muted-foreground/80">
                          KES{" "}
                          {expedition.adventure.defaultPrice.toLocaleString()} ×{" "}
                          {participants.length} participant
                          {participants.length > 1 ? "s" : ""}
                        </p>
                      </div>
                      <p className="font-medium">
                        KES {total.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <Separator className="bg-border/60" />

                  <div className="flex items-baseline justify-between">
                    <p className="font-semibold text-foreground">Total</p>
                    <p className="text-2xl font-bold tracking-tight text-foreground">
                      KES {total.toLocaleString()}
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
                      className="cursor-pointer text-sm leading-relaxed text-muted-foreground"
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
                    onClick={() => {
                      book({
                        expeditionId: expedition.id,
                        numberOfParticipants: participants.length,
                      });
                      // onContinue();
                    }}
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
