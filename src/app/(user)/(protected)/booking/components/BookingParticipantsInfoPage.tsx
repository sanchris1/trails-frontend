"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Participant } from "@/types/t.types";

interface ParticipantInfoPageProps {
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
  onBack: () => void;
  onContinue: () => void;
}

export default function ParticipantInfoPage({
  participants,
  setParticipants,
  onBack,
  onContinue,
}: ParticipantInfoPageProps) {
  const update = (index: number, field: keyof Participant, value: string) => {
    setParticipants((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue();
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-3xl px-4 py-8">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Step 02
          </p>
          <h1 className="text-3xl font-bold">Participant Info</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {participants.length} participant
            {participants.length > 1 ? "s" : ""}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {participants.map((p, index) => (
            <div key={index} className="rounded-lg border p-5 space-y-4">
              <h2 className="font-semibold">
                {index === 0 ? "Lead Participant" : `Participant ${index + 1}`}
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Full Name *</Label>
                  <Input
                    value={p.fullName}
                    onChange={(e) => update(index, "fullName", e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    value={p.email}
                    onChange={(e) => update(index, "email", e.target.value)}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>Phone *</Label>
                  <Input
                    type="tel"
                    value={p.phone}
                    onChange={(e) => update(index, "phone", e.target.value)}
                    placeholder="+254 7XX XXX XXX"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>Emergency Contact *</Label>
                  <Input
                    value={p.emergencyContact}
                    onChange={(e) =>
                      update(index, "emergencyContact", e.target.value)
                    }
                    placeholder="Name & phone"
                    required
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label>Medical Notes (optional)</Label>
                  <Textarea
                    value={p.medicalNotes}
                    onChange={(e) =>
                      update(index, "medicalNotes", e.target.value)
                    }
                    placeholder="Allergies, conditions, medications..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between pt-6 border-t">
            <Button type="button" variant="outline" onClick={onBack}>
              <ArrowLeft className="size-4 mr-2" />
              Back
            </Button>
            <Button type="submit">
              Continue to Review
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
