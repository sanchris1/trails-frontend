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
import { signupWithGoogle } from "@/hooks/signupWithGoogle";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackURL = searchParams.get("callbackURL") ?? "/expeditions";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name as keyof FormValues]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!values.email || !values.password) {
      toast.error("Please enter your email and password");
      return;
    }

    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },

        onError: (ctx) => {
          setLoading(false);

          toast.error(
            ctx.error?.message ||
              "Unable to sign in. Please check your credentials.",
          );
        },

        onSuccess: () => {
          setLoading(false);
          toast.success("Welcome back!");
          router.push(callbackURL);
          setValues({ email: "", password: "" });
        },
      },
    );
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
