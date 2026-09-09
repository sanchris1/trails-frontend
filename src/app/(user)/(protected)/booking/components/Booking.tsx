"use client";

import { useState } from "react";
import BookedExpedition from "./BookedExpedition";
import ParticipantInfoPage from "./BookingParticipantsInfoPage";
import BookingProgress from "./BookingProgress";
import ReviewYourJourneyPage from "./ReviewYourJourney";
import CompleteYourBookingPage from "./CompleteBooking";
import { useFetchExpeditionDetails } from "@/hooks/expedition/useFetchExpeditionsDetails";

const steps = [
  {
    number: 1,
    label: "EXPEDITION",
  },
  {
    number: 2,
    label: "PARTICIPANTS",
  },
  {
    number: 3,
    label: "REVIEW",
  },
  {
    number: 4,
    label: "PAYMENT",
  },
];

const BookingPage = ({ expeditionId }: { expeditionId: string }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((step) => Math.min(step + 1, steps.length));
  };

  const prevStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 1));
  };

  const [participants, setParticipants] = useState(1);

  const { data: fetchedData, isLoading } =
    useFetchExpeditionDetails(expeditionId);

  const expedition = fetchedData?.data;

  const total = expedition?.adventure.defaultPrice * participants;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <BookingProgress currentStep={currentStep} />
      {currentStep === 1 && (
        <BookedExpedition
          isLoading={isLoading}
          expedition={expedition}
          total={total}
          onContinue={nextStep}
          participants={participants}
          setParticipants={setParticipants}
        />
      )}
      {currentStep === 2 && (
        <ParticipantInfoPage
          onBack={prevStep}
          onContinue={nextStep}
          numberOfParticipants={participants}
        />
      )}

      {currentStep === 3 && (
        <ReviewYourJourneyPage onBack={prevStep} onContinue={nextStep} />
      )}

      {currentStep === 4 && <CompleteYourBookingPage onBack={prevStep} />}
    </main>
  );
};

export default BookingPage;
