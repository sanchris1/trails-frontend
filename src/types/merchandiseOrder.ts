export type MerchandiseOrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "completed"
  | "cancelled";

export type MerchandiseOrderPaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded";

export interface MerchandiseOrderItem {
  merchandiseId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  image?: string | null;
}

export interface MerchandiseOrder {
  id: string;
  orderId?: string | null;
  createdAt: string;
  status: MerchandiseOrderStatus | string;
  paymentStatus: MerchandiseOrderPaymentStatus | string;
  paymentMethod: "mpesa" | "cod" | string;
  mpesaReceiptNumber?: string | null;
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  delivery: {
    county: string;
    town: string;
    address: string;
    notes?: string | null;
  };
  items: MerchandiseOrderItem[];
}

export interface MerchandiseOrdersResponse {
  orders: MerchandiseOrder[];
}
