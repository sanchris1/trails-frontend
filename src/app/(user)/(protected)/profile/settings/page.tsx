import Link from "next/link";
import { User, Lock, Bell, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import UserInformationUpdate from "./components/UserInformationUpdate";
import SecurityComponent from "./components/SecurityComponent";
import NotificationsComponent from "./components/NotificationsComponent";

export default function SettingsPage() {
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
              <Link href="/profile" className="gap-2 flex items-center">
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

          <TabsContent value="account" className="space-y-6">
            <UserInformationUpdate />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <SecurityComponent />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <NotificationsComponent />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
