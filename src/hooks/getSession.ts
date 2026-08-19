import { headers } from "next/headers";

export async function getSession() {
  const h = await headers();
  const rawCookie = h.get("cookie") || "";

  // Make sure your NEXT_PUBLIC_API_URL exactly matches env.betterAuthUrl
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/get-session`,
    {
      method: "GET",
      headers: {
        // Lowercase cookie works universally in node environments
        cookie: rawCookie,
        Accept: "application/json",
      },
      cache: "no-store", // Prevents Next.js from caching a 'null' response forever
    },
  );

  if (!res.ok) return null;
  return res.json();
}
