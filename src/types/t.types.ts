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
