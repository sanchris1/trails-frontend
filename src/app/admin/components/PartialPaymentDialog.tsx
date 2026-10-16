/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import * as React from "react";
import { Wallet, ArrowRight, CircleDollarSign } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useUpdatePaymentAndBookingStatus } from "@/hooks/booking/admin/updatePaymentAndBookingStatus";

type PartialPaymentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totalAmount: number;
  currency?: string;
  orderReference?: string;
  targetItem: { id: string; status: string };
};

export function PartialPaymentDialog({
  open,
  onOpenChange,
  totalAmount,
  currency = "KES",
  orderReference,
  targetItem,
}: PartialPaymentDialogProps) {
  const [amount, setAmount] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (open) {
      setAmount("");
      setError("");
    }
  }, [open]);

  const amountPaid = Number(amount);
  const remaining = Math.max(0, totalAmount - amountPaid);

  const validAmount =
    amount.trim() !== "" &&
    Number.isFinite(amountPaid) &&
    amountPaid > 0 &&
    amountPaid < totalAmount;

  const formatMoney = (value: number) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);

  const { mutate: updateStatus, isPending } =
    useUpdatePaymentAndBookingStatus();

  async function handleConfirm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!Number.isFinite(amountPaid) || amountPaid <= 0) {
      setError("Enter an amount greater than zero.");
      return;
    }

    if (amountPaid >= totalAmount) {
      setError("Partial payment must be less than the total amount due.");
      return;
    }

    try {
      updateStatus({
        bookingId: targetItem.id,
        status: targetItem.status,
        amountPaid: amount,
      });
      onOpenChange(false);
    } catch {
      setError("Unable to save the payment. Please try again.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-md">
        <DialogHeader className="border-b bg-primary/3 px-6 py-5">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Wallet className="size-5" />
            </div>

            <Badge
              variant="outline"
              className="border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
            >
              Partial payment
            </Badge>
          </div>

          <DialogTitle className="text-xl">Confirm partial payment</DialogTitle>

          <DialogDescription>
            Enter the amount received from the customer to update this
            order&apos;s payment record.
          </DialogDescription>

          {orderReference && (
            <p className="pt-1 text-xs text-muted-foreground">
              Order reference: {orderReference}
            </p>
          )}
        </DialogHeader>

        <form onSubmit={handleConfirm}>
          <div className="space-y-5 px-6 py-5">
            <div className="rounded-xl border bg-card p-4">
              <p className="text-sm text-muted-foreground">Total amount due</p>

              <p className="mt-1 text-2xl font-bold tracking-tight">
                {formatMoney(totalAmount)}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="partial-payment-amount">
                Amount received ({currency})
              </Label>

              <div className="relative">
                <CircleDollarSign className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="partial-payment-amount"
                  type="number"
                  inputMode="decimal"
                  min="0.01"
                  max={totalAmount}
                  step="0.01"
                  placeholder="e.g. 5000"
                  value={amount}
                  onChange={(event) => {
                    setAmount(event.target.value);
                    setError("");
                  }}
                  aria-invalid={!!error}
                  className="h-12 pl-10 text-base"
                  autoFocus
                />
              </div>

              <p className="text-xs text-muted-foreground">
                Must be greater than zero and less than the total amount due.
              </p>
            </div>

            <div className="rounded-xl bg-muted/60 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">
                  Amount received
                </span>

                <span className="font-semibold text-primary">
                  {formatMoney(Number.isFinite(amountPaid) ? amountPaid : 0)}
                </span>
              </div>

              <Separator className="my-3" />

              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">
                  Outstanding balance
                </span>

                <span className="font-semibold">{formatMoney(remaining)}</span>
              </div>
            </div>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
          </div>

          <DialogFooter className="border-t bg-muted/20 px-6 py-4 sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={!validAmount || isPending}
              className="gap-2"
            >
              {isPending ? "Confirming payment..." : " Confirm payment"}
              <ArrowRight className="size-4" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
