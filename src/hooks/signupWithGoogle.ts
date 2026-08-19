import { authClient } from "@/lib/auth-client";

const callbackURL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:3000"
    : "https://trails-and-memoirs.vercel.app";

export async function signupWithGoogle() {
  await authClient.signIn.social({
    provider: "google",
    callbackURL,
  });
}
