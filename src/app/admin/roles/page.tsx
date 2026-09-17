"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Shield, Users, Plus, Lock, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type RoleId = "admin" | "staff" | "guide" | "viewer";

interface Permission {
  id: string;
  label: string;
  description: string;
  category: string;
}

interface Role {
  id: RoleId;
  name: string;
  description: string;
  usersCount: number;
  isSystem: boolean;
  permissions: string[]; // permission ids
}

const allPermissions: Permission[] = [
  // Bookings
  {
    id: "bookings.view",
    label: "View bookings",
    description: "See all bookings and their details",
    category: "Bookings",
  },
  {
    id: "bookings.manage",
    label: "Manage bookings",
    description: "Confirm, cancel, or edit bookings",
    category: "Bookings",
  },
  // Participants
  {
    id: "participants.view",
    label: "View participants",
    description: "See participant lists per expedition",
    category: "Participants",
  },
  {
    id: "participants.manage",
    label: "Manage participants",
    description: "Add or remove participants",
    category: "Participants",
  },
  // Payments
  {
    id: "payments.view",
    label: "View payments",
    description: "See payment history and status",
    category: "Payments",
  },
  {
    id: "payments.refund",
    label: "Issue refunds",
    description: "Process refunds for completed payments",
    category: "Payments",
  },
  // Merchandise
  {
    id: "merch.view",
    label: "View merchandise",
    description: "Browse product catalog",
    category: "Merchandise",
  },
  {
    id: "merch.manage",
    label: "Manage merchandise",
    description: "Create, edit, and delete products",
    category: "Merchandise",
  },
  // Reviews
  {
    id: "reviews.view",
    label: "View reviews",
    description: "See customer reviews",
    category: "Reviews",
  },
  {
    id: "reviews.moderate",
    label: "Moderate reviews",
    description: "Approve, hide, or delete reviews",
    category: "Reviews",
  },
  // Users
  {
    id: "users.view",
    label: "View users",
    description: "See user list and profiles",
    category: "Users",
  },
  {
    id: "users.manage",
    label: "Manage users",
    description: "Create users, change roles, suspend accounts",
    category: "Users",
  },
  // Reports & Analytics
  {
    id: "reports.view",
    label: "View reports",
    description: "Generate and download reports",
    category: "Reports",
  },
  {
    id: "analytics.view",
    label: "View analytics",
    description: "Access analytics dashboard",
    category: "Reports",
  },
  // Settings
  {
    id: "settings.manage",
    label: "Manage settings",
    description: "Update company and system settings",
    category: "Settings",
  },
  {
    id: "roles.manage",
    label: "Manage roles",
    description: "Edit roles and permissions",
    category: "Settings",
  },
];

const initialRoles: Role[] = [
  {
    id: "admin",
    name: "Admin",
    description: "Full access to everything",
    usersCount: 2,
    isSystem: true,
    permissions: allPermissions.map((p) => p.id),
  },
  {
    id: "staff",
    name: "Staff",
    description: "Manage bookings, participants, and daily operations",
    usersCount: 4,
    isSystem: true,
    permissions: [
      "bookings.view",
      "bookings.manage",
      "participants.view",
      "participants.manage",
      "payments.view",
      "merch.view",
      "reviews.view",
      "reviews.moderate",
      "users.view",
      "reports.view",
      "analytics.view",
    ],
  },
  {
    id: "guide",
    name: "Guide",
    description: "View assigned expeditions and participant lists",
    usersCount: 6,
    isSystem: false,
    permissions: ["bookings.view", "participants.view", "reviews.view"],
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access to reports and analytics",
    usersCount: 1,
    isSystem: false,
    permissions: ["reports.view", "analytics.view", "bookings.view"],
  },
];

const categories = Array.from(new Set(allPermissions.map((p) => p.category)));

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [selectedRoleId, setSelectedRoleId] = useState<RoleId>("admin");

  const selectedRole = roles.find((r) => r.id === selectedRoleId)!;

  const togglePermission = (permissionId: string) => {
    if (selectedRole.isSystem && selectedRole.id === "admin") return; // admin always full

    setRoles((prev) =>
      prev.map((role) => {
        if (role.id !== selectedRoleId) return role;
        const has = role.permissions.includes(permissionId);
        return {
          ...role,
          permissions: has
            ? role.permissions.filter((id) => id !== permissionId)
            : [...role.permissions, permissionId],
        };
      }),
    );
  };

  const hasPermission = (permissionId: string) =>
    selectedRole.permissions.includes(permissionId);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Roles & Permissions
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Control what each role can see and do in the admin panel.
          </p>
        </div>

        <Button className="gap-2 w-fit">
          <Plus className="h-4 w-4" />
          Create role
        </Button>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Roles list */}
        <div className="lg:w-72 shrink-0 space-y-2">
          {roles.map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() => setSelectedRoleId(role.id)}
              className={cn(
                "flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors",
                selectedRoleId === role.id
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:bg-muted/40",
              )}
            >
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                  selectedRoleId === role.id ? "bg-primary/10" : "bg-muted",
                )}
              >
                <Shield
                  className={cn(
                    "h-4 w-4",
                    selectedRoleId === role.id
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{role.name}</p>
                  {role.isSystem && (
                    <Badge variant="secondary" className="text-[10px]">
                      System
                    </Badge>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                  {role.description}
                </p>
                <p className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  {role.usersCount} user{role.usersCount !== 1 ? "s" : ""}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Permissions panel */}
        <div className="min-w-0 flex-1 rounded-xl border border-border bg-card">
          <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {selectedRole.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {selectedRole.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {selectedRole.id === "admin" && (
                <Badge variant="outline" className="gap-1 text-[10px]">
                  <Lock className="h-3 w-3" />
                  Full access
                </Badge>
              )}
              <Badge variant="secondary" className="text-[10px]">
                {selectedRole.permissions.length} permissions
              </Badge>
            </div>
          </div>

          <div className="p-5 space-y-8">
            {categories.map((category) => {
              const perms = allPermissions.filter(
                (p) => p.category === category,
              );
              return (
                <div key={category}>
                  <h3 className="mb-3 text-sm font-semibold text-foreground">
                    {category}
                  </h3>
                  <div className="space-y-3">
                    {perms.map((perm) => {
                      const enabled = hasPermission(perm.id);
                      const locked =
                        selectedRole.id === "admin" && selectedRole.isSystem;

                      return (
                        <div
                          key={perm.id}
                          className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              {perm.label}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {perm.description}
                            </p>
                          </div>

                          <Switch
                            checked={enabled}
                            disabled={locked}
                            onCheckedChange={() => togglePermission(perm.id)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {selectedRole.id !== "admin" && (
            <div className="flex justify-end gap-3 border-t border-border p-5">
              <Button variant="outline">Reset</Button>
              <Button className="gap-2">
                <Check className="h-4 w-4" />
                Save changes
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
