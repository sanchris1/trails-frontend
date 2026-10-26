"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/useMerchandiseStore";
import {
  ArrowRight,
  CheckCircle2,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const OrderSummary = ({ isSubmitting = false }: { isSubmitting?: boolean }) => {
  const { items, decreaseQuantity, increaseQuantity } = useCartStore();
  const deliveryFee = items.length > 0 ? 250 : 0;

  const subtotal = items.reduce((sum, item) => {
    const price = Number(item.price.replace(/[^\d.]/g, "")) || 0;
    return sum + price * item.quantity;
  }, 0);
  const total = subtotal + deliveryFee;

  const formatKES = (amount: number) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 2,
    }).format(amount);
  return (
    <aside className="lg:sticky lg:top-8">
      <Card className="overflow-hidden rounded-2xl border-border/70 shadow-sm">
        <CardHeader className="border-b bg-muted/20">
          <CardTitle className="flex items-center justify-between text-lg">
            Order summary
            <span className="text-sm font-normal text-muted-foreground">
              {items.reduce((count, item) => count + item.quantity, 0)} items
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5 p-5">
          {items.length === 0 ? (
            <div className="py-8 text-center">
              <ShoppingBag className="mx-auto mb-3 size-8 text-muted-foreground" />
              <p className="font-medium">Your cart is empty</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add merchandise to see your order here.
              </p>
              <Button variant="outline" className="mt-4">
                <Link href="/shop">Browse merchandise</Link>
              </Button>
            </div>
          ) : (
            <div className="max-h-85 space-y-5 overflow-y-auto pr-1 ">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-48  relative size-19 shrink-0 overflow-hidden rounded-xl bg-muted h-48">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover aspect-square"
                    />
                    <span className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">
                      {item.category}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm font-medium">
                      {item.name}
                    </p>
                    <p className="mt-1 font-semibold">
                      {formatKES(
                        (Number(item.price.replace(/[^\d.]/g, "")) || 0) *
                          item.quantity,
                      )}
                    </p>

                    <div className="mt-2 flex items-center gap-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="size-7"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        <Minus className="size-3" />
                      </Button>
                      <span className="w-6 text-center text-xs">
                        {item.quantity}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="size-7"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => increaseQuantity(item.id)}
                      >
                        <Plus className="size-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Separator />

          <div className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatKES(subtotal)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Truck className="size-4" />
                Delivery
              </span>
              <span>{items.length ? formatKES(deliveryFee) : "—"}</span>
            </div>
          </div>

          <Separator />

          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-semibold">Total</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Including delivery
              </p>
            </div>
            <p className="text-2xl font-bold tracking-tight text-primary">
              {formatKES(total)}
            </p>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={items.length === 0 || isSubmitting}
          >
            {isSubmitting ? "Placing order..." : "Place order"}
            <ArrowRight className="ml-2 size-4" />
          </Button>

          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            {isSubmitting
              ? "Submitting your order securely..."
              : "Your order details will be reviewed before fulfillment."}
          </p>
        </CardContent>
      </Card>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <CheckCircle2 className="size-4 text-primary" />
        Thank you for supporting our merchandise store.
      </div>
    </aside>
  );
};

export default OrderSummary;
