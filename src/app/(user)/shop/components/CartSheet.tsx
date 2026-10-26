"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartStore } from "@/store/useMerchandiseStore";
import { useRouter } from "next/navigation";

// Supports prices such as "1500", "KES 1,500", and "KES 1,500.00".
function parsePrice(price: string): number {
  const parsed = Number(price.replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatPrice(price: number): string {
  return `KES ${price.toLocaleString("en-KE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

export default function CartSheet() {
  const router = useRouter();

  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    isCartOpen,
    setIsCartOpen,
    clearCart,
  } = useCartStore();

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce(
    (total, item) => total + parsePrice(item.price) * item.quantity,
    0,
  );

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    router.push("/shop");
  };

  const onCheckout = () => {
    setIsCartOpen(false);
    router.replace("/checkout");
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-md md:max-w-lg"
      >
        {/* Header */}
        <SheetHeader className="border-b px-5 py-5 sm:px-6">
          <div className="flex items-center justify-between pr-7">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShoppingBag className="size-5" />
              </div>

              <div className="space-y-1 text-left">
                <SheetTitle className="text-xl font-semibold tracking-tight">
                  Your Cart
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({totalItems})
                  </span>
                </SheetTitle>

                <SheetDescription className="text-xs">
                  Your picks, ready when you are.
                </SheetDescription>
              </div>
            </div>
          </div>
        </SheetHeader>

        {/* Cart Items */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="size-9 text-muted-foreground" />
            </div>

            <h3 className="text-lg font-semibold">Your cart is empty</h3>

            <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
              Looks like you haven&apos;t found your next favorite item yet.
            </p>

            <Button
              onClick={handleContinueShopping}
              className="mt-6 gap-2 rounded-full px-6"
            >
              Explore merchandise
              <ArrowRight className="size-4" />
            </Button>
          </div>
        ) : (
          <>
            <div className="hide-scrollbar flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {totalItems} {totalItems === 1 ? "item" : "items"} in your
                  cart
                </p>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-auto px-2 text-xs text-muted-foreground hover:text-destructive"
                  onClick={() => {
                    clearCart();
                  }}
                >
                  Clear cart
                </Button>
              </div>

              {items.map((item) => (
                <div key={item.id} className="space-y-5">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link
                      href={`/shop/${item.slug}`}
                      onClick={() => setIsCartOpen(false)}
                      className="relative block size-28 shrink-0 overflow-hidden rounded-xl bg-muted sm:size-32"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="128px"
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                      <div className="space-y-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          {item.category}
                        </p>

                        <Link
                          href={`/shop/${item.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="line-clamp-2 text-sm font-medium leading-5 transition-colors hover:text-primary"
                        >
                          {item.name}
                        </Link>

                        <p className="text-sm font-semibold text-primary">
                          {formatPrice(parsePrice(item.price))}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        {/* Quantity Controls */}
                        <div className="flex h-9 items-center rounded-full border bg-background">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="size-8 rounded-full"
                            disabled={item.quantity <= 1}
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            <Minus className="size-3.5" />
                          </Button>

                          <span className="w-6 text-center text-xs font-medium tabular-nums">
                            {item.quantity}
                          </span>

                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label={`Increase quantity of ${item.name}`}
                            className="size-8 rounded-full"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            <Plus className="size-3.5" />
                          </Button>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label={`Remove ${item.name} from cart`}
                          className="size-9 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t bg-card px-5 py-5 sm:px-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold tabular-nums">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <p className="text-xs leading-5 text-muted-foreground">
                  Shipping and any applicable taxes are calculated at checkout.
                </p>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold tracking-tight text-primary tabular-nums">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <Button
                  type="button"
                  onClick={onCheckout}
                  className="h-12 w-full gap-2 rounded-full text-sm font-semibold shadow-sm"
                >
                  Proceed to Checkout
                  <ArrowRight className="size-4" />
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleContinueShopping}
                  className="h-11 w-full rounded-full"
                >
                  Continue Shopping
                </Button>

                <p className="pt-1 text-center text-[10px] tracking-wide text-muted-foreground">
                  THANK YOU FOR SHOPPING WITH US
                </p>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
