"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Truck,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCartStore } from "@/store/useMerchandiseStore";
import {
  createMerchandiseOrder,
  type CreateMerchandiseOrderResponse,
} from "@/hooks/merchandise/createMerchandiseOrder";
import toast from "react-hot-toast";
import OrderSummary from "./components/OrderSummary";

type PaymentMethod = "mpesa" | "cod";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa");
  const [submittedOrder, setSubmittedOrder] =
    useState<CreateMerchandiseOrderResponse | null>(null);
  const { items, clearCart } = useCartStore();

  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
    county: "",
    town: "",
    address: "",
    notes: "",
    mpesaReceiptNumber: "",
  });

  function updateCustomer(field: keyof typeof customer, value: string) {
    setCustomer((current) => ({ ...current, [field]: value }));
  }

  const orderMutation = useMutation({
    mutationFn: createMerchandiseOrder,
    onSuccess: (order) => {
      setSubmittedOrder(order);
      clearCart();
      toast.success(order.message ?? "Your order has been received.");
    },
    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : "We couldn't submit your order. Please try again.";
      toast.error(message);
    },
  });

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (items.length === 0) {
      toast.error("Your cart is empty. Add an item before placing an order.");
      return;
    }

    orderMutation.mutate({
      customer: {
        fullName: customer.fullName.trim(),
        email: customer.email.trim(),
        phone: customer.phone.trim(),
      },
      delivery: {
        county: customer.county.trim(),
        town: customer.town.trim(),
        address: customer.address.trim(),
        notes: customer.notes.trim() || undefined,
      },
      paymentMethod,
      mpesaReceiptNumber:
        paymentMethod === "mpesa"
          ? customer.mpesaReceiptNumber.trim().toUpperCase()
          : undefined,
      items: items.map((item) => ({
        merchandiseId: item.id,
        quantity: item.quantity,
      })),
    });
  }

  const orderReference =
    submittedOrder?.order?.orderNumber ?? submittedOrder?.order?.id;

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/shop"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Continue shopping
          </Link>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-medium text-primary">
                YOUR ORDER, YOUR WAY
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Checkout
              </h1>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Complete your details and get your merchandise delivered.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="size-5 text-primary" />
              Secure checkout
            </div>
          </div>
        </div>

        {submittedOrder ? (
          <Card className="mx-auto max-w-2xl overflow-hidden rounded-3xl border-primary/20 shadow-sm">
            <CardContent className="flex flex-col items-center px-6 py-12 text-center sm:px-10">
              <span className="mb-5 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="size-8" />
              </span>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Order received
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Thanks, {customer.fullName.trim().split(" ")[0]}!
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                We&apos;ve received your merchandise order
                {paymentMethod === "mpesa"
                  ? " and M-Pesa receipt details"
                  : ""}
                . We&apos;ll be in touch to confirm the next steps.
              </p>
              {orderReference && (
                <p className="mt-5 rounded-full bg-muted px-4 py-2 text-sm">
                  Order reference{" "}
                  <span className="font-semibold">{orderReference}</span>
                </p>
              )}
              <Link
                href="/shop"
                className="mt-8 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                Continue shopping
              </Link>
            </CardContent>
          </Card>
        ) : (
        <form onSubmit={submitOrder}>
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            {/* Contact */}
            <Card className="rounded-2xl border-border/70 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ShoppingBag className="size-5" />
                  </span>
                  Contact information
                </CardTitle>
              </CardHeader>

              <CardContent className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                    value={customer.fullName}
                    onChange={(e) => updateCustomer("fullName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    value={customer.email}
                    onChange={(e) => updateCustomer("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+254 7XX XXX XXX"
                    autoComplete="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => updateCustomer("phone", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery */}
            <Card className="rounded-2xl border-border/70 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MapPin className="size-5" />
                  </span>
                  Delivery details
                </CardTitle>
              </CardHeader>

              <CardContent className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="county">County</Label>
                  <Input
                    id="county"
                    placeholder="e.g. Nairobi"
                    autoComplete="address-level1"
                    required
                    value={customer.county}
                    onChange={(e) => updateCustomer("county", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="town">Town / city</Label>
                  <Input
                    id="town"
                    placeholder="e.g. Westlands"
                    autoComplete="address-level2"
                    required
                    value={customer.town}
                    onChange={(e) => updateCustomer("town", e.target.value)}
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">
                    Street, estate or delivery address
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="Building, street, estate or nearby landmark"
                    rows={3}
                    autoComplete="street-address"
                    required
                    value={customer.address}
                    onChange={(e) => updateCustomer("address", e.target.value)}
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="notes">
                    Delivery instructions{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Anything the delivery person should know?"
                    rows={2}
                    value={customer.notes}
                    onChange={(e) => updateCustomer("notes", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card className="rounded-2xl border-border/70 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <CreditCard className="size-5" />
                  </span>
                  Payment method
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred payment method.
                </p>
              </CardHeader>

              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) =>
                    setPaymentMethod(value === "cod" ? "cod" : "mpesa")
                  }
                  className="space-y-3"
                >
                  <Label
                    htmlFor="mpesa"
                    className="flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/50 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5"
                  >
                    <RadioGroupItem value="mpesa" id="mpesa" />
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Smartphone className="size-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-medium">M-Pesa</span>
                      <span className="mt-1 block text-sm font-normal text-muted-foreground">
                        Mobile money
                      </span>
                    </span>
                  </Label>

                  <Label
                    htmlFor="cod"
                    className="flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/50 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5"
                  >
                    <RadioGroupItem value="cod" id="cod" />
                    <span className="flex size-10 items-center justify-center rounded-lg bg-muted">
                      <Truck className="size-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-medium">
                        Cash on delivery
                      </span>
                      <span className="mt-1 block text-sm font-normal text-muted-foreground">
                        Pay when your order arrives
                      </span>
                    </span>
                  </Label>
                </RadioGroup>
                {paymentMethod === "mpesa" && (
                  <div className="mt-5 space-y-2 rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <Label htmlFor="mpesaReceiptNumber">
                      M-Pesa receipt number
                    </Label>
                    <Input
                      id="mpesaReceiptNumber"
                      placeholder="e.g. QK12ABC345"
                      autoComplete="off"
                      autoCapitalize="characters"
                      maxLength={12}
                      minLength={8}
                      pattern="[A-Za-z0-9]{8,12}"
                      required
                      value={customer.mpesaReceiptNumber}
                      onChange={(event) =>
                        updateCustomer(
                          "mpesaReceiptNumber",
                          event.target.value
                            .replace(/[^a-zA-Z0-9]/g, "")
                            .toUpperCase(),
                        )
                      }
                      aria-describedby="mpesa-receipt-help"
                    />
                    <p
                      id="mpesa-receipt-help"
                      className="text-xs leading-5 text-muted-foreground"
                    >
                      Enter the confirmation code from your M-Pesa payment
                      message. We&apos;ll verify it before processing your
                      order.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order summary */}
          <OrderSummary isSubmitting={orderMutation.isLoading} />
        </div>
        </form>
        )}
      </div>
    </main>
  );
}
