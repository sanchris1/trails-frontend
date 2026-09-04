import { api } from "@/lib/api";

export async function signupUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const { data } = await api.post("/auth/signup", {
    name,
    email,
    password,
  });

  return data;
}
