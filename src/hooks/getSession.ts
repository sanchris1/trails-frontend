import { headers } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getSession() {
  const headersList = await headers();

  const cookie = headersList.get("cookie") ?? "";

  const result = await fetch(`${BACKEND_URL}/auth/get-session`, {
    headers: {
      cookie,
    },
    cache: "no-store",
  });
  if (!result.ok) return null;
  return result.json();
}
