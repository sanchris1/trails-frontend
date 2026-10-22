"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";
import { useState } from "react";

const NotificationsComponent = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [bookingUpdates, setBookingUpdates] = useState(true);
  const [paymentReminders, setPaymentReminders] = useState(true);
  const [expeditionReminders, setExpeditionReminders] = useState(true);
  const [marketing, setMarketing] = useState(false);
  return (
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
  );
};

export default NotificationsComponent;
