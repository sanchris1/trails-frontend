"use client";

import { userNavItems } from "@/common";
import Logo from "../common/Logo";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, ArrowRight } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  /**
   * Determine whether a navigation item is active.
   *
   * Home needs an exact match because "/" is contained
   * in every other pathname.
   */
  const isActive = (href: string, id: string) => {
    if (id === "home") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleNavigation = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8"
      >
        {/* Logo */}
        <Logo />

        {/* Desktop navigation */}
        <div className="hidden items-center gap-7 lg:flex">
          {userNavItems.map((item) => {
            const active = isActive(item.href, item.id);

            return (
              <Link
                href={item.href}
                key={item.id}
                aria-current={active ? "page" : undefined}
                className={`group relative py-2 text-sm font-medium transition-colors duration-300 ${
                  active
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}

                {/* Animated underline */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-accent transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="outline"
            onClick={() => router.push("/auth/login")}
            className="rounded-xl"
          >
            Login
          </Button>

          <Button
            onClick={() => router.push("/profile")}
            className="group rounded-xl bg-accent px-5 font-semibold text-accent-foreground hover:bg-accent/90"
          >
            My Profile
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                className="lg:hidden"
                variant="outline"
                size="icon"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            }
          />

          <SheetContent
            side="right"
            className="flex w-[85%] flex-col sm:max-w-sm"
          >
            {/* Mobile header */}
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>

              <SheetDescription>
                Explore Kenya&apos;s trails, adventures, and unforgettable
                expeditions.
              </SheetDescription>
            </SheetHeader>

            {/* Navigation */}
            <div className="mt-5 flex flex-1 flex-col">
              <div className="flex flex-col gap-2">
                {userNavItems.map((item) => {
                  const active = isActive(item.href, item.id);

                  return (
                    <Link
                      href={item.href}
                      key={item.id}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                        active
                          ? "border-accent/30 bg-accent/10 text-accent"
                          : "border-transparent text-muted-foreground hover:border-border hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile actions */}
              <div className="mt-auto space-y-3 pt-8">
                <Button
                  variant="outline"
                  className="w-full rounded-xl"
                  onClick={() => handleNavigation("/profile")}
                >
                  My Profile
                </Button>

                <Button
                  className="w-full rounded-xl bg-accent font-semibold text-accent-foreground hover:bg-accent/90"
                  onClick={() => handleNavigation("/auth/login")}
                >
                  Login
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Navbar;
