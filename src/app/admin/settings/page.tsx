"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { User, Building2, Bell, Lock, Save } from "lucide-react";
import { cn } from "@/lib/utils";

type SettingsTab = "profile" | "company" | "notifications" | "security";

interface ProfileFormValues {
  fullName: string;
  email: string;
  phone: string;
}

interface CompanyFormValues {
  companyName: string;
  supportEmail: string;
  phone: string;
  location: string;
  description: string;
}

interface SecurityFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const tabs = [
  { id: "profile" as const, label: "Profile", icon: User },
  { id: "company" as const, label: "Company", icon: Building2 },
  { id: "notifications" as const, label: "Notifications", icon: Bell },
  { id: "security" as const, label: "Security", icon: Lock },
];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  // Notification toggles (UI only for now)
  const [emailBooking, setEmailBooking] = useState(true);
  const [emailContact, setEmailContact] = useState(true);
  const [emailCancel, setEmailCancel] = useState(true);
  const [emailLowStock, setEmailLowStock] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    defaultValues: {
      fullName: "Sam Admin",
      email: "sam@trailsandmemoirs.com",
      phone: "+254 700 000 000",
    },
  });

  const companyForm = useForm<CompanyFormValues>({
    defaultValues: {
      companyName: "Trails & Memoirs",
      supportEmail: "hello@trailsandmemoirs.com",
      phone: "+254 700 000 000",
      location: "Nairobi, Kenya",
      description:
        "Guided hikes, outdoor experiences, and trail-inspired merchandise.",
    },
  });

  const securityForm = useForm<SecurityFormValues>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = (data: ProfileFormValues) => {
    console.log("Profile updated:", data);
    // Later: API call
  };

  const onCompanySubmit = (data: CompanyFormValues) => {
    console.log("Company updated:", data);
  };

  const onSecuritySubmit = (data: SecurityFormValues) => {
    if (data.newPassword !== data.confirmPassword) {
      securityForm.setError("confirmPassword", {
        message: "Passwords do not match",
      });
      return;
    }
    console.log("Password change requested");
    securityForm.reset();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account, company details, and preferences.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Side tabs */}
        <nav className="flex gap-2 overflow-x-auto lg:w-52 lg:flex-col lg:overflow-visible">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* ─── Profile ─── */}
          {activeTab === "profile" && (
            <form
              onSubmit={profileForm.handleSubmit(onProfileSubmit)}
              className="rounded-xl border border-border bg-card p-6 space-y-6"
            >
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Profile
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your personal admin account details.
                </p>
              </div>

              <Separator />

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input
                    id="fullName"
                    {...profileForm.register("fullName", {
                      required: "Name is required",
                    })}
                  />
                  {profileForm.formState.errors.fullName && (
                    <p className="text-xs text-destructive">
                      {profileForm.formState.errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...profileForm.register("email", {
                      required: "Email is required",
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" {...profileForm.register("phone")} />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" />
                  Save changes
                </Button>
              </div>
            </form>
          )}

          {/* ─── Company ─── */}
          {activeTab === "company" && (
            <form
              onSubmit={companyForm.handleSubmit(onCompanySubmit)}
              className="rounded-xl border border-border bg-card p-6 space-y-6"
            >
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Company
                </h2>
                <p className="text-sm text-muted-foreground">
                  Public details shown on the website and emails.
                </p>
              </div>

              <Separator />

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="companyName">Company name</Label>
                  <Input
                    id="companyName"
                    {...companyForm.register("companyName", {
                      required: "Company name is required",
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    {...companyForm.register("supportEmail")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyPhone">Phone</Label>
                  <Input id="companyPhone" {...companyForm.register("phone")} />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" {...companyForm.register("location")} />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="description">Short description</Label>
                  <Textarea
                    id="description"
                    rows={3}
                    {...companyForm.register("description")}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" />
                  Save changes
                </Button>
              </div>
            </form>
          )}

          {/* ─── Notifications ─── */}
          {activeTab === "notifications" && (
            <div className="rounded-xl border border-border bg-card p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Notifications
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose which email alerts you want to receive.
                </p>
              </div>

              <Separator />

              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      New bookings
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Get notified when a customer books a hike.
                    </p>
                  </div>
                  <Switch
                    checked={emailBooking}
                    onCheckedChange={setEmailBooking}
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Booking cancellations
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Alert when a booking is cancelled.
                    </p>
                  </div>
                  <Switch
                    checked={emailCancel}
                    onCheckedChange={setEmailCancel}
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Contact form messages
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Notify me when someone submits the contact form.
                    </p>
                  </div>
                  <Switch
                    checked={emailContact}
                    onCheckedChange={setEmailContact}
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Low stock alerts
                    </p>
                    <p className="text-xs text-muted-foreground">
                      When merchandise stock falls below threshold.
                    </p>
                  </div>
                  <Switch
                    checked={emailLowStock}
                    onCheckedChange={setEmailLowStock}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  type="button"
                  className="gap-2"
                  onClick={() =>
                    console.log("Notification prefs saved", {
                      emailBooking,
                      emailCancel,
                      emailContact,
                      emailLowStock,
                    })
                  }
                >
                  <Save className="h-4 w-4" />
                  Save preferences
                </Button>
              </div>
            </div>
          )}

          {/* ─── Security ─── */}
          {activeTab === "security" && (
            <form
              onSubmit={securityForm.handleSubmit(onSecuritySubmit)}
              className="rounded-xl border border-border bg-card p-6 space-y-6"
            >
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Security
                </h2>
                <p className="text-sm text-muted-foreground">
                  Update your password to keep your account secure.
                </p>
              </div>

              <Separator />

              <div className="grid gap-5 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    {...securityForm.register("currentPassword", {
                      required: "Current password is required",
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    {...securityForm.register("newPassword", {
                      required: "New password is required",
                      minLength: {
                        value: 8,
                        message: "At least 8 characters",
                      },
                    })}
                  />
                  {securityForm.formState.errors.newPassword && (
                    <p className="text-xs text-destructive">
                      {securityForm.formState.errors.newPassword.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm new password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...securityForm.register("confirmPassword", {
                      required: "Please confirm your password",
                    })}
                  />
                  {securityForm.formState.errors.confirmPassword && (
                    <p className="text-xs text-destructive">
                      {securityForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" />
                  Update password
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
