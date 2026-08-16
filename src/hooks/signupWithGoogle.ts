import { authClient } from "@/lib/auth-client";

export async function signupWithGoogle() {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/expeditions`,
  });
}
