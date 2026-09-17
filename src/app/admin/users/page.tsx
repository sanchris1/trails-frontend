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

type UserRole = "admin" | "staff" | "customer";
type UserStatus = "active" | "inactive" | "suspended";

interface AppUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  bookingsCount: number;
  createdAt: string;
  lastLogin?: string;
}

const mockUsers: AppUser[] = [
  {
    id: "USR-001",
    fullName: "Sam Admin",
    email: "sam@trailsandmemoirs.com",
    phone: "+254 700 000 001",
    role: "admin",
    status: "active",
    bookingsCount: 0,
    createdAt: "2026-01-10T08:00:00Z",
    lastLogin: "2026-09-17T06:30:00Z",
  },
  {
    id: "USR-002",
    fullName: "Jane Staff",
    email: "jane@trailsandmemoirs.com",
    phone: "+254 700 000 002",
    role: "staff",
    status: "active",
    bookingsCount: 0,
    createdAt: "2026-03-15T10:20:00Z",
    lastLogin: "2026-09-16T14:10:00Z",
  },
  {
    id: "USR-003",
    fullName: "John Doe",
    email: "john@email.com",
    phone: "+254 712 345 678",
    role: "customer",
    status: "active",
    bookingsCount: 3,
    createdAt: "2026-06-02T12:00:00Z",
    lastLogin: "2026-09-15T09:45:00Z",
  },
  {
    id: "USR-004",
    fullName: "Sarah Wanjiku",
    email: "sarah@email.com",
    role: "customer",
    status: "active",
    bookingsCount: 2,
    createdAt: "2026-07-18T16:30:00Z",
    lastLogin: "2026-09-14T18:20:00Z",
  },
  {
    id: "USR-005",
    fullName: "James Mwangi",
    email: "james@email.com",
    phone: "+254 722 111 222",
    role: "customer",
    status: "inactive",
    bookingsCount: 1,
    createdAt: "2026-05-22T11:15:00Z",
    lastLogin: "2026-08-01T10:00:00Z",
  },
  {
    id: "USR-006",
    fullName: "Grace Akinyi",
    email: "grace@email.com",
    role: "customer",
    status: "active",
    bookingsCount: 4,
    createdAt: "2026-04-09T09:40:00Z",
    lastLogin: "2026-09-12T07:55:00Z",
  },
  {
    id: "USR-007",
    fullName: "Peter Kamau",
    email: "peter@email.com",
    role: "customer",
    status: "suspended",
    bookingsCount: 0,
    createdAt: "2026-08-30T13:00:00Z",
  },
];

const roleConfig: Record<UserRole, { label: string; className: string }> = {
  admin: {
    label: "Admin",
    className: "bg-purple-500/10 text-purple-700 border-purple-500/20",
  },
  staff: {
    label: "Staff",
    className: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  },
  customer: {
    label: "Customer",
    className: "bg-muted text-muted-foreground border-border",
  },
};

const statusConfig: Record<UserStatus, { label: string; className: string }> = {
  active: {
    label: "Active",
    className: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  },
  inactive: {
    label: "Inactive",
    className: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  },
  suspended: {
    label: "Suspended",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

function formatDate(dateString?: string) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AppUser[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | UserRole>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | UserStatus>("all");

  const filtered = users.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.id.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: users.length,
    admins: users.filter((u) => u.role === "admin" || u.role === "staff")
      .length,
    customers: users.filter((u) => u.role === "customer").length,
    active: users.filter((u) => u.status === "active").length,
  };

  const updateStatus = (id: string, status: UserStatus) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Users
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage admins, staff, and customers.
          </p>
        </div>

        <Button className="gap-2 w-fit">
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
          <p className="mt-1 text-2xl font-semibold text-foreground">
            {stats.total}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">
            Admins & Staff
          </p>
          <p className="mt-1 text-2xl font-semibold text-foreground">
            {stats.admins}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">Customers</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">
            {stats.customers}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">Active</p>
          <p className="mt-1 text-2xl font-semibold text-emerald-600">
            {stats.active}
          </p>
        </div>
      </div>

      {/* Filters */}
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

        <div className="flex gap-3">
          <Select
            value={roleFilter}
            onValueChange={(v) => setRoleFilter(v as "all" | UserRole)}
          >
            <SelectTrigger className="w-35">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="staff">Staff</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as "all" | UserStatus)}
          >
            <SelectTrigger className="w-35">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Last login</TableHead>
              <TableHead className="w-12.5" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                  <p className="text-sm text-muted-foreground">
                    No users found
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                        {user.role === "admin" || user.role === "staff" ? (
                          <Shield className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <User className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {user.fullName}
                        </p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground truncate">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-medium",
                        roleConfig[user.role].className,
                      )}
                    >
                      {roleConfig[user.role].label}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-medium",
                        statusConfig[user.status].className,
                      )}
                    >
                      {statusConfig[user.status].label}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-sm">
                    {user.role === "customer" ? user.bookingsCount : "—"}
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(user.createdAt)}
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(user.lastLogin)}
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit user</DropdownMenuItem>
                        {user.status !== "active" && (
                          <DropdownMenuItem
                            onClick={() => updateStatus(user.id, "active")}
                          >
                            Activate
                          </DropdownMenuItem>
                        )}
                        {user.status !== "suspended" && (
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => updateStatus(user.id, "suspended")}
                          >
                            Suspend
                          </DropdownMenuItem>
                        )}
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
