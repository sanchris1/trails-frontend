"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import {
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  Shield,
  User,
  Mail,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useFetchAllUsers } from "@/hooks/users/fetchAllUsers";
import axios from "axios";

const roleConfig = {
  admin: {
    label: "Admin",
    className: "bg-purple-500/10 text-purple-700 border-purple-500/20",
  },
  user: {
    label: "User",
    className: "bg-muted text-muted-foreground border-border",
  },
} as const;

function formatDate(dateString?: Date | null) {
  if (!dateString) return "Never";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminUsersPage() {
  const { data: users = [], error, isLoading, refetch } = useFetchAllUsers();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">("all");

  const filtered = users.filter((currentUser) => {
    const query = search.toLowerCase().trim();

    const matchesSearch =
      (currentUser.name ?? "").toLowerCase().includes(query) ||
      currentUser.email.toLowerCase().includes(query) ||
      currentUser.id.toLowerCase().includes(query);

    const matchesRole = roleFilter === "all" || currentUser.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const stats = {
    total: users.length,
    admins: users.filter((u) => u.role === "admin").length,
    customers: users.filter((u) => u.role === "user").length,
    bookings: users.reduce((total, u) => total + Number(u.bookings || 0), 0),
  };

  if (axios.isAxiosError(error)) {
    console.log(error.response);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Users
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage admins and customers.
          </p>
        </div>

        <Button className="w-fit gap-2">
          <UserPlus className="h-4 w-4" />
          Add user
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">
            Total users
          </p>
          <p className="mt-1 text-2xl font-semibold">
            {isLoading ? "—" : stats.total}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">Admins</p>
          <p className="mt-1 text-2xl font-semibold">
            {isLoading ? "—" : stats.admins}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">Customers</p>
          <p className="mt-1 text-2xl font-semibold">
            {isLoading ? "—" : stats.customers}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">
            Total bookings
          </p>
          <p className="mt-1 text-2xl font-semibold">
            {isLoading ? "—" : stats.bookings}
          </p>
        </div>
      </div>

      {/* Search and filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select
          value={roleFilter}
          onValueChange={(value) =>
            setRoleFilter(value as "all" | "admin" | "user")
          }
        >
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Role" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
            <SelectItem value="user">Customers</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Last login</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <p className="text-sm text-muted-foreground">
                    Loading users...
                  </p>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <div className="space-y-2">
                    <p className="text-sm text-destructive">
                      Failed to load users.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => refetch()}
                    >
                      Try again
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <p className="text-sm text-muted-foreground">
                    {users.length === 0
                      ? "No users available"
                      : "No users match your search"}
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((currentUser) => (
                <TableRow key={currentUser.id}>
                  {/* User details */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                        {currentUser.role === "admin" ? (
                          <Shield className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <User className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">
                          {currentUser.name || "Unnamed user"}
                        </p>
                        <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                          <Mail className="h-3 w-3 shrink-0" />
                          {currentUser.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Role */}
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-medium",
                        roleConfig[currentUser.role].className,
                      )}
                    >
                      {roleConfig[currentUser.role].label}
                    </Badge>
                  </TableCell>

                  {/* Booking count */}
                  <TableCell className="text-sm">
                    {currentUser.role === "user" ? currentUser.bookings : "—"}
                  </TableCell>

                  {/* Joined date */}
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(currentUser.joined)}
                  </TableCell>

                  {/* Last login */}
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(currentUser.lastLogin)}
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          aria-label={`Actions for ${currentUser.name}`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            navigator.clipboard.writeText(currentUser.id)
                          }
                        >
                          Copy user ID
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            (window.location.href = `mailto:${currentUser.email}`)
                          }
                        >
                          Email user
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
