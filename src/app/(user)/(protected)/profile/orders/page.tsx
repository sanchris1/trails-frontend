"use client";

import Link from "next/link";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  Trash2,
} from "lucide-react";
import { useFetchUserOrders } from "@/hooks/merchandise/fetchUserOrders";
import { useDeleteUserOrder } from "@/hooks/merchandise/deleteUserOrder";
import type { MerchandiseOrder } from "@/types/merchandiseOrder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatStatus(status: string) {
  return status
    ?.replace(/[_-]/g, " ")
    ?.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function OrderStatus({ status }: { status: string }) {
  if (status === "delivered" || status === "completed") {
    return (
      <Badge className="gap-1 bg-success/15 text-success hover:bg-success/20">
        <CheckCircle2 className="size-3.5" />
        {formatStatus(status)}
      </Badge>
    );
  }

  if (status === "cancelled" || status === "failed") {
    return <Badge variant="destructive">{formatStatus(status)}</Badge>;
  }

  if (status === "pending" || status === "processing" || status === "shipped") {
    return (
      <Badge variant="secondary" className="gap-1">
        <Clock3 className="size-3.5" />
        {formatStatus(status)}
      </Badge>
    );
  }

  return <Badge variant="outline">{formatStatus(status)}</Badge>;
}

function OrderCard({
  order,
  onDelete,
  deleting,
}: {
  order: MerchandiseOrder;
  onDelete: () => void;
  deleting: boolean;
}) {
  const reference = order.orderId ?? order.id;

  return (
    <Card className="overflow-hidden rounded-2xl border-border/70 shadow-sm">
      <CardContent className="space-y-5 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold">Order {reference}</span>
              <OrderStatus status={order.status} />
              <Badge variant="outline">
                {formatStatus(order.paymentStatus)}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                {new Date(order.createdAt).toLocaleDateString("en-KE", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" />
                {order.delivery.town}, {order.delivery.county}
              </span>
            </div>
          </div>

          <p className="text-xl font-semibold sm:text-right">
            {formatCurrency(order.totalAmount)}
          </p>
        </div>

        <div className="divide-y rounded-xl border">
          {order.items.map((item) => (
            <div
              key={item.merchandiseId}
              className="flex items-center justify-between gap-4 p-3 text-sm"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Package className="size-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{item.name}</span>
                <span className="shrink-0 text-muted-foreground">
                  × {item.quantity}
                </span>
              </div>
              <span className="shrink-0 font-medium">
                {formatCurrency(item.unitPrice * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>
              Deliver to: {order.delivery.address}, {order.delivery.town}
            </p>
            <p>
              {formatStatus(order.paymentMethod)}
              {order.mpesaReceiptNumber
                ? ` · Receipt ${order.mpesaReceiptNumber}`
                : ""}
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2 self-start text-destructive hover:text-destructive sm:self-auto"
                  disabled={deleting}
                />
              }
            >
              <Trash2 className="size-4" />
              Delete order
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this order?</AlertDialogTitle>
                <AlertDialogDescription>
                  Order {reference} will be removed from your order history.
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={deleting}>
                  Keep order
                </AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  disabled={deleting}
                  onClick={onDelete}
                >
                  {deleting ? "Deleting..." : "Delete order"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}

export default function OrdersPage() {
  const { data, isLoading, isError, refetch } = useFetchUserOrders();
  const deleteOrder = useDeleteUserOrder();
  const orders = data?.orders ?? [];

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/50 bg-linear-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-5xl px-4 py-10 sm:py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium text-primary">
                YOUR SHOPPING HISTORY
              </p>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                My Orders
              </h1>
              <p className="mt-1 text-muted-foreground">
                Track your merchandise orders, delivery, and payment details.
              </p>
            </div>
            <Button
              render={<Link href="/profile" />}
              variant="outline"
              size="sm"
            >
              Back to Profile
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-5xl space-y-4 px-4 py-8 sm:py-10">
        {isLoading ? (
          <Card>
            <CardContent className="py-14 text-center text-sm text-muted-foreground">
              Loading your orders...
            </CardContent>
          </Card>
        ) : isError ? (
          <Card>
            <CardContent className="flex flex-col items-center py-14 text-center">
              <AlertCircle className="mb-3 size-8 text-destructive" />
              <p className="font-medium">We couldn&apos;t load your orders.</p>
              <Button
                type="button"
                variant="outline"
                className="mt-4"
                onClick={() => void refetch()}
              >
                Try again
              </Button>
            </CardContent>
          </Card>
        ) : orders.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center py-14 text-center">
              <Package className="mb-4 size-12 text-muted-foreground/50" />
              <h2 className="text-lg font-semibold">
                No merchandise orders yet
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Your shop orders will appear here after checkout.
              </p>
              <Button render={<Link href="/shop" />} className="mt-6">
                Browse merchandise
              </Button>
            </CardContent>
          </Card>
        ) : (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onDelete={() => deleteOrder.mutate(order.id)}
              deleting={deleteOrder.isLoading}
            />
          ))
        )}
      </section>
    </div>
  );
}
