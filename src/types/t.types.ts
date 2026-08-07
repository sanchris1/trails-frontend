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
