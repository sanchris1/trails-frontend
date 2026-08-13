"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Mountain, Users } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import InputComponent from "@/components/common/InputComponent";
import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { signupWithGoogle } from "@/hooks/signupWithGoogle";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name as keyof FormValues]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!values.name || !values.email || !values.password) {
      toast.error("Please complete all fields");
      return;
    }

    if (values.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    await authClient.signUp.email(
      {
        email: values.email,
        name: values.name,
        password: values.password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },

        onSuccess: () => {
          setLoading(false);
          router.push("/expeditions");
          toast.success("Welcome to Trails & Memoirs!");
          setValues({
            name: "",
            email: "",
            password: "",
          });
        },

        onError: (ctx) => {
          setLoading(false);

          toast.error(
            ctx.error?.message ||
              "Unable to create your account. Please try again.",
          );
        },
      },
    );
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* ================================================= */}
        {/* LEFT — BRAND EXPERIENCE */}
        {/* ================================================= */}

        <section className="relative hidden min-h-screen overflow-hidden lg:flex">
          <Image
            src="/hero/trail-2.jpg"
            alt="Travelers exploring a Kenyan landscape"
            fill
            priority
            className="object-cover"
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
            {/* Logo */}
            <div>
              <Logo />
            </div>

            {/* Main message */}
            <div className="max-w-xl text-white">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md">
                <Compass className="h-4 w-4 text-accent" />
                <span>Start your adventure</span>
              </div>

              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight xl:text-6xl">
                There&apos;s a whole
                <span className="block text-accent">
                  world waiting for you.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-7 text-white/75 xl:text-base">
                Create your account and discover unforgettable adventures,
                expeditions, destinations, and memories across Kenya.
              </p>

              {/* Features */}
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs backdrop-blur-md">
                  <Mountain className="h-4 w-4 text-accent" />
                  Explore
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs backdrop-blur-md">
                  <Compass className="h-4 w-4 text-accent" />
                  Discover
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs backdrop-blur-md">
                  <Users className="h-4 w-4 text-accent" />
                  Connect
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* RIGHT — SIGNUP FORM */}
        {/* ================================================= */}

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12 xl:px-20">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="mb-10 lg:hidden">
              <Logo />
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Join the journey
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Create your account.
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Join a community of explorers and start discovering
                unforgettable experiences.
              </p>
            </div>

            {/* Form */}
            <div className="space-y-5">
              <InputComponent
                name="name"
                label="Full name"
                type="text"
                value={values.name}
                onChange={handleChange}
                placeholder="Your name"
              />

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
                  placeholder="Create a password"
                />

                <p className="mt-2 text-[11px] text-muted-foreground">
                  Use at least 8 characters for a stronger password.
                </p>
              </div>

              {/* Submit */}
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
                    Create account
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

            {/* Google */}
            <Button
              type="button"
              variant="outline"
              onClick={() => signupWithGoogle()}
              className="h-12 w-full rounded-xl border-border/80 bg-background font-medium transition-all hover:-translate-y-0.5 hover:bg-muted"
            >
              <svg
                viewBox="0 0 24 24"
                className="mr-2 h-5 w-5"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M21.35 12.27c0-.72-.06-1.41-.18-2.07H12v3.92h5.23a4.47 4.47 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.92-4.2 2.92-7.24Z"
                />
                <path
                  fill="#34A853"
                  d="M12 21.8c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.75 9.75 0 0 0 12 21.8Z"
                />
                <path
                  fill="#FBBC05"
                  d="M6.54 13.89A5.86 5.86 0 0 1 6.23 12c0-.66.11-1.3.31-1.89V7.58H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.06 1.05 4.42l3.24-2.53Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 6.08c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.83 3.18 14.63 2.2 12 2.2a9.75 9.75 0 0 0-8.7 5.38l3.24 2.53C7.31 7.8 9.46 6.08 12 6.08Z"
                />
              </svg>
              Continue with Google
            </Button>

            {/* Login */}
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-accent underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>

            {/* Terms */}
            <p className="mt-8 text-center text-[11px] leading-5 text-muted-foreground/70">
              By creating an account, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-2 hover:text-foreground"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-2 hover:text-foreground"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Signup;
