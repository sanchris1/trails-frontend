/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Mountain, ShieldCheck } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import InputComponent from "@/components/common/InputComponent";
import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/hooks/auth/loginUser";
import { tokenStore } from "@/lib/tokenStore";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") ?? "/expeditions";

  const { mutate: login, isPending: loading } = useMutation({
    mutationFn: loginUser,
    onError: (ctx: any) => {
      console.log(ctx?.response.data.message);
      toast.error(
        ctx?.response.data.message || "Error logging in, Please try again.",
      );
    },
    onSuccess: (data) => {
      console.log("New data:", data);
      tokenStore.set(data.accessToken);
      toast.success(data?.message || "Login success");
      router.push(callbackUrl);
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name as keyof FormValues]: value,
    }));
  };

  const handleSubmit = async () => {
    const { email, password } = values;

    if (!email || !password) {
      toast.error("Please enter your email and password");
      return;
    }

    login({ email, password });
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden min-h-screen overflow-hidden lg:flex">
          <Image
            src="/hero/trail-1.jpg"
            alt="Hiking adventure in Kenya"
            fill
            priority
            className="object-cover"
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-black/45" />

          {/* Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/10" />

          {/* Content */}
          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
            {/* Logo */}
            <div>
              <Logo />
            </div>

            {/* Bottom content */}
            <div className="max-w-xl text-white">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md">
                <Compass className="h-4 w-4 text-accent" />
                <span>Adventure starts here</span>
              </div>

              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight xl:text-6xl">
                Your next
                <span className="block text-accent">unforgettable journey</span>
                starts here.
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-7 text-white/75 xl:text-base">
                Sign in to continue exploring Kenya&apos;s breathtaking
                landscapes, unforgettable expeditions, and stories worth
                remembering.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs backdrop-blur-md">
                  <Mountain className="h-4 w-4 text-accent" />
                  Mountains
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs backdrop-blur-md">
                  <Compass className="h-4 w-4 text-accent" />
                  Expeditions
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs backdrop-blur-md">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  Memories
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12 xl:px-20">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="mb-10 lg:hidden">
              <Logo />
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Welcome back
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Continue your journey.
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Sign in to access your adventures, expeditions, memories, and
                profile.
              </p>
            </div>

            {/* Form */}
            <div className="space-y-5">
              <InputComponent
                name="email"
                label="Email address"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />

              <div>
                <InputComponent
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />

                <div className="mt-2 flex justify-end">
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs font-medium text-muted-foreground transition-colors hover:text-accent"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button
                type="button"
                disabled={loading}
                onClick={handleSubmit}
                className="group h-12 w-full rounded-xl bg-accent font-semibold text-accent-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-lg"
              >
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </div>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <Separator className="flex-1" />

              <span className="shrink-0 text-xs text-muted-foreground">
                OR CONTINUE WITH
              </span>

              <Separator className="flex-1" />
            </div>

            {/* Signup */}
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-semibold text-accent underline-offset-4 transition-colors hover:underline"
              >
                Create an account
              </Link>
            </p>

            {/* Small brand statement */}
            <p className="mt-10 text-center text-[11px] leading-5 text-muted-foreground/70">
              Explore more. Travel further. Create memories that last.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
