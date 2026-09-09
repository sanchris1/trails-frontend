"use client";

import { Check } from "lucide-react";

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

type BookingProgressProps = {
  currentStep: number;
};

const BookingProgress = ({ currentStep }: BookingProgressProps) => {
  return (
    <section className="border-b bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-center">
          <div className="flex w-full max-w-2xl items-center">
            {steps.map((step, index) => {
              const active = step.number === currentStep;
              const completed = step.number < currentStep;

              return (
                <div key={step.number} className="flex flex-1 items-center">
                  <div className="flex shrink-0 flex-col items-center gap-1">
                    <div
                      className={[
                        "flex size-7 items-center justify-center rounded-full text-[10px] font-semibold transition-colors",
                        active || completed
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground",
                      ].join(" ")}
                    >
                      {completed ? <Check className="size-3.5" /> : step.number}
                    </div>

                    <span
                      className={[
                        "text-[8px] font-medium tracking-wider sm:text-[9px]",
                        active || completed
                          ? "text-primary"
                          : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {step.label}
                    </span>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={[
                        "mx-2 mb-4 h-px flex-1 transition-colors sm:mx-4",
                        step.number < currentStep ? "bg-primary" : "bg-border",
                      ].join(" ")}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingProgress;
