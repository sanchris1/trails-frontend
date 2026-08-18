import { authClient } from "@/lib/auth-client";

export async function signupWithGoogle() {
  await authClient.signIn.social({
    provider: "google",
  });
}
