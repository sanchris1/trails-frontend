"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Lock,
  Bell,
  ShieldCheck,
  Mail,
  Save,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock user data (replace with real data)
const mockUser = {
  name: "Amina Wanjiku",
  email: "amina.wanjiku@example.com",
  verified: true,
  createdAt: new Date("2024-11-12"),
};

export default function SettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Notification preferences (UI only)
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [bookingUpdates, setBookingUpdates] = useState(true);
  const [paymentReminders, setPaymentReminders] = useState(true);
  const [expeditionReminders, setExpeditionReminders] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border/50 bg-linear-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-3xl px-4 py-10 sm:py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Settings
              </h1>
              <p className="mt-1 text-muted-foreground">
                Manage your account and preferences
              </p>
            </div>

            <Button variant="outline" size="sm">
              <Link href="/profile" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Profile
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto max-w-3xl px-4 py-10">
        <Tabs defaultValue="account" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account" className="gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Lock className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* ================= ACCOUNT ================= */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    defaultValue={mockUser.name}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      defaultValue={mockUser.email}
                      className="h-11 pl-9"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/30 px-4 py-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium">Email verification</p>
                    <p className="text-xs text-muted-foreground">
                      {mockUser.verified
                        ? "Your email is verified"
                        : "Please verify your email address"}
                    </p>
                  </div>
                  {mockUser.verified ? (
                    <Badge className="gap-1 bg-success/15 text-success hover:bg-success/20">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Verified
                    </Badge>
                  ) : (
                    <Button size="sm" variant="outline">
                      Resend verification
                    </Button>
                  )}
                </div>

                <div className="pt-2">
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Save changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================= SECURITY ================= */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Change Password</CardTitle>
                <CardDescription>
                  Keep your account secure with a strong password
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current password</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      className="h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">New password</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className="h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm new password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm new password"
                    className="h-11"
                  />
                </div>

                <div className="pt-2">
                  <Button className="gap-2">
                    <Lock className="h-4 w-4" />
                    Update password
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive/30">
              <CardHeader>
                <CardTitle className="text-lg text-destructive">
                  Danger Zone
                </CardTitle>
                <CardDescription>Irreversible account actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium">Delete account</p>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Delete account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================= NOTIFICATIONS ================= */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Email Notifications</CardTitle>
                <CardDescription>
                  Choose what you want to be notified about
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications" className="text-base">
                      Email notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="booking-updates" className="text-base">
                      Booking updates
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Confirmations, cancellations, and changes
                    </p>
                  </div>
                  <Switch
                    id="booking-updates"
                    checked={bookingUpdates}
                    onCheckedChange={setBookingUpdates}
                    disabled={!emailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="payment-reminders" className="text-base">
                      Payment reminders
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Reminders for pending or partial payments
                    </p>
                  </div>
                  <Switch
                    id="payment-reminders"
                    checked={paymentReminders}
                    onCheckedChange={setPaymentReminders}
                    disabled={!emailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="expedition-reminders" className="text-base">
                      Expedition reminders
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Upcoming departure and meeting point alerts
                    </p>
                  </div>
                  <Switch
                    id="expedition-reminders"
                    checked={expeditionReminders}
                    onCheckedChange={setExpeditionReminders}
                    disabled={!emailNotifications}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing" className="text-base">
                      Marketing & offers
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      News, tips, and special offers
                    </p>
                  </div>
                  <Switch
                    id="marketing"
                    checked={marketing}
                    onCheckedChange={setMarketing}
                    disabled={!emailNotifications}
                  />
                </div>

                <div className="pt-2">
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Save preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
