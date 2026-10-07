"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Users, Compass, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSendAdminSuggestion } from "@/hooks/notifications/sendAdminSuggestion";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const initialValues = {
  title: "",
  description: "",
  location: "",
  type: "",
  checkInDate: undefined as Date | undefined,
  checkOutDate: undefined as Date | undefined,
  numberOfParticipants: 1,
};

export default function SuggestAdventurePage() {
  const [values, setValues] = useState(initialValues);
  const router = useRouter();
  const { mutate: sendSuggestion, isPending } = useSendAdminSuggestion();

  const updateValue = <K extends keyof typeof values>(
    key: K,
    value: (typeof values)[K],
  ) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...values,
      checkInDate: values.checkInDate?.toLocaleDateString(),
      checkOutDate: values.checkOutDate?.toLocaleDateString(),
    };

    if (
      Object.values(payload).some(
        (item) =>
          !item ||
          item === undefined ||
          item === null ||
          (typeof item === "string" && item.trim().length === 0),
      )
    ) {
      toast.error("Please make sure to add all the fields");

      return;
    }
    try {
      sendSuggestion({
        title: payload.title,
        message: `Requesting that Trails and Memoirs take
         {${payload.numberOfParticipants}}
       people to  {${payload.location}} which 
      is a  { ${payload.type}} . The suggested
       dates are from  {${payload.checkInDate}} to  {${payload.checkOutDate}}. 
       We hope that {${payload.description} } will be our experience`,
      });
      setValues(initialValues);

      toast.success("Adventure suggestion sent!");

      router.push("/expeditions");
    } catch (error) {
      toast.error("Failed to send adventure suggestion.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/40 bg-linear-to-b from-primary/5 via-background to-background">
        <div className="container relative z-10 mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Shape the next adventure</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Suggest Your Dream Adventure
          </h1>

          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Tell us the experiences you&apos;d love to have across Kenya.
            We&apos;ll use your ideas to create unforgettable journeys.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="container mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl">Adventure details</CardTitle>

            <CardDescription>
              Fill in what you&apos;d like to experience. You can be as specific
              or open as you want.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Adventure title</Label>

                <Input
                  id="title"
                  value={values.title}
                  onChange={(e) => updateValue("title", e.target.value)}
                  placeholder="e.g. Sunrise balloon safari over the Maasai Mara"
                  className="h-11"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Describe the experience</Label>

                <Textarea
                  id="description"
                  value={values.description}
                  onChange={(e) => updateValue("description", e.target.value)}
                  placeholder="What would make this adventure special? Activities, vibe, places you want to visit..."
                  className="min-h-30 resize-none"
                  required
                />
              </div>

              {/* Location + Experience Type */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="location">Preferred location</Label>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="location"
                      value={values.location}
                      onChange={(e) => updateValue("location", e.target.value)}
                      placeholder="e.g. Maasai Mara, Diani, Mount Kenya..."
                      className="h-11 pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Experience type</Label>

                  <Select
                    value={values.type}
                    onValueChange={(value) => {
                      if (!values || value === null) {
                        return;
                      }
                      return updateValue("type", value);
                    }}
                    required
                  >
                    <SelectTrigger className="h-11">
                      <div className="flex items-center gap-2">
                        <Compass className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Select type" />
                      </div>
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="safari">Safari & Wildlife</SelectItem>

                      <SelectItem value="hiking">Hiking & Trekking</SelectItem>

                      <SelectItem value="cultural">
                        Cultural Immersion
                      </SelectItem>

                      <SelectItem value="beach">Beach & Coast</SelectItem>

                      <SelectItem value="adventure">
                        Adventure Sports
                      </SelectItem>

                      <SelectItem value="wellness">
                        Wellness & Retreat
                      </SelectItem>

                      <SelectItem value="food">Food & Culinary</SelectItem>

                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Dates */}
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Check in */}
                <div className="space-y-2">
                  <Label>Check in</Label>

                  <Popover>
                    <PopoverTrigger>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "h-11 w-full justify-start text-left font-normal",
                          !values.checkInDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />

                        {values.checkInDate
                          ? format(values.checkInDate, "PPP")
                          : "Choose date"}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={values.checkInDate}
                        onSelect={(date) => updateValue("checkInDate", date)}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Check out */}
                <div className="space-y-2">
                  <Label>Check out</Label>

                  <Popover>
                    <PopoverTrigger>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "h-11 w-full justify-start text-left font-normal",
                          !values.checkOutDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />

                        {values.checkOutDate
                          ? format(values.checkOutDate, "PPP")
                          : "Choose date"}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={values.checkOutDate}
                        onSelect={(date) => updateValue("checkOutDate", date)}
                        disabled={(date) =>
                          values.checkInDate
                            ? date < values.checkInDate
                            : date < new Date()
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Travelers */}
              <div className="space-y-2">
                <Label htmlFor="travelers">Number of travelers</Label>

                <div className="relative max-w-45">
                  <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="travelers"
                    type="number"
                    min={1}
                    value={values.numberOfParticipants}
                    onChange={(e) =>
                      updateValue(
                        "numberOfParticipants",
                        Number(e.target.value),
                      )
                    }
                    className="h-11 pl-9"
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto sm:min-w-50"
                >
                  {isPending ? "Submitting" : "Submit Suggestion"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
