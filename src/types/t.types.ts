export interface Adventure {
  id: string;
  title: string;
  category: string;
  description: string;
  shortDescription: string | null;
  location: string;
  duration: string;
  defaultPrice: number;
  defaultCapacity: number;
  isActive: boolean;
  coverImage: string;
  coverImagePublicId: string;
  elevationGain: number | null;
  difficulty: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AdventureFilters {
  search: string | null;
  category: string | null;
  difficulty: string | null;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

import { z } from "zod";

export const adventureSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),

  category: z.string().min(1, "Please select a category"),

  shortDescription: z
    .string()
    .min(5, "Short description is too short")
    .max(255),

  description: z.string().min(10, "Description should be more detailed"),

  location: z.string().min(3, "Location is required"),

  difficulty: z.string().min(1, "Select a difficulty"),

  duration: z
    .number({
      error: "Duration is required",
    })
    .min(1, "Duration must be at least 1 hour"),

  elevationGain: z.number().nullable().optional(),

  defaultCapacity: z.number().min(1, "Capacity must be at least 1"),

  defaultPrice: z.number().min(1, "Price must be greater than 0"),

  coverImage: z.string().url("Invalid image URL"),

  coverImagePublicId: z.string().min(1, "Image must be uploaded"),

  isActive: z.boolean(),
});

export type AdventureFormValues = z.infer<typeof adventureSchema>;

export const expeditionSchema = z
  .object({
    adventureId: z.string().uuid("Invalid adventure ID"),

    departureDate: z.string().min(1, "Departure date is required"),

    departureTime: z.string().min(1, "Departure time is required"),

    returnDate: z.string().min(1, "Return date is required"),

    returnTime: z.string().optional().or(z.literal("")),

    meetingPoint: z
      .string()
      .trim()
      .min(3, "Meeting point must be at least 3 characters"),

    guide: z.string().trim().min(2, "Guide name is required"),

    guideContact: z
      .string()
      .trim()
      .min(7, "Please provide a valid guide contact"),

    expeditionStatus: z.enum([
      "scheduled",
      "ongoing",
      "completed",
      "cancelled",
    ]),
  })
  .refine(
    (data) => {
      return new Date(data.returnDate) >= new Date(data.departureDate);
    },
    {
      message: "Return date cannot be before departure date",
      path: ["returnDate"],
    },
  );

export type ExpeditionFormValues = z.infer<typeof expeditionSchema>;

export const defaultExpeditionValues: ExpeditionFormValues = {
  adventureId: "",
  departureDate: "",
  departureTime: "",
  returnDate: "",
  returnTime: "",
  meetingPoint: "",
  guide: "",
  guideContact: "",
  expeditionStatus: "scheduled",
};

export interface Expedition {
  id: string;
  adventureId: string;

  departureDate: string;
  departureTime: string;

  returnDate: string;
  returnTime: string | null;

  meetingPoint: string;

  guide: string;
  guideContact: string;

  expeditionStatus: "scheduled" | "ongoing" | "cancelled" | "completed";

  bookedParticipants: number;
  slotsLeft: number;

  createdAt: string;
  updatedAt: string;

  adventure: Adventure;
}
