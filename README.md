This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Merchandise checkout API

The merchandise checkout submits `POST /shop/orders` through the configured API
base URL. The frontend sends:

```json
{
  "customer": {
    "fullName": "Customer Name",
    "email": "customer@example.com",
    "phone": "+254700000000"
  },
  "delivery": {
    "county": "Nairobi",
    "town": "Westlands",
    "address": "Street address",
    "notes": "Optional delivery instructions"
  },
  "paymentMethod": "mpesa",
  "mpesaReceiptNumber": "QK12ABC345",
  "items": [{ "merchandiseId": "merchandise-id", "quantity": 1 }]
}
```

`paymentMethod` is `mpesa` or `cod`. The receipt number is included for M-Pesa
orders only. The backend should validate the request, resolve product prices
and availability from the merchandise IDs, calculate the final total, and
verify the M-Pesa receipt; client-provided cart prices are not sent as trusted
order values. On success, the API may return an order reference:

```json
{
  "message": "Order received",
  "order": { "id": "order-id", "orderNumber": "ORDER-123" }
}
```

### Order management endpoints

The frontend expects these authenticated endpoints for merchandise orders:

- `GET /shop/orders/fetch-all` — admin-only; returns
  `{ "orders": [<MerchandiseOrder>] }`.
- `GET /shop/orders/fetch-user` — returns the signed-in user's orders in the
  same response shape. The backend must scope results to the authenticated user.
- `PUT /shop/orders/:orderId/status` — admin-only; request body is
  `{ "status": "<new status>" }`. The supported lifecycle is `pending` →
  `processing` → `shipped` → `delivered` → `completed`; `pending` and
  `processing` orders may also transition to `cancelled`. `completed` and
  `cancelled` are terminal. The backend must enforce these transitions even
  when a caller bypasses the UI.
- `DELETE /shop/orders/:orderId` — deletes an order only when it belongs to the
  authenticated user. The backend must enforce ownership and decide whether
  its current order/payment state permits deletion; clients cannot delete
  another user's or an admin's order.

Each `MerchandiseOrder` contains `id`, optional `orderNumber`, `createdAt`,
`status`, `paymentStatus`, `paymentMethod`, optional `mpesaReceiptNumber`,
`subtotal`, `deliveryFee`, `totalAmount`, `customer` (`fullName`, `email`,
`phone`), `delivery` (`county`, `town`, `address`, optional `notes`), and an
`items` array of `merchandiseId`, `name`, `quantity`, `unitPrice`, and optional
`image`. These routes are frontend contracts; the backend must implement them
before the order management screens can retrieve or delete persisted orders.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
