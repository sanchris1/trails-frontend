"use client";

import { profileMenuItems, userNavItems } from "@/common";
import Logo from "../common/Logo";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, ArrowRight, ChevronDown, Moon, Sun } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Session } from "./Navbar";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTheme } from "next-themes";
import { handleLogout } from "@/hooks/handleLogout";

const NavbarClient = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const isActive = (href: string, id: string) => {
    if (id === "home") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  async function logoutUser() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("User signed out successfully");
          router.push("/");
          router.refresh();
        },
        onError: (err) => {
          toast.error("Error signing out");
          console.log(err);
        },
      },
    });
  }

  const { setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl ">
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
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              }
            />

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {!session && (
            <Button
              variant="outline"
              onClick={() => router.push("/auth/login")}
              className="rounded-xl"
            >
              Login
            </Button>
          )}

          {session && (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant={"outline"}>
                    <ChevronDown />
                  </Button>
                }
              />
              <DropdownMenuContent className={"w-64 space-y-2"} align="start">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                </DropdownMenuGroup>
                {profileMenuItems.map((item) => (
                  <DropdownMenuItem key={item.id} className={"text-sm w-full"}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-5 text-[13px]"
                    >
                      <item.icon /> {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="rounded-xl w-full"
                >
                  Logout
                </Button>
                {session?.user?.role === "admin" && (
                  <Button
                    variant={"destructive"}
                    className={"w-full"}
                    onClick={() => router.replace("/admin")}
                  >
                    Log to admin
                  </Button>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile menu */}
        <div className="lg:hidden">
          {" "}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              }
            />

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
                {session && (
                  <Button
                    onClick={() => router.push("/profile")}
                    className="group rounded-xl bg-accent px-5 font-semibold text-accent-foreground hover:bg-accent/90"
                  >
                    My Profile
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                )}

                {!session ? (
                  <Button
                    variant="outline"
                    onClick={() => router.push("/auth/login")}
                    className="rounded-xl"
                  >
                    Login
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={logoutUser}
                    className="rounded-xl"
                  >
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default NavbarClient;
