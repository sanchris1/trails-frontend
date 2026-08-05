import { authClient } from "@/lib/auth-client";

export async function handleLogout() {
  await authClient.signOut();
}
