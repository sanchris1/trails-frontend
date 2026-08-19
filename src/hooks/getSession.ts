import { headers } from "next/headers";

export async function getSession() {
  const h = await headers();
  const rawCookie = h.get("cookie") || "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/get-session`,
    {
      method: "GET",
      headers: {
        cookie: rawCookie,
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) return null;
  return res.json();
}
