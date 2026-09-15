"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Search,
  Download,
  Plus,
  Eye,
  Pencil,
  Trash2,
  LayoutGrid,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import CreateMerchandiseSidebar from "./components/CreateEditMerchandiseSidebar";
import { useFetchAllMerchandise } from "@/hooks/merchandise/fetchMerchandise";
import { useDeleteMerchandise } from "@/hooks/merchandise/deleteMerchandise";
import LoaderButton from "@/components/common/LoaderButton";

export default function MerchandisePage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data } = useFetchAllMerchandise();

  const { mutate: deleteMerchandise, isPending } = useDeleteMerchandise();

  const stockFilters = [
    { key: "all", label: "ALL PRODUCTS" },
    { key: "in-stock", label: "IN STOCK" },
    { key: "low-stock", label: "LOW STOCK" },
    { key: "drafts", label: "DRAFTS" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <span>Inventory Ledger</span>
          <span>•</span>
          <span>Storefront Curations</span>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Merchandise
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage the products available in the Trails & Memoirs shop.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Catalog
            </Button>
            <Button className="gap-2" onClick={() => setSidebarOpen(true)}>
              <Plus className="h-4 w-4" />
              Add Merchandise
            </Button>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search merchandise by title, SKU, or tag..."
              className="bg-card pl-9"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select defaultValue="outdoor">
              <SelectTrigger className="w-40 bg-card">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="outdoor">Outdoor Gear</SelectItem>
                <SelectItem value="apparel">Apparel</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="price-high">
              <SelectTrigger className="w-40 bg-card">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center rounded-md border border-border bg-card p-1">
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-8 w-8", viewMode === "list" && "bg-muted")}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-8 w-8", viewMode === "grid" && "bg-muted")}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Status Tabs + Sync */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {stockFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
                  activeFilter === filter.key
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:bg-muted",
                )}
              >
                {filter.label}{" "}
                {activeFilter === filter.key && (
                  <span className="ml-1 opacity-80">{data?.length}</span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Nairobi Main Archive Vault • Synced
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-[320px] text-xs font-semibold uppercase tracking-wider">
                  Product Details
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">
                  Category
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">
                  Price (KSH)
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">
                  Available Colors
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">
                  Media
                </TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.map((product) => (
                <TableRow
                  key={product?.merchandise?.id}
                  className="hover:bg-muted/20"
                >
                  {/* Product Details */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                        <Image
                          src={product.merchandise_images?.images[0]?.url}
                          alt={product?.merchandise.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium leading-tight text-foreground">
                          {product?.merchandise.title}
                        </p>
                        {/* <div className="mt-1 flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {product.sku}
                          </span>
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-[10px] font-medium",
                              product.stockStatus === "in-stock" &&
                                "border-success/30 bg-success/10 text-success",
                              product.stockStatus === "low-stock" &&
                                "border-warning/30 bg-warning/10 text-warning",
                            )}
                          >
                            {product.stockStatus === "in-stock"
                              ? "In Stock"
                              : "Low Stock"}{" "}
                            +{product.stock}
                          </Badge>
                        </div> */}
                      </div>
                    </div>
                  </TableCell>

                  {/* Category */}
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="text-[10px] font-semibold uppercase tracking-wide"
                    >
                      {product?.merchandise.category}
                    </Badge>
                  </TableCell>

                  {/* Price */}
                  <TableCell>
                    <div>
                      <p className="font-semibold text-foreground">
                        Ksh: {product?.merchandise.price.toLocaleString()}
                      </p>
                    </div>
                  </TableCell>

                  {/* Colors */}
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {product?.merchandise_colors.colors.map((color, i) => (
                        <span
                          key={i}
                          className="h-4 w-4 rounded-full border border-border"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                      <span className="ml-1 text-xs text-muted-foreground">
                        {product?.merchandise_colors.colors.length}
                      </span>
                    </div>
                  </TableCell>

                  {/* Media */}
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <span className="text-xs">🖼</span>
                      {product?.merchandise_images?.images?.length} images
                    </div>
                  </TableCell>

                  {/* Date
                  <TableCell className="text-sm text-muted-foreground">
                    {product.dateCataloged}
                  </TableCell> */}

                  {/* Actions */}
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() =>
                          deleteMerchandise({
                            merchandiseId: product?.merchandise?.id,
                          })
                        }
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        {" "}
                        {isPending ? (
                          <LoaderButton />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}{" "}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <CreateMerchandiseSidebar
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
      />
    </div>
  );
}
