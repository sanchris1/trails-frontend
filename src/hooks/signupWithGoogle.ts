import { authClient } from "@/lib/auth-client";

const callbackURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://trails-and-memoirs.vercel.app";

export async function signupWithGoogle() {
  await authClient.signIn.social({
    provider: "google",
    callbackURL,
  });
}
