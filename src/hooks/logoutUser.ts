import { headers } from "next/headers";
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function logoutUser() {
  const headersList = await headers();

  const cookie = headersList.get("cookie") ?? "";

  const result = await fetch(`${BACKEND_URL}/auth/sign-out`, {
    method: "POST",
    headers: {
      cookie,
    },
  });

  if (!result.ok) return null;

  return result.json();
}
