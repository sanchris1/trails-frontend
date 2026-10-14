"use client";

import Link from "next/link";
import {
  Settings,
  Map,
  Package,
  Heart,
  Calendar,
  MapPin,
  Bell,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useFetchUserFavorites } from "@/hooks/favorites/fetchUserFavorites";
import Image from "next/image";
import { useFetchUserFavoriteMerchandise } from "@/hooks/favorites/merchandise/fetchUserFavoriteMerchandise";
import { useGetSession } from "@/hooks/auth/useGetSession.hook";
import { formatDate } from "@/utils/dateTimeFormat";

const unreadNotificationsCount = 3; // example – pull from your notifications query

export default function ProfilePage() {
  const {
    data: {
      user = { createdAt: "", email: "", id: "", name: "", role: "" },
    } = {},
  } = useGetSession();
  const { data: { allUserFavorites = [] } = {} } = useFetchUserFavorites();
  const { data: { allUserFavoritesMerchandise = [] } = {} } =
    useFetchUserFavoriteMerchandise();

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      {/* Header / Profile Card */}
      <section className="border-b border-border/50 bg-linear-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-5xl px-4 py-10 sm:py-14">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* User Info */}
            <div className="flex items-center gap-5">
              <Avatar className="h-20 w-20 border-2 border-primary/20 sm:h-24 sm:w-24">
                <AvatarFallback className="bg-primary/10 text-xl font-semibold text-primary sm:text-2xl">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {user.name}
                  </h1>
                </div>

                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground">
                  Member since {formatDate(new Date(user.createdAt))}
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="relative ">
                <Link
                  href="/profile/notifications"
                  className="gap-2 flex items-center p-1"
                >
                  <Bell className="h-4 w-4" />
                  Notifications
                  {unreadNotificationsCount > 0 && (
                    <Badge className="absolute -right-2 -top-2 h-5 min-w-5 justify-center rounded-full bg-accent px-1.5 text-[10px] text-accent-foreground">
                      {unreadNotificationsCount}
                    </Badge>
                  )}
                </Link>
              </Button>

              <Button variant="outline" size="sm">
                <Link
                  href="profile/settings"
                  className="gap-2 flex items-center p-1"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-3"
              >
                <Link
                  href="/profile/adventures"
                  className="gap-2 flex p-1 items-center "
                >
                  <Map className="h-4 w-4" />
                  My Adventures
                </Link>
              </Button>

              <Button variant="outline" size="sm">
                <Link
                  href="/profile/orders"
                  className="gap-2 flex p-1 items-center"
                >
                  <Package className="h-4 w-4" />
                  My Orders
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto max-w-5xl space-y-10 px-4 py-10 sm:py-14">
        {/* Favorite Expeditions */}
        <div>
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-accent" />
              <h2 className="text-xl font-semibold tracking-tight">
                Favorite Expeditions
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-muted-foreground"
            >
              <Link
                href="/favorites/expeditions"
                className="flex items-center gap-2"
              >
                View all
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {allUserFavorites.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center pb-0 text-center">
                <Heart className="mb-3 h-10 w-10 text-muted-foreground/40" />
                <p className="text-muted-foreground">
                  You haven’t favorited any expeditions yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {allUserFavorites.map((exp) => (
                <Card
                  key={exp.expeditionId}
                  className="group overflow-hidden transition-shadow hover:shadow-md pt-0 pb-0"
                >
                  <div className="relative h-42 bg-linear-to-br from-primary/20 via-secondary/15 to-accent/20">
                    <Image
                      src={exp.image}
                      fill
                      alt={exp.title}
                      className="object-center"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Map className="h-10 w-10 text-primary/40" />
                    </div>
                    <Badge className="absolute right-3 top-3 bg-background/90 text-foreground backdrop-blur">
                      {exp.status}
                    </Badge>
                  </div>

                  <CardContent className="space-y-3 p-4">
                    <div>
                      <h3 className="font-semibold leading-snug group-hover:text-primary">
                        {exp.title}
                      </h3>
                      <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {exp.location}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(exp.departureDate).toLocaleDateString(
                          "en-KE",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </span>
                      <span className="capitalize">{exp.difficulty}</span>
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      <Link href={`/expeditions/${exp.expeditionId}`}>
                        View details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Favorite Merchandise */}
        <div>
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-accent" />
              <h2 className="text-xl font-semibold tracking-tight">
                Favorite Merchandise
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-muted-foreground"
            >
              <Link
                href="/favorites/merchandise"
                className="flex items-center gap-2"
              >
                View all
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {allUserFavoritesMerchandise.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Package className="mb-3 h-10 w-10 text-muted-foreground/40" />
                <p className="text-muted-foreground">
                  You haven’t favorited any merchandise yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {allUserFavoritesMerchandise.map((item) => (
                <Card
                  key={item.id}
                  className="group overflow-hidden transition-shadow hover:shadow-md py-0 "
                >
                  <div className="relative h-42 bg-linear-to-br from-accent/15 via-primary/10 to-secondary/15 ">
                    <Image
                      src={item.images.at(0)?.url ?? ""}
                      fill
                      alt={item.title}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package className="h-10 w-10 text-accent/50" />
                    </div>
                  </div>

                  <CardContent className="space-y-3 p-4">
                    <div>
                      <h3 className="font-semibold leading-snug group-hover:text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.category}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary">
                        KES {item.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.stock} in stock
                      </span>
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      <Link href={`/shop/${item.slug}`}>View product</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
