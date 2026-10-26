"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  ChevronRight,
  Loader2,
  MapPin,
  Package,
  Search,
  ShoppingBag,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetchAllOrders } from "@/hooks/merchandise/admin/fetchAllOrders";
import { useUpdateOrderStatus } from "@/hooks/merchandise/admin/updateOrderStatus";
import type { MerchandiseOrder } from "@/types/merchandiseOrder";
import OrderDetailsSheet from "./components/OrdersSheet";

const statusFilters = [
  "all",
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const emptyOrders: MerchandiseOrder[] = [];

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatStatus(status: string) {
  return status
    ?.replace(/[_-]/g, " ")
    ?.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function getStatusClass(status: string) {
  switch (status) {
    case "delivered":
    case "completed":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-700";
    case "cancelled":
    case "failed":
      return "border-destructive/20 bg-destructive/10 text-destructive";
    case "pending":
      return "border-amber-500/20 bg-amber-500/10 text-amber-700";
    default:
      return "border-primary/20 bg-primary/10 text-primary";
  }
}

function matchesSearch(order: MerchandiseOrder, search: string) {
  const term = search.toLowerCase();
  return [
    order.orderId,
    order.id,
    order.customer.fullName,
    order.customer.email,
    order.customer.phone,
    order.mpesaReceiptNumber,
    ...order.items.map((item) => item.name),
  ].some((value) => value?.toLowerCase().includes(term));
}

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<MerchandiseOrder | null>(
    null,
  );
  const { data, isLoading, isError, refetch } = useFetchAllOrders();
  const updateOrderStatus = useUpdateOrderStatus();
  const orders = data?.orders ?? emptyOrders;
  const activeOrder = selectedOrder
    ? (orders.find((order) => order.id === selectedOrder.id) ?? selectedOrder)
    : null;

  const filteredOrders = useMemo(
    () =>
      orders.filter(
        (order) =>
          matchesSearch(order, search.trim()) &&
          (statusFilter === "all" || order.status === statusFilter),
      ),
    [orders, search, statusFilter],
  );

  const totalRevenue = orders
    .filter((order) => order.paymentStatus === "paid")
    .reduce((total, order) => total + order.totalAmount, 0);
  const awaitingPayment = orders.filter(
    (order) => order.paymentStatus === "pending",
  ).length;

  return (
    <div className="space-y-7">
      <header>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Store management
        </p>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Merchandise orders
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review customer purchases, payment references, and delivery details.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            All orders <ShoppingBag className="size-4" />
          </div>
          <p className="mt-3 text-2xl font-semibold">{orders.length}</p>
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            Awaiting payment <Users className="size-4" />
          </div>
          <p className="mt-3 text-2xl font-semibold">{awaitingPayment}</p>
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            Paid order value <Package className="size-4" />
          </div>
          <p className="mt-3 text-2xl font-semibold">
            {formatCurrency(totalRevenue)}
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-lg flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search order, customer, product, or M-Pesa receipt..."
            className="pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value ?? "all")}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Order status" />
          </SelectTrigger>
          <SelectContent>
            {statusFilters.map((status) => (
              <SelectItem key={status} value={status}>
                {status === "all" ? "All statuses" : formatStatus(status)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      <div className="overflow-hidden rounded-2xl border bg-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Delivery</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-28">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-36 text-center">
                    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="size-4 animate-spin" />
                      Loading merchandise orders...
                    </span>
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-36 text-center">
                    <div className="flex flex-col items-center">
                      <AlertCircle className="mb-2 size-5 text-destructive" />
                      <p className="text-sm text-destructive">
                        We couldn&apos;t load merchandise orders.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={() => void refetch()}
                      >
                        Try again
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-36 text-center">
                    <p className="text-sm text-muted-foreground">
                      {orders.length === 0
                        ? "No merchandise orders have been placed yet."
                        : "No orders match your filters."}
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id} className="align-top">
                    <TableCell>
                      <p className="font-medium">{order.orderId ?? order.id}</p>
                      <Badge
                        variant="outline"
                        className={`mt-1 ${getStatusClass(order.status)}`}
                      >
                        {formatStatus(order.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{order.customer.fullName}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.customer.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.customer.phone}
                      </p>
                    </TableCell>
                    <TableCell className="min-w-48">
                      <ul className="space-y-1 text-sm">
                        {order.items.map((item) => (
                          <li key={item.merchandiseId}>
                            {item.name}{" "}
                            <span className="text-muted-foreground">
                              × {item.quantity}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell className="min-w-40">
                      <p className="inline-flex items-center gap-1 text-sm">
                        <MapPin className="size-3.5 shrink-0 text-muted-foreground" />
                        {order.delivery.town}, {order.delivery.county}
                      </p>
                      <p className="mt-1 max-w-52 text-xs text-muted-foreground">
                        {order.delivery.address}
                      </p>
                    </TableCell>
                    <TableCell className="min-w-40">
                      <Badge
                        variant="outline"
                        className={getStatusClass(order.paymentStatus)}
                      >
                        {formatStatus(order.paymentStatus)}
                      </Badge>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatStatus(order.paymentMethod)}
                        {order.mpesaReceiptNumber
                          ? ` · ${order.mpesaReceiptNumber}`
                          : ""}
                      </p>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(order.totalAmount)}
                    </TableCell>
                    <TableCell className="min-w-32 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="size-3.5" />
                        {new Date(order.createdAt).toLocaleDateString("en-KE", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-1.5"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View
                        <ChevronRight className="size-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <OrderDetailsSheet
        order={activeOrder}
        open={activeOrder !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedOrder(null);
        }}
        isUpdating={updateOrderStatus.isPending}
        onStatusChange={(status) => {
          if (activeOrder) {
            updateOrderStatus.mutate({
              orderId: activeOrder.id,
              status,
            });
          }
        }}
      />
    </div>
  );
}
