import { redirect } from "next/navigation";
import { getSession } from "./getSession";

export async function requireSession(callbackURL: string) {
  const session = await getSession();

  if (!session) {
    redirect(`/auth/login?callbackUrl=${encodeURIComponent(callbackURL)}`);
  }

  return session;
}
