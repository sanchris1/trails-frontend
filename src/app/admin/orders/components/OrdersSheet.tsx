import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  MerchandiseOrder,
  MerchandiseOrderStatus,
} from "@/types/merchandiseOrder";
import { formatCurrency, formatStatus, getStatusClass } from "../page";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package } from "lucide-react";

const nextStatusByStatus: Record<string, MerchandiseOrderStatus[]> = {
  pending: ["processing", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: ["completed"],
  completed: [],
  cancelled: [],
};

export default function OrderDetailsSheet({
  order,
  open,
  onOpenChange,
  isUpdating,
  onStatusChange,
}: {
  order: MerchandiseOrder | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isUpdating: boolean;
  onStatusChange: (status: MerchandiseOrderStatus) => void;
}) {
  const nextStatuses = order ? (nextStatusByStatus[order.status] ?? []) : [];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        {order && (
          <>
            <SheetHeader className="border-b pr-12">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Merchandise order
              </p>
              <SheetTitle className="text-xl">
                {order.orderId ?? order.id}
              </SheetTitle>
              <SheetDescription>
                Placed{" "}
                {new Date(order.createdAt).toLocaleDateString("en-KE", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-6 overflow-y-auto px-4 pb-6">
              <section className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">Order status</h3>
                    <p className="text-xs text-muted-foreground">
                      Advance the order through the available steps.
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={getStatusClass(order.status)}
                  >
                    {formatStatus(order.status)}
                  </Badge>
                </div>

                {nextStatuses.length > 0 ? (
                  <Select
                    value=""
                    onValueChange={(value) => {
                      const nextStatus = nextStatuses.find(
                        (status) => status === value,
                      );
                      if (nextStatus) onStatusChange(nextStatus);
                    }}
                    disabled={isUpdating}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          isUpdating
                            ? "Updating status..."
                            : "Update order status"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {nextStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {formatStatus(status)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
                    This order is in a final status and cannot be changed.
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Status flow: pending → processing → shipped → delivered →
                  completed. Pending and processing orders may also be
                  cancelled.
                </p>
              </section>

              <Separator />

              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Items</h3>
                  <span className="text-xs text-muted-foreground">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                    total
                  </span>
                </div>
                <div className="divide-y rounded-xl border">
                  {order.items.map((item, index) => (
                    <div
                      key={`${item.merchandiseId}-${index}`}
                      className="flex items-start justify-between gap-4 p-3"
                    >
                      <div className="flex min-w-0 gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Package className="size-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Quantity {item.quantity} ·{" "}
                            {formatCurrency(item.unitPrice)} each
                          </p>
                        </div>
                      </div>
                      <p className="shrink-0 font-semibold">
                        {formatCurrency(item.unitPrice * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 px-1 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{formatCurrency(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span>{formatCurrency(order.deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(order.totalAmount)}</span>
                  </div>
                </div>
              </section>

              <Separator />

              <section className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-semibold">Customer</h3>
                  <p className="text-sm">{order.customer.fullName}</p>
                  <p className="break-all text-sm text-muted-foreground">
                    {order.customer.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.customer.phone}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Delivery</h3>
                  <p className="text-sm">
                    {order.delivery.address}
                    <br />
                    {order.delivery.town}, {order.delivery.county}
                  </p>
                  {order.delivery.notes && (
                    <p className="text-sm text-muted-foreground">
                      Note: {order.delivery.notes}
                    </p>
                  )}
                </div>
              </section>

              <Separator />

              <section className="space-y-2">
                <h3 className="font-semibold">Payment</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={getStatusClass(order.paymentStatus)}
                  >
                    {formatStatus(order.paymentStatus)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {formatStatus(order.paymentMethod)}
                  </span>
                </div>
                {order.mpesaReceiptNumber && (
                  <p className="text-sm text-muted-foreground">
                    M-Pesa receipt:{" "}
                    <span className="font-medium text-foreground">
                      {order.mpesaReceiptNumber}
                    </span>
                  </p>
                )}
              </section>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
