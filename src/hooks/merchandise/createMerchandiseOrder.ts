import axios from "axios";
import { api } from "@/lib/api";

export interface CreateMerchandiseOrderRequest {
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  delivery: {
    county: string;
    town: string;
    address: string;
    notes?: string;
  };
  paymentMethod: "mpesa" | "cod";
  mpesaReceiptNumber?: string;
  items: Array<{
    merchandiseId: string;
    quantity: number;
  }>;
}

export interface CreateMerchandiseOrderResponse {
  message?: string;
  order?: {
    id?: string;
    orderNumber?: string;
  };
}

export async function createMerchandiseOrder(
  order: CreateMerchandiseOrderRequest,
): Promise<CreateMerchandiseOrderResponse> {
  try {
    const { data } = await api.post<CreateMerchandiseOrderResponse>(
      "/shop/orders",
      order,
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError<{ message?: string }>(error)) {
      throw new Error(
        error.response?.data?.message ??
          "We couldn't submit your order. Please try again.",
      );
    }

    throw error;
  }
}
