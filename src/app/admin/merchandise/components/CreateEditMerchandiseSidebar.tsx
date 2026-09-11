"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Upload, X, Plus } from "lucide-react";

interface CreateMerchandiseSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "edit";
}

export default function CreateMerchandiseSidebar({
  open,
  onOpenChange,
  mode = "create",
}: CreateMerchandiseSidebarProps) {
  const [colors, setColors] = useState<string[]>(["#8B4513"]);
  const [newColor, setNewColor] = useState("#000000");

  const addColor = () => {
    if (newColor && !colors.includes(newColor)) {
      setColors([...colors, newColor]);
    }
  };

  const removeColor = (color: string) => {
    setColors(colors.filter((c) => c !== color));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg min-w-64 overflow-y-auto px-2">
        <SheetHeader className="pb-2">
          <SheetTitle className="text-xl">
            {mode === "create" ? "Add Merchandise" : "Edit Merchandise"}
          </SheetTitle>
          <SheetDescription>
            {mode === "create"
              ? "Add a new product to the Trails & Memoirs catalog."
              : "Update the details of this product."}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Basic Information
            </h3>

            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                placeholder="e.g. Mara Expedition Heavyweight Tee"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sku">SKU *</Label>
                <Input id="sku" placeholder="TM-APP-042" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apparel">Apparel</SelectItem>
                    <SelectItem value="outdoor-gear">Outdoor Gear</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the product..."
                rows={3}
              />
            </div>
          </div>

          <Separator />

          {/* Pricing & Stock */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Pricing & Inventory
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priceKes">Price (KES) *</Label>
                <Input id="priceKes" type="number" placeholder="6500" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priceUsd">Price (USD)</Label>
                <Input
                  id="priceUsd"
                  type="number"
                  placeholder="52.00"
                  step="0.01"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity *</Label>
                <Input id="stock" type="number" placeholder="84" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="published">
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Colors */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Available Colors
            </h3>

            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <div
                  key={color}
                  className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-border"
                  style={{ backgroundColor: color }}
                >
                  <button
                    type="button"
                    onClick={() => removeColor(color)}
                    className="absolute -right-1 -top-1 hidden h-4 w-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground group-hover:flex"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="h-9 w-14 p-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addColor}
                className="gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Color
              </Button>
            </div>
          </div>

          <Separator />

          {/* Media */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Product Images
            </h3>

            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 px-6 py-10 text-center transition-colors hover:bg-muted/50">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">
                Click to upload or drag and drop
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                PNG, JPG or WEBP (max. 5MB each)
              </p>
              <Button variant="outline" size="sm" className="mt-4">
                Select Images
              </Button>
            </div>
          </div>
        </div>

        <SheetFooter className="mt-8 flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button className="w-full sm:w-auto">
            {mode === "create" ? "Create Product" : "Save Changes"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
