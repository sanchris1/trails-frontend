/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import BookedExpedition from "./BookedExpedition";
import ParticipantInfoPage from "./BookingParticipantsInfoPage";
import BookingProgress from "./BookingProgress";
import ReviewYourJourneyPage from "./ReviewYourJourney";
import CompleteYourBookingPage from "./CompleteBooking";
import { useFetchExpeditionDetails } from "@/hooks/expedition/useFetchExpeditionsDetails";
import { Participant } from "@/types/t.types";
import { useFetchUserBookings } from "@/hooks/booking/useFetchUserBookings";

const emptyParticipant = (): Participant => ({
  fullName: "",
  email: "",
  phone: "",
  medicalNotes: "",
  emergencyContact: "",
});

const steps = [
  { number: 1, label: "EXPEDITION" },
  { number: 2, label: "PARTICIPANTS" },
  { number: 3, label: "REVIEW" },
  { number: 4, label: "PAYMENT" },
];

const BookingPage = ({ expeditionId }: { expeditionId: string }) => {
  const { data } = useFetchUserBookings();

  const userBookings: any[] = data?.userBookings ?? [];

  const isBooked =
    userBookings.some((bookings) => bookings.expeditionId === expeditionId) ??
    false;

  // const bookedExpeditionDetails = userBookings.find(
  //   (bookings) => bookings.expeditionId === expeditionId,
  // );

  const [currentStep, setCurrentStep] = useState(1);

  // This is now an array of participant objects
  const [participants, setParticipants] = useState<Participant[]>([
    emptyParticipant(),
  ]);

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, steps.length));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const { data: fetchedData, isLoading } =
    useFetchExpeditionDetails(expeditionId);

  const expedition = fetchedData?.data;

  const total =
    expedition?.adventure?.defaultPrice != null
      ? expedition.adventure.defaultPrice * participants.length
      : 0;

  const updateParticipantsCount = (count: number) => {
    setParticipants((prev) => {
      if (count === prev.length) return prev;

      if (count > prev.length) {
        return [
          ...prev,
          ...Array.from({ length: count - prev.length }, emptyParticipant),
        ];
      }

      return prev.slice(0, count);
    });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <BookingProgress currentStep={currentStep} />

      {currentStep === 1 && (
        <BookedExpedition
          isLoading={isLoading}
          expedition={expedition}
          isBooked={isBooked}
          total={total}
          onContinue={nextStep}
          participantsCount={participants.length}
          setCurrentStep={setCurrentStep}
          setParticipantsCount={updateParticipantsCount}
        />
      )}

      {currentStep === 2 && (
        <ParticipantInfoPage
          participants={participants}
          setParticipants={setParticipants}
          onBack={prevStep}
          onContinue={nextStep}
        />
      )}

      {currentStep === 3 && (
        <ReviewYourJourneyPage
          total={total}
          participants={participants} // ← now the real array
          onBack={prevStep}
          onContinue={nextStep}
          expedition={expedition}
        />
      )}

      {currentStep === 4 && (
        <CompleteYourBookingPage
          onBack={prevStep}
          participants={participants} // ← you can also pass it here
          total={total}
          expedition={expedition}
        />
      )}
    </main>
  );
};

export default BookingPage;
